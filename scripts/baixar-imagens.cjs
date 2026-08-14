/* ==========================================================================
   Materializa o banco de imagens de produto.

   Entrada : pesquisa-imagens/imagens.json  (resultado da pesquisa)
             dados/catalogo.json            (nome de arquivo de destino)
   Saída   : assets/produtos/<slug>.<ext>   (os arquivos, de fato)
             images.js                      (mapa id -> caminho local)

   Uso: node scripts/baixar-imagens.cjs [--forcar]

   Diferença para aplicar-imagens.cjs: aquele aponta o site direto para a URL
   de terceiro, o que serve para o mockup e quebra no dia em que o fornecedor
   mexe no site. Este traz o arquivo para dentro do repositório, confere se é
   mesmo imagem e se tem resolução de vitrine, e o site passa a servir o
   próprio arquivo.

   --forcar rebaixa o que já está em disco. Sem a flag, arquivo existente é
   mantido e a URL não é buscada de novo.
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const RAIZ = path.resolve(__dirname, '..');
const ENTRADA = path.join(RAIZ, 'pesquisa-imagens', 'imagens.json');
const CATALOGO = path.join(RAIZ, 'dados', 'catalogo.json');
const DESTINO = path.join(RAIZ, 'assets', 'produtos');
const SAIDA = path.join(RAIZ, 'images.js');

const LADO_MINIMO = 600;      // abaixo disso a foto fica borrada no card em tela retina
const BYTES_MINIMO = 4 * 1024; // arquivo menor que isso quase sempre é erro ou placeholder
const TIMEOUT_MS = 20000;
const MAX_REDIRECT = 5;

const FORCAR = process.argv.includes('--forcar');

/* --- download com redirect, sem dependência externa --- */
function baixar(url, redirecionamentos = 0) {
    return new Promise((resolve, reject) => {
        if (redirecionamentos > MAX_REDIRECT) return reject(new Error('redirecionamentos demais'));

        let alvo;
        try {
            alvo = new URL(url);
        } catch (e) {
            return reject(new Error('URL malformada'));
        }

        const cliente = alvo.protocol === 'http:' ? http : https;
        const req = cliente.get(
            alvo,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; MonteCristoCatalogo/1.0)',
                    'Accept': 'image/avif,image/webp,image/png,image/jpeg,*/*'
                }
            },
            res => {
                const status = res.statusCode;

                if (status >= 300 && status < 400 && res.headers.location) {
                    res.resume();
                    const proxima = new URL(res.headers.location, alvo).toString();
                    return resolve(baixar(proxima, redirecionamentos + 1));
                }
                if (status !== 200) {
                    res.resume();
                    return reject(new Error(`HTTP ${status}`));
                }

                const tipo = (res.headers['content-type'] || '').split(';')[0].trim();
                const pedacos = [];
                res.on('data', p => pedacos.push(p));
                res.on('end', () => resolve({ buffer: Buffer.concat(pedacos), tipo }));
                res.on('error', reject);
            }
        );

        req.setTimeout(TIMEOUT_MS, () => {
            req.destroy(new Error(`timeout depois de ${TIMEOUT_MS / 1000}s`));
        });
        req.on('error', reject);
    });
}

