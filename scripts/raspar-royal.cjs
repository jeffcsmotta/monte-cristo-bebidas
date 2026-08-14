/* ==========================================================================
   Casa o catálogo da Monte Cristo com o catálogo público da Royal Bebidas e
   traz imagem, ficha técnica e EAN de cada rótulo.

   Por que a Royal: é loja Tray, publica JSON-LD por produto (nome, imagem,
   marca, gtin, preço) e um bloco "Características" com graduação alcoólica,
   região e tipo de embalagem. Uma visita resolve o que várias buscas soltas
   não resolveram. O robots.txt libera o catálogo — só bloqueia carrinho e
   checkout, que este script nem toca.

   Uso:
     node scripts/raspar-royal.cjs --so-casar    mostra a correspondência, não baixa nada
     node scripts/raspar-royal.cjs               visita as páginas casadas e grava

   Saídas:
     pesquisa-imagens/imagens.json  entrada do baixar-imagens.cjs
     dados/royal-ficha.json         teor, tipo, região e EAN, para revisar antes de mesclar
     dados/royal-correspondencia.md relatório de o que casou com o quê

   A correspondência é automática e por isso não é confiável sozinha: nenhuma
   imagem entra no site sem passar por conferencia.html. O que o script faz é
   declarar o quanto confia em cada casamento e deixar o slug à vista.
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const https = require('https');

const RAIZ = path.resolve(__dirname, '..');
const CATALOGO = path.join(RAIZ, 'dados', 'catalogo.json');
const SITEMAP = 'https://www.royalbebidas.com/loja/arquivos/1199398/sitemaps/sitemap_1.xml';
const AGENTE = 'MonteCristoCatalogo/1.0 (pesquisa de catalogo de revenda)';
const PAUSA_MS = 1200;  // civilidade: uma página por vez, com respiro entre elas
const SO_CASAR = process.argv.includes('--so-casar');

/* Palavras que aparecem em quase toda URL e não ajudam a distinguir rótulo. */
const GENERICAS = new Set([
    'whisky', 'whiskey', 'vodka', 'gin', 'rum', 'ron', 'cachaca', 'licor', 'cerveja',
    'espumante', 'energetico', 'xarope', 'conhaque', 'tequila', 'vermouth', 'bitter',
    'aperitivo', 'destilado', 'bebida', 'garrafa', 'lata', 'latao', 'un', 'cx', 'kit',
    'ml', 'l', 'lt', 'litro', 'e', 'de', 'do', 'da', 'com',
    'original', 'tradicional', 'nacional', 'importado', 'the'
]);

/* O briefing pede foto de garrafa sozinha. Endereço com estas palavras é
   caixa, kit de presente ou garrafa com copo — descarta antes de pontuar. */
const BLOQUEADAS = /(^|-)(kit|combo|cbox|box|pack|presente|taca|tacas|copo|copos|dose|brinde|caixa)(-|$)/;