/* --- leitura de dimensão direto do cabeçalho do arquivo --- */
function dimensoes(buf) {
    // PNG: assinatura + IHDR
    if (buf.length > 24 && buf.toString('hex', 0, 8) === '89504e470d0a1a0a') {
        return { largura: buf.readUInt32BE(16), altura: buf.readUInt32BE(20), formato: 'png' };
    }

    // JPEG: percorre os marcadores até um SOF
    if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
        let i = 2;
        while (i < buf.length - 9) {
            if (buf[i] !== 0xff) { i++; continue; }
            const marcador = buf[i + 1];
            const sof = marcador >= 0xc0 && marcador <= 0xcf &&
                marcador !== 0xc4 && marcador !== 0xc8 && marcador !== 0xcc;
            if (sof) {
                return { altura: buf.readUInt16BE(i + 5), largura: buf.readUInt16BE(i + 7), formato: 'jpg' };
            }
            const tamanho = buf.readUInt16BE(i + 2);
            if (tamanho < 2) break;
            i += 2 + tamanho;
        }
        return { largura: null, altura: null, formato: 'jpg' };
    }

    // WebP
    if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
        const sub = buf.toString('ascii', 12, 16);
        if (sub === 'VP8X') {
            return {
                largura: 1 + buf.readUIntLE(24, 3),
                altura: 1 + buf.readUIntLE(27, 3),
                formato: 'webp'
            };
        }
        if (sub === 'VP8 ') {
            return {
                largura: buf.readUInt16LE(26) & 0x3fff,
                altura: buf.readUInt16LE(28) & 0x3fff,
                formato: 'webp'
            };
        }
        return { largura: null, altura: null, formato: 'webp' };
    }

    return null;
}