function normalizar(t) {
    return String(t || '')
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/['’`º°]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function tokens(t) {
    return normalizar(t).split(' ').filter(x => x && !GENERICAS.has(x));
}

function volume_de_slug(slug) {
    const m = normalizar(slug).match(/(\d+(?:[.,]\d+)?)\s?(ml|l|lt|litro)\b/);
    if (!m) return null;
    const n = parseFloat(m[1].replace(',', '.'));
    return /^(l|lt|litro)$/.test(m[2]) ? Math.round(n * 1000) : Math.round(n);
}

/* Devolve { html, urlFinal }. A URL final importa: produto fora de linha na
   Royal responde 302 para a home, e a home tem og:image — o logo da loja.
   Sem olhar para onde a resposta veio, o logo entra no lugar da garrafa. */
function buscar(url, redirects = 0) {
    return new Promise((resolve, reject) => {
        if (redirects > 4) return reject(new Error('redirecionamentos demais'));
        const req = https.get(url, { headers: { 'User-Agent': AGENTE, 'Accept': '*/*' } }, res => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                res.resume();
                return resolve(buscar(new URL(res.headers.location, url).toString(), redirects + 1));
            }
            if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode}`)); }
            const p = [];
            res.on('data', c => p.push(c));
            // o site serve ISO-8859-1
            res.on('end', () => resolve({ html: Buffer.concat(p).toString('latin1'), urlFinal: url }));
            res.on('error', reject);
        });
        req.setTimeout(30000, () => req.destroy(new Error('timeout')));
        req.on('error', reject);
    });
}

const dormir = ms => new Promise(r => setTimeout(r, ms));

/* --- casamento entre um produto nosso e uma URL da Royal --- */
function pontuar(produto, url) {
    const slug = url.split('/').pop();
    if (BLOQUEADAS.test(slug)) return null;
    const tokensUrl = tokens(slug);
    const setUrl = new Set(tokensUrl);

    const tokensMarca = tokens(produto.marca);
    const tokensVariante = tokens(produto.expressao || '');
    const volumeUrl = volume_de_slug(slug);
    const volumeNosso = produto.embalagem.volume_ml;

    // sem a marca inteira na URL, nem consideramos
    const marcaBate = tokensMarca.every(t => setUrl.has(t));
    if (!tokensMarca.length || !marcaBate) return null;

    let pontos = tokensMarca.length * 3;

    const varianteBate = tokensVariante.filter(t => setUrl.has(t));
    pontos += varianteBate.length * 2.5;
    /* Variante pedida que não aparece no endereço é o caminho para pegar o
       sabor errado. Pesa contra na disputa pela URL. */
    pontos -= (tokensVariante.length - varianteBate.length) * 3;
    const varianteCompleta = tokensVariante.length === 0 || varianteBate.length === tokensVariante.length;

    let volumeIgual = false;
    if (volumeUrl && volumeNosso) {
        if (volumeUrl === volumeNosso) { pontos += 5; volumeIgual = true; }
        else { pontos -= 6; }
    }

    /* Token sobrando na URL é o sinal de sabor errado: "absolut apeach" quando
       queremos o Absolut puro. Pesa contra, e pesa bastante. */
    const esperados = new Set([...tokensMarca, ...tokensVariante]);
    const eVolume = t => /^\d+(ml|l|lt|litro)?$/.test(t);
    const sobrando = tokensUrl.filter(t => !esperados.has(t) && !eVolume(t));
    pontos -= sobrando.length * 2;

    /* Nenhuma palavra da variante que pedimos aparece no endereço, e o
       endereço traz palavra própria: é outro sabor da mesma marca. Frutas
       Tropicais casando com "baly-acai" é exatamente esse caso. Descarta. */
    if (tokensVariante.length && varianteBate.length === 0 && sobrando.length > 0) {
        return { url, slug, pontos, confianca: 'baixa', volumeUrl, sobrando, varianteBate: 0, varianteTotal: tokensVariante.length };
    }

    let confianca = 'baixa';
    if (volumeIgual && varianteCompleta && sobrando.length === 0) confianca = 'alta';
    else if ((volumeIgual && sobrando.length <= 1) || (varianteCompleta && sobrando.length === 0)) confianca = 'media';

    return { url, slug, pontos, confianca, volumeUrl, sobrando, varianteBate: varianteBate.length, varianteTotal: tokensVariante.length };
}

/* --- extração da página --- */
function extrair(html) {
    const dados = {};

    const ld = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
    for (const m of ld) {
        try {
            const j = JSON.parse(m[1]);
            if (j['@type'] === 'Product') {
                dados.nome = j.name;
                dados.imagem = j.image;
                dados.marca = j.brand && j.brand.name;
                dados.ean = j.gtin13 || j.gtin || null;
                dados.preco = j.offers && j.offers.price ? Number(j.offers.price) : null;
                break;
            }
        } catch (e) { /* bloco quebrado, segue */ }
    }

    if (!dados.imagem) {
        const og = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
        if (og) dados.imagem = og[1];
    }

    /* bloco "Características": Região, Volume, Graduação Alcoólica, Tipo, Embalagem */
    const texto = html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
    const campo = (rotulo) => {
        const re = new RegExp(rotulo + '\\s*:?\\s*([^:]{1,40}?)(?=\\s+(?:Regi[aã]o|Volume|Gradua[cç][aã]o|Tipo|Embalagem|Idade|Pa[ií]s|Safra)\\s*:|$)', 'i');
        const m = texto.match(re);
        return m ? m[1].trim() : null;
    };

    const grad = campo('Gradua[cç][aã]o Alco[oó]lica');
    if (grad) {
        const n = grad.match(/(\d{1,2}(?:[.,]\d)?)\s*%/);
        if (n) dados.teor = parseFloat(n[1].replace(',', '.'));
    }
    dados.regiao_site = campo('Regi[aã]o');
    dados.tipo_site = campo('Tipo');
    dados.embalagem_site = campo('Embalagem');

    return dados;
}

async function main() {
    if (!fs.existsSync(CATALOGO)) {
        console.error('dados/catalogo.json não existe. Rode antes: node scripts/gerar-catalogo.cjs');
        process.exit(1);
    }
    const catalogo = JSON.parse(fs.readFileSync(CATALOGO, 'utf8')).produtos;

    console.log('Baixando o sitemap da Royal…');
    const { html: xml } = await buscar(SITEMAP);
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
    console.log(`${urls.length} URLs no sitemap.\n`);

    /* --- fase 1: casar --- */
    /* Atribuição exclusiva: uma página da Royal serve a um produto nosso só.
       Sem isso, os cinco sabores de Baly disputam a mesma URL e quatro deles
       levam a foto errada. Ordena todos os pares possíveis por pontuação e
       vai fechando os melhores primeiro. */
    const candidatos = catalogo.filter(p => !p.flags.agrupado);
    const pares = [];
    candidatos.forEach(p => {
        urls.forEach(u => {
            const nota = pontuar(p, u);
            if (nota && nota.confianca !== 'baixa') pares.push({ produto: p, nota });
        });
    });
    pares.sort((a, b) => b.nota.pontos - a.nota.pontos);

    const escolhido = new Map();   // id do produto -> nota
    const urlTomada = new Set();

    /* Correções manuais entram primeiro e travam a URL. É a saída para os
       casos em que o site chama o produto por outro nome — a Royal chama o
       Old Nº 7 de "Jack Daniels Tennessee", e nenhuma regra automática
       adivinha isso sem passar a aceitar sabor trocado. */
    const MANUAL = path.join(RAIZ, 'dados', 'royal-manual.json');
    let manuais = {};
    if (fs.existsSync(MANUAL)) {
        try {
            manuais = JSON.parse(fs.readFileSync(MANUAL, 'utf8')).correspondencias || {};
        } catch (e) {
            console.error('royal-manual.json não é um JSON válido:', e.message);
            process.exit(1);
        }
    }
    Object.entries(manuais).forEach(([id, url]) => {
        const p = catalogo.find(x => x.id === id);
        if (!p) { console.log(`  aviso: royal-manual.json cita id desconhecido "${id}"`); return; }
        const slug = url.split('/').pop();
        escolhido.set(id, {
            url, slug, pontos: 999, confianca: 'manual',
            volumeUrl: volume_de_slug(slug), sobrando: [], varianteBate: 0, varianteTotal: 0
        });
        urlTomada.add(url);
    });
    if (Object.keys(manuais).length) {
        console.log(`${Object.keys(manuais).length} correspondências vindas de royal-manual.json.\n`);
    }

    pares.forEach(({ produto, nota }) => {
        if (escolhido.has(produto.id) || urlTomada.has(nota.url)) return;
        escolhido.set(produto.id, nota);
        urlTomada.add(nota.url);
    });

    const casados = catalogo.map(p => {
        if (p.flags.agrupado) {
            return { produto: p, alvo: null, motivo: 'item agrupado: representa vários SKUs, não tem página única' };
        }
        const alvo = escolhido.get(p.id);
        if (alvo) return { produto: p, alvo };

        const melhorFraco = urls.map(u => pontuar(p, u)).filter(Boolean).sort((a, b) => b.pontos - a.pontos)[0];
        return {
            produto: p,
            alvo: null,
            motivo: melhorFraco
                ? `casamento fraco demais, melhor tentativa: ${melhorFraco.slug}`
                : 'nenhuma página com essa marca no site'
        };
    });

    const comAlvo = casados.filter(c => c.alvo);
    const alta = comAlvo.filter(c => c.alvo.confianca === 'alta');
    const media = comAlvo.filter(c => c.alvo.confianca === 'media');
    const manual = comAlvo.filter(c => c.alvo.confianca === 'manual');
    const sem = casados.filter(c => !c.alvo);

    console.log(`Correspondência: ${alta.length} alta, ${media.length} média, ${manual.length} manual, ${sem.length} sem par.\n`);

    if (SO_CASAR) {
        comAlvo.forEach(c => {
            console.log(`[${c.alvo.confianca}] ${c.produto.id} ${c.produto.nome} (${c.produto.embalagem.volume_label})`);
            console.log(`         -> ${c.alvo.slug}${c.alvo.sobrando.length ? '  (sobra: ' + c.alvo.sobrando.join(', ') + ')' : ''}`);
        });
        console.log('\nSem par:');
        sem.forEach(c => console.log(`  - ${c.produto.id} ${c.produto.nome} — ${c.motivo}`));
        console.log('\nNada foi baixado. Rode sem --so-casar para visitar as páginas.\n');
        return;
    }

    /* --- fase 2: visitar --- */
    console.log(`Visitando ${comAlvo.length} páginas, uma a cada ${PAUSA_MS}ms…\n`);
    const imagens = [];
    const fichas = {};
    const falhas = [];

    for (let i = 0; i < comAlvo.length; i++) {
        const c = comAlvo[i];
        process.stdout.write(`  ${String(i + 1).padStart(2)}/${comAlvo.length} ${c.produto.id} … `);
        try {
            const { html, urlFinal } = await buscar(c.alvo.url);

            if (urlFinal !== c.alvo.url) {
                falhas.push(`${c.produto.id}: produto saiu de linha na Royal (a página redireciona)`);
                console.log('saiu de linha');
                sem.push({ produto: c.produto, alvo: null, motivo: 'a página da Royal redireciona: produto fora de linha' });
                if (i < comAlvo.length - 1) await dormir(PAUSA_MS);
                continue;
            }

            const d = extrair(html);

            if (!d.imagem) {
                falhas.push(`${c.produto.id}: página abriu mas não achei a imagem`);
                console.log('sem imagem');
            } else {
                imagens.push({
                    id: c.produto.id,
                    nome: c.produto.nome,
                    url: d.imagem,
                    pagina_origem: c.alvo.url,
                    fonte: 'Royal Bebidas (varejo)',
                    fundo: 'branco',
                    status: 'ok',
                    confianca: c.alvo.confianca,
                    observacao: [
                        `casou com "${d.nome || c.alvo.slug}"`,
                        c.alvo.sobrando.length ? `sobra no slug: ${c.alvo.sobrando.join(', ')}` : '',
                        c.alvo.volumeUrl && c.alvo.volumeUrl !== c.produto.embalagem.volume_ml
                            ? `ATENÇÃO volume diferente: página ${c.alvo.volumeUrl}ml, nosso ${c.produto.embalagem.volume_ml}ml` : ''
                    ].filter(Boolean).join(' | ')
                });
                console.log(`ok (${c.alvo.confianca})`);
            }

            fichas[c.produto.id] = {
                nome_no_site: d.nome || null,
                teor: d.teor != null ? d.teor : null,
                tipo: d.tipo_site || null,
                regiao: d.regiao_site || null,
                embalagem: d.embalagem_site || null,
                ean: d.ean || null,
                preco_varejo: d.preco != null ? d.preco : null,
                pagina: c.alvo.url,
                confianca_correspondencia: c.alvo.confianca
            };
        } catch (e) {
            falhas.push(`${c.produto.id}: ${e.message}`);
            console.log('falhou —', e.message);
        }
        if (i < comAlvo.length - 1) await dormir(PAUSA_MS);
    }

    sem.forEach(c => imagens.push({
        id: c.produto.id,
        nome: c.produto.nome,
        url: '',
        pagina_origem: '',
        fonte: '',
        status: 'nao_encontrado',
        confianca: 'baixa',
        observacao: c.motivo
    }));

    fs.writeFileSync(path.join(RAIZ, 'pesquisa-imagens', 'imagens.json'), JSON.stringify(imagens, null, 2), 'utf8');
    fs.writeFileSync(path.join(RAIZ, 'dados', 'royal-ficha.json'), JSON.stringify({
        _meta: {
            fonte: 'https://www.royalbebidas.com',
            coletado_em: new Date().toISOString(),
            aviso: 'Dado de varejo, não de fabricante. Revisar antes de mesclar em fichas.json. Preço é da Royal, não da Monte Cristo — nunca copiar para o catálogo.'
        },
        fichas
    }, null, 2), 'utf8');

    /* relatório em markdown, para conferir a correspondência sem abrir JSON */
    const md = [
        '# Correspondência com o catálogo da Royal Bebidas',
        '',
        `Coletado em ${new Date().toISOString().slice(0, 10)}. Gerado por \`scripts/raspar-royal.cjs\`.`,
        '',
        'A correspondência é automática. Confiança **alta** significa marca, variante e',
        'volume batendo sem sobra de palavra no endereço; **média** significa que algo',
        'ficou folgado. Nenhuma imagem entra no site sem passar por `conferencia.html`.',
        '',
        '| Confiança | Nosso item | Volume | Página da Royal | Teor achado | EAN |',
        '| --- | --- | --- | --- | --- | --- |',
        ...comAlvo.filter(c => fichas[c.produto.id]).map(c => {
            const f = fichas[c.produto.id];
            return `| ${c.alvo.confianca} | ${c.produto.nome} | ${c.produto.embalagem.volume_label} | ${c.alvo.slug} | ${f.teor != null ? f.teor + '%' : '—'} | ${f.ean || '—'} |`;
        }),
        '',
        `## Sem par no site (${sem.length})`,
        '',
        ...sem.map(c => `- **${c.produto.nome}** — ${c.motivo}`),
        ''
    ].join('\n');
    fs.writeFileSync(path.join(RAIZ, 'dados', 'royal-correspondencia.md'), md, 'utf8');

    const comTeor = Object.values(fichas).filter(f => f.teor != null).length;
    const comEan = Object.values(fichas).filter(f => f.ean).length;

    console.log(`\nimagens.json          ${imagens.filter(i => i.status === 'ok').length} com imagem, ${sem.length} sem par`);
    console.log(`royal-ficha.json      ${comTeor} com graduação alcoólica, ${comEan} com EAN`);
    console.log(`royal-correspondencia.md  relatório para conferir os casamentos`);
    if (falhas.length) {
        console.log(`\nFalhas (${falhas.length}):`);
        falhas.forEach(f => console.log('  -', f));
    }
    console.log('\nPróximo passo: node scripts/baixar-imagens.cjs e depois abrir conferencia.html\n');
}

main().catch(e => { console.error('\nErro:', e.message); process.exit(1); });