async function main() {
    if (!fs.existsSync(CATALOGO)) {
        console.error('dados/catalogo.json não existe. Rode antes: node scripts/gerar-catalogo.cjs');
        process.exit(1);
    }
    if (!fs.existsSync(ENTRADA)) {
        console.error('pesquisa-imagens/imagens.json não existe — a pesquisa ainda não voltou.');
        console.error('O passo a passo está em pesquisa-imagens/BRIEFING-ANTIGRAVITY.md');
        process.exit(1);
    }

    const catalogo = JSON.parse(fs.readFileSync(CATALOGO, 'utf8')).produtos;
    const porId = new Map(catalogo.map(p => [p.id, p]));

    let pesquisa;
    try {
        pesquisa = JSON.parse(fs.readFileSync(ENTRADA, 'utf8'));
    } catch (e) {
        console.error('imagens.json não é um JSON válido:', e.message);
        process.exit(1);
    }
    if (!Array.isArray(pesquisa)) {
        console.error('imagens.json precisa ser uma lista de objetos.');
        process.exit(1);
    }

    fs.mkdirSync(DESTINO, { recursive: true });

    const mapa = {};
    const ok = [];
    const pulados = [];
    const falhas = [];
    const avisos = [];
    const urlsVistas = new Map();

    for (const item of pesquisa) {
        const id = item && item.id;
        const produto = id && porId.get(id);

        if (!produto) { falhas.push(`${id || '(sem id)'}: id não existe no catálogo`); continue; }
        if (item.status === 'nao_encontrado') { pulados.push(`${id}: marcado como não encontrado`); continue; }
        if (typeof item.url !== 'string' || !item.url.trim()) { pulados.push(`${id}: sem URL`); continue; }

        const lista = urlsVistas.get(item.url) || [];
        lista.push(id);
        urlsVistas.set(item.url, lista);

        const extensaoDestino = path.extname(produto.imagem.arquivo_local).slice(1) || 'png';
        const base = path.basename(produto.imagem.arquivo_local, path.extname(produto.imagem.arquivo_local));

        // arquivo já em disco (qualquer extensão) e sem --forcar: mantém
        const existente = ['png', 'jpg', 'jpeg', 'webp']
            .map(ext => path.join(DESTINO, `${base}.${ext}`))
            .find(fs.existsSync);
        if (existente && !FORCAR) {
            mapa[id] = `assets/produtos/${path.basename(existente)}`;
            ok.push(`${id}: já em disco`);
            continue;
        }

        let resultado;
        try {
            resultado = await baixar(item.url);
        } catch (e) {
            falhas.push(`${id} (${produto.nome}): ${e.message}`);
            continue;
        }

        const { buffer, tipo } = resultado;

        if (buffer.length < BYTES_MINIMO) {
            falhas.push(`${id} (${produto.nome}): arquivo com ${buffer.length} bytes, pequeno demais para ser foto de produto`);
            continue;
        }

        const dim = dimensoes(buffer);
        if (!dim) {
            falhas.push(`${id} (${produto.nome}): conteúdo não é PNG, JPEG nem WebP (content-type: ${tipo || 'desconhecido'})`);
            continue;
        }

        const maiorLado = Math.max(dim.largura || 0, dim.altura || 0);
        if (maiorLado && maiorLado < LADO_MINIMO) {
            falhas.push(`${id} (${produto.nome}): ${dim.largura}x${dim.altura}px, abaixo do mínimo de ${LADO_MINIMO}px`);
            continue;
        }
        if (!maiorLado) {
            avisos.push(`${id}: não deu para ler a dimensão do arquivo ${dim.formato} — conferir a olho`);
        }

        const ext = dim.formato === 'jpg' && extensaoDestino === 'png' ? 'jpg' : (dim.formato || extensaoDestino);
        const arquivo = `${base}.${ext}`;
        fs.writeFileSync(path.join(DESTINO, arquivo), buffer);
        mapa[id] = `assets/produtos/${arquivo}`;
        ok.push(`${id}: ${arquivo} (${dim.largura || '?'}x${dim.altura || '?'}, ${Math.round(buffer.length / 1024)}KB)`);
    }

    const cabecalho = `/* Gerado por scripts/baixar-imagens.cjs em ${new Date().toISOString()}.
   Não edite à mão: rode o script de novo.
   Mapa id do produto -> arquivo local em assets/produtos/.
   O que não estiver aqui cai na ilustração vetorial da garrafa (bottles.js). */\n`;
    fs.writeFileSync(SAIDA, cabecalho + 'window.PRODUCT_IMAGES = ' + JSON.stringify(mapa, null, 2) + ';\n', 'utf8');

    /* --- relatório --- */
    const total = catalogo.length;
    const baixadas = Object.keys(mapa).length;
    console.log(`\nBanco de imagens: ${baixadas} de ${total} produtos com foto em assets/produtos/.`);
    console.log(`${total - baixadas} seguem com a garrafa vetorial.`);

    if (ok.length) {
        console.log(`\nGravadas (${ok.length}):`);
        ok.forEach(l => console.log('  -', l));
    }
    if (pulados.length) {
        console.log(`\nSem imagem na pesquisa (${pulados.length}):`);
        pulados.forEach(l => console.log('  -', l));
    }
    if (falhas.length) {
        console.log(`\nFalharam na validação (${falhas.length}):`);
        falhas.forEach(l => console.log('  -', l));
    }
    if (avisos.length) {
        console.log(`\nAvisos (${avisos.length}):`);
        avisos.forEach(l => console.log('  -', l));
    }

    const repetidas = [...urlsVistas.entries()].filter(([, ids]) => ids.length > 1);
    if (repetidas.length) {
        console.log('\nATENÇÃO — mesma URL em produtos diferentes, pelo menos um está errado:');
        repetidas.forEach(([url, ids]) => console.log('  -', ids.join(', '), '->', url));
    }

    const duvidosas = pesquisa.filter(i => i.confianca === 'media' || i.confianca === 'baixa');
    if (duvidosas.length) {
        console.log(`\nConferir a olho, confiança declarada baixa ou média (${duvidosas.length}):`);
        duvidosas.forEach(i => {
            const p = porId.get(i.id);
            console.log(`  - ${i.id} ${p ? p.nome : ''}${i.observacao ? ' — ' + i.observacao : ''}`);
        });
    }

    const criticosSemFoto = catalogo.filter(p => p.flags.variante_critica && !mapa[p.id]);
    if (criticosSemFoto.length) {
        console.log(`\nVariantes críticas ainda sem foto (${criticosSemFoto.length}): ${criticosSemFoto.map(p => p.id).join(', ')}`);
    }
    console.log('');
}

main().catch(e => {
    console.error('\nErro inesperado:', e.message);
    process.exit(1);
});
