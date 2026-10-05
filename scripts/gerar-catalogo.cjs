/* ==========================================================================
   Gera o catálogo estruturado da Monte Cristo.

   Entradas:
     dados/catalogo_consolidado.json ou app.js -> (fonte da verdade comercial:
                                nome, volume, preço, categoria, cx).
     dados/fichas.json      -> camada editorial (marca, ficha técnica, texto)
     dados/taxonomia.json   -> categorias, subcategorias, faixas, tags
     dados/imagens.json     -> banco de imagens, se já existir (opcional)

   Saídas:
     dados/catalogo.json    -> catálogo completo, um objeto por produto
     dados/catalogo.js      -> catálogo empacotado em window.CATALOGO para preview local
     dados/catalogo.csv     -> mesma coisa achatada, para revisão no Excel
     dados/pendencias.md    -> o que precisa de confirmação do cliente / fichas pendentes
     pesquisa-imagens/produtos.json -> alvos para pesquisa de imagens

   Uso: node scripts/gerar-catalogo.cjs
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const DADOS = path.join(RAIZ, 'dados');
const APP = path.join(RAIZ, 'app.js');

const HOJE = new Date().toISOString().slice(0, 10);

/* Nem toda pendência pesa igual. Estas impedem publicar: sem resolver, a
   imagem ou a oferta saem erradas na frente do cliente. O resto enriquece a
   ficha e pode ficar em branco sem prejuízo nenhum — teor alcoólico não é
   exigência legal para quem revende, é exigência de rótulo, e rótulo é
   responsabilidade do fabricante. */
const PENDENCIA_CRITICA = [
    'variante', 'marca_exata', 'volume', 'preco',
    'sabores_disponiveis', 'variedades_disponiveis'
];

const FONTES_BR = [
    'zonasul.com.br',
    'paodeacucar.com',
    'carrefour.com.br',
    'emporioalcooldebebidas.com.br',
    'divvino.com.br'
];

const MARCAS_CONHECIDAS = [
    ["Jack Daniel's", /jack daniel/i],
    ["Johnnie Walker", /johnnie walker/i],
    ["Ballantine's", /ballantine/i],
    ["Jim Beam", /jim bean|jim beam/i],
    ["Chivas Regal", /chivas/i],
    ["White Horse", /white horse/i],
    ["Passport", /passport/i],
    ["Red Bull", /red bull/i],
    ["Baly", /baly/i],
    ["Licor 43", /licor 43/i],
    ["Amarula", /amarula/i],
    ["Don Luiz", /don luiz/i],
    ["Cointreau", /cointreau/i],
    ["Jägermeister", /j[aä]germeister/i],
    ["Stock", /stock/i],
    ["Bacardi", /bacardi/i],
    ["Malibu", /malibu/i],
    ["Montilla", /montilla/i],
    ["Cîroc", /ciroc/i],
    ["Smirnoff", /smirnoff/i],
    ["Grey Goose", /grey goose/i],
    ["Absolut", /absolut/i],
    ["Tanqueray", /tanqueray/i],
    ["Rock's", /rocks|rock's/i],
    ["Seagers", /seagers/i],
    ["Norteña", /norte[nñ]a/i],
    ["Patricia", /patricia/i],
    ["Zillertal", /zillertal/i],
    ["Pilsen", /pilsen/i],
    ["Dreher", /dreher/i],
    ["Presidente", /presidente/i],
    ["Domecq", /domecq/i],
    ["Monin", /monin/i],
    ["Fórmula", /f[oó]rmula/i],
    ["Firebird", /firebird/i],
    ["Aperol", /aperol/i],
    ["Campari", /campari/i],
    ["Brasilberg", /brasilberg/i],
    ["Salton", /salton/i],
    ["Casa Bucco", /bucco/i],
    ["Velho Barreiro", /velho barreiro/i],
    ["51 Pirassununga", /51/i],
    ["Ypióca", /ypi[oó]ca/i]
];

function ler_json(arquivo, base) {
    const caminho = path.join(base || DADOS, arquivo);
    if (!fs.existsSync(caminho)) return null;
    try {
        return JSON.parse(fs.readFileSync(caminho, 'utf8'));
    } catch (e) {
        console.error(`${path.relative(RAIZ, caminho)} não é um JSON válido: ${e.message}`);
        process.exit(1);
    }
}

function produtos_do_app() {
    if (fs.existsSync(path.join(DADOS, 'catalogo_consolidado.json'))) {
        return ler_json('catalogo_consolidado.json');
    }
    const fonte = fs.readFileSync(APP, 'utf8');
    let marker = 'const BASE_PRODUCTS_DATA =';
    let i = fonte.indexOf(marker);
    if (i === -1) {
        marker = 'const PRODUCTS_DATA =';
        i = fonte.indexOf(marker);
    }
    if (i === -1) {
        console.error('BASE_PRODUCTS_DATA / PRODUCTS_DATA não encontrado em app.js.');
        process.exit(1);
    }
    const j = fonte.indexOf('\n];', i) + 3;
    return eval(fonte.slice(i + marker.length, j - 1));
}

function slugificar(texto) {
    return texto
        .replace(/['’`]/g, '')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/º/g, 'o')
        .replace(/&/g, ' e ')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function volume_em_ml(rotulo) {
    if (!rotulo) return null;
    const litros = rotulo.match(/^([\d.,]+)\s*L$/i);
    if (litros) return Math.round(parseFloat(litros[1].replace(',', '.')) * 1000);
    const ml = rotulo.match(/^([\d.,]+)\s*ml$/i);
    if (ml) return Math.round(parseFloat(ml[1].replace(',', '.')));
    return null;
}

function faixa_de_preco(preco, faixas) {
    return faixas.find(f => preco >= f.min && (f.max === null || preco < f.max)) || null;
}

/* Preço por litro é o número que clube de compras e atacado usam para comparar
   embalagens diferentes. Sai do preço unitário, não substitui ele. */
function preco_por_litro(preco, ml) {
    if (!ml) return null;
    return Math.round((preco / (ml / 1000)) * 100) / 100;
}

function inferirMarca(nome) {
    if (!nome) return null;
    for (const [marca, regex] of MARCAS_CONHECIDAS) {
        if (regex.test(nome)) return marca;
    }
    return null;
}

function inferirExpressao(nome, marca) {
    if (!nome) return null;
    let s = nome;
    s = s.replace(/^(whisky|vodka|gin|licor|rum|cerveja|conhaque|cachaça|cachaca|energetico|energético|xarope|aperitivo)\s+/i, '');
    if (marca) {
        const regexMarca = new RegExp(marca.replace(/['’]/g, "['’]?"), 'i');
        s = s.replace(regexMarca, '');
    }
    s = s.replace(/\s+[\d.,]+\s*(ml|l|g)\b.*$/i, '');
    s = s.trim();
    return s.length > 0 ? s : null;
}

function inferirSubcategoria(produto, categoria, ficha, subPorSlug) {
    if (ficha && ficha.subcategoria && subPorSlug.has(`${categoria.slug}/${ficha.subcategoria}`)) {
        return subPorSlug.get(`${categoria.slug}/${ficha.subcategoria}`);
    }

    const nome = produto.name || '';
    const slugCat = categoria.slug;

    let subSlug = null;
    if (slugCat === 'whisky') {
        if (/bourbon|jack daniel|jim bean|jim beam/i.test(nome)) subSlug = 'whiskey-americano';
        else if (/canela|firebird|aperitivo/i.test(nome)) subSlug = 'aperitivo-de-whisky';
        else if (/scotch|blended|johnnie|ballantine|chivas|passport|white horse/i.test(nome)) subSlug = 'scotch-blended';
        else subSlug = 'whisky-nacional';
    } else if (slugCat === 'vodka') {
        if (/morango|red fruits|sabor|apple|peach|vanilla|citron|limon/i.test(nome)) subSlug = 'vodka-saborizada';
        else if (/ciroc|cîroc|grey goose|absolut|smirnoff/i.test(nome)) subSlug = 'vodka-importada';
        else subSlug = 'vodka-nacional';
    } else if (slugCat === 'gin-tequila') {
        if (/gin/i.test(nome)) subSlug = 'gin';
        else if (/tequila|cuervo/i.test(nome)) subSlug = 'tequila';
        else if (/malibu|limon|limón|coconut/i.test(nome)) subSlug = 'rum-saborizado';
        else if (/rum|bacardi|montilla/i.test(nome)) subSlug = 'rum';
        else if (/steinhaeger|doble w/i.test(nome)) subSlug = 'steinhaeger';
        else subSlug = 'gin';
    } else if (slugCat === 'licores') {
        if (/creme|chocolate|doce de leite|amarula|don luiz/i.test(nome)) subSlug = 'licor-creme';
        else if (/aperol|campari|brasilberg|aperitivo|bitter/i.test(nome)) subSlug = 'aperitivo-bitter';
        else if (/ervas|j[aä]germeister/i.test(nome)) subSlug = 'licor-ervas';
        else subSlug = 'licor-frutas';
    } else if (slugCat === 'cachaca-conhaque') {
        if (/conhaque|dreher|presidente|domecq/i.test(nome)) subSlug = 'conhaque';
        else if (/espumante|salton/i.test(nome)) subSlug = 'espumante';
        else if (/artesanal|bucco/i.test(nome)) subSlug = 'cachaca-artesanal';
        else subSlug = 'cachaca';
    } else if (slugCat === 'cervejas') {
        if (/lat[aã]o|lata/i.test(nome)) subSlug = 'latao';
        else subSlug = 'cerveja';
    } else if (slugCat === 'vermouth-bitter') {
        if (/vermouth|martini/i.test(nome)) subSlug = 'vermouth';
        else if (/bitter|angostura|underberg/i.test(nome)) subSlug = 'bitter';
        else subSlug = 'aperitivo-bitter';
    } else if (slugCat === 'energeticos') {
        subSlug = 'energetico';
    } else if (slugCat === 'xaropes') {
        subSlug = 'xarope-bar';
    }

    if (subSlug && subPorSlug.has(`${slugCat}/${subSlug}`)) {
        return subPorSlug.get(`${slugCat}/${subSlug}`);
    }

    return categoria.subcategorias[0];
}

function inferirEmbalagem(produto, ficha, ml, taxonomia) {
    if (ficha && ficha.embalagem && taxonomia.embalagens[ficha.embalagem]) {
        return {
            tipo: ficha.embalagem,
            obj: taxonomia.embalagens[ficha.embalagem]
        };
    }
    const nome = produto.name || '';
    const vol = produto.volume || '';
    let tipo = 'garrafa-vidro';

    if (/lata|lat[aã]o/i.test(nome) || (produto.category === 'energeticos' && ml && ml <= 473)) {
        tipo = 'lata';
    } else if (/pet/i.test(nome) || (produto.category === 'energeticos' && ml && ml >= 1500) || vol.includes('2L')) {
        tipo = 'garrafa-pet';
    }

    return {
        tipo,
        obj: taxonomia.embalagens[tipo] || taxonomia.embalagens['garrafa-vidro']
    };
}

function descricao_seo(produto, ficha, volumeRotulo) {
    const pedacos = [produto.name, volumeRotulo];
    if (ficha && ficha.abv !== null && ficha.abv !== undefined && ficha.abv > 0) {
        pedacos.push(`${String(ficha.abv).replace('.', ',')}% vol.`);
    }
    if (ficha && ficha.pais) pedacos.push(ficha.pais);
    const desc = (ficha && ficha.descricao) ? `${ficha.descricao} ` : '';
    return `${pedacos.join(' · ')}. ${desc}Monte Cristo Bebidas, Caxias do Sul/RS.`;
}

function main() {
    const taxonomia = ler_json('taxonomia.json');
    const fichasArquivo = ler_json('fichas.json');
    const imagens = ler_json('imagens.json', path.join(RAIZ, 'pesquisa-imagens'));

    if (!taxonomia || !fichasArquivo) {
        console.error('Faltam dados/taxonomia.json e/ou dados/fichas.json.');
        process.exit(1);
    }

    const fichas = fichasArquivo.fichas || {};
    const produtos = produtos_do_app();

    /* Índices de apoio */
    const porCategoria = new Map(taxonomia.categorias.map(c => [c.slug, c]));
    const subPorSlug = new Map();
    taxonomia.categorias.forEach(c =>
        c.subcategorias.forEach(s => subPorSlug.set(`${c.slug}/${s.slug}`, s))
    );

    const mapaImagens = new Map();
    if (Array.isArray(imagens)) imagens.forEach(i => mapaImagens.set(i.id, i));

    const erros = [];
    const slugsVistos = new Map();
    const contadorSku = new Map();

    const catalogo = produtos.map((produto, ordem) => {
        const fichaExistente = fichas[produto.id];
        const temFichaCompleta = Boolean(fichaExistente && (fichaExistente.descricao || fichaExistente.marca));
        const ficha = fichaExistente || {};

        const categoria = porCategoria.get(produto.category);
        if (!categoria) {
            erros.push(`${produto.id}: categoria "${produto.category}" não existe na taxonomia`);
            return null;
        }

        const subcategoria = inferirSubcategoria(produto, categoria, ficha, subPorSlug);
        if (!subcategoria) {
            erros.push(`${produto.id}: não foi possível resolver subcategoria para "${produto.category}"`);
            return null;
        }

        const ml = volume_em_ml(produto.volume);
        if (!ml) erros.push(`${produto.id}: volume "${produto.volume}" não pôde ser convertido para ml`);

        const embInfo = inferirEmbalagem(produto, ficha, ml, taxonomia);
        const embalagem = embInfo.obj;
        const tipoEmbalagem = embInfo.tipo;

        const prefixo = produto.id.split('-')[0].toUpperCase();
        const sequencial = (contadorSku.get(prefixo) || 0) + 1;
        contadorSku.set(prefixo, sequencial);
        const sku = `MC-${prefixo}-${String(sequencial).padStart(3, '0')}`;

        const slug = slugificar(`${produto.name} ${produto.volume}`);
        if (slugsVistos.has(slug)) {
            erros.push(`${produto.id}: slug "${slug}" repete o de ${slugsVistos.get(slug)}`);
        }
        slugsVistos.set(slug, produto.id);

        const faixa = faixa_de_preco(produto.price, taxonomia.faixas_preco);
        const imagem = mapaImagens.get(produto.id);
        const extensao = imagem && imagem.url && imagem.url.match(/\.(png|jpe?g|webp)(\?|$)/i)
            ? imagem.url.match(/\.(png|jpe?g|webp)(\?|$)/i)[1].toLowerCase()
            : 'png';

        const marca = ficha.marca || inferirMarca(produto.name);
        const expressao = ficha.expressao || inferirExpressao(produto.name, marca);

        // Origem inteligente
        let pais = ficha.pais || null;
        let regiao = ficha.regiao || null;
        if (!pais && !temFichaCompleta) {
            const n = produto.name || '';
            if (/uruguai|norteña|patricia|zillertal|pilsen/i.test(n)) pais = 'Uruguai';
            else if (/esc[oó]cia|scotch|johnnie|ballantine|chivas|white horse|passport/i.test(n)) pais = 'Escócia';
            else if (/estados unidos|eua|bourbon|jack daniel|jim bean|jim beam/i.test(n)) pais = 'Estados Unidos';
            else if (/fran[cç]a|ciroc|grey goose/i.test(n)) pais = 'França';
            else if (/alemanha|j[aä]germeister/i.test(n)) pais = 'Alemanha';
            else if (/espanha|licor 43/i.test(n)) pais = 'Espanha';
            else if (/áfrica do sul|africa do sul|amarula/i.test(n)) pais = 'África do Sul';
            else if (/itália|italia|aperol|campari/i.test(n)) pais = 'Itália';
            else if (/inglaterra|tanqueray/i.test(n)) pais = 'Reino Unido';
            else if (/méxico|mexico|cuervo|tequila/i.test(n)) pais = 'México';
            else if (/brasil|nacional|baly|51|velho barreiro|ypioca|ypióca|dreher|presidente|fórmula/i.test(n)) pais = 'Brasil';
        }

        // Teor alcoólico
        let abv = ficha.abv !== undefined ? ficha.abv : null;
        if (abv === null && (produto.category === 'energeticos' || produto.category === 'xaropes')) {
            abv = 0;
        }

        // Fontes e busca de imagem
        const fontes = [];
        if (ficha.site_oficial) fontes.push(ficha.site_oficial);
        fontes.push(...FONTES_BR);

        const termoBusca = [marca, expressao, produto.volume, 'garrafa fundo branco']
            .filter(Boolean)
            .join(' ');

        // Pendências editoriais
        const faltasEditoriais = [];
        if (!temFichaCompleta) {
            faltasEditoriais.push('ficha_editorial_completa');
            if (!marca) faltasEditoriais.push('marca');
            if (abv === null) faltasEditoriais.push('abv');
            if (!pais) faltasEditoriais.push('origem');
            if (!ficha.proprietaria) faltasEditoriais.push('fabricante');
            if (!ficha.descricao) faltasEditoriais.push('descricao_editorial');
        } else {
            if (Array.isArray(ficha.confirmar)) {
                faltasEditoriais.push(...ficha.confirmar);
            }
            if (ficha.abv === null && !faltasEditoriais.includes('abv')) {
                faltasEditoriais.push('abv');
            }
        }

        const pendenciasCriticas = faltasEditoriais.filter(c => PENDENCIA_CRITICA.includes(c));
        const pendenciasCosmeticas = faltasEditoriais.filter(c => !PENDENCIA_CRITICA.includes(c));

        return {
            sku,
            id: produto.id,
            slug,
            ordem: ordem + 1,

            nome: produto.name,
            nome_curto: [marca, expressao].filter(Boolean).join(' ') || produto.name,
            marca: marca || null,
            expressao: expressao || null,

            categoria: { slug: categoria.slug, nome: categoria.nome },
            subcategoria: { slug: subcategoria.slug, nome: subcategoria.nome },
            tipo: ficha.tipo || subcategoria.nome || categoria.nome,
            breadcrumb: ['Catálogo', categoria.nome, subcategoria.nome, produto.name],

            origem: {
                pais,
                regiao,
                importado: pais !== null && pais !== 'Brasil'
            },
            produtor: {
                proprietaria: ficha.proprietaria || null,
                site_oficial: ficha.site_oficial || null
            },

            embalagem: {
                tipo: tipoEmbalagem,
                nome: embalagem.nome,
                unidade_venda: embalagem.unidade_venda,
                volume_ml: ml,
                volume_label: produto.volume
            },

            ficha_tecnica: {
                teor_alcoolico: abv,
                alcoolico: abv === null || abv > 0,
                servir: ficha.servir || null
            },

            preco: {
                unitario: produto.price,
                moeda: 'BRL',
                por_litro: preco_por_litro(produto.price, ml),
                faixa: faixa ? { slug: faixa.slug, nome: faixa.nome } : null,
                atualizado_em: HOJE
            },

            operacional: {
                unidades_por_caixa: produto.boxQty || null,
                preco_caixa: produto.boxTotal || null,
                pedido_minimo: null,
                ean: ficha.ean || null,
                ncm: null,
                estoque: null,
                disponivel: produto.active !== false
            },

            conteudo: {
                descricao_curta: ficha.descricao || `${produto.name} ${produto.volume}. Distribuído pela Monte Cristo Bebidas em Caxias do Sul e Serra Gaúcha.`,
                observacao_interna: ficha.observacao || (!temFichaCompleta ? 'Pendente de ficha editorial completa em dados/fichas.json.' : null)
            },

            tags: Array.isArray(ficha.tags) ? ficha.tags : [],
            flags: {
                variante_critica: Boolean(ficha.variante_critica),
                agrupado: Boolean(ficha.agrupado),
                destaque: false,
                ficha_completa: temFichaCompleta
            },

            imagem: {
                status: imagem && imagem.status === 'ok' ? 'ok' : 'pendente',
                arquivo_local: `assets/produtos/${slug}.${extensao}`,
                url_origem: imagem ? imagem.url || null : null,
                pagina_origem: imagem ? imagem.pagina_origem || null : null,
                fonte: imagem ? imagem.fonte || null : null,
                fundo: imagem ? imagem.fundo || null : null,
                confianca: imagem ? imagem.confianca || null : null,
                alt: `${produto.name} ${produto.volume}`,
                fallback: 'ilustração vetorial da garrafa (bottles.js)'
            },

            busca_imagem: {
                termo: termoBusca,
                fontes_prioritarias: fontes,
                variante_critica: Boolean(ficha.variante_critica),
                cuidado: ficha.observacao || null
            },

            seo: {
                title: `${produto.name} ${produto.volume} | Monte Cristo Bebidas`,
                description: descricao_seo(produto, ficha, produto.volume).slice(0, 300),
                canonical: `/produto/${slug}`
            },

            pendencias: {
                criticas: pendenciasCriticas,
                cosmeticas: pendenciasCosmeticas
            },
            atualizado_em: HOJE
        };
    });

    if (erros.length) {
        console.error('\nCatálogo NÃO gerado. Corrija antes:\n');
        erros.forEach(e => console.error('  -', e));
        console.error('');
        process.exit(1);
    }

    /* --- catalogo.json --- */
    const saida = {
        _meta: {
            cliente: 'Monte Cristo Bebidas',
            praca: 'Caxias do Sul/RS',
            gerado_em: new Date().toISOString(),
            gerado_por: 'scripts/gerar-catalogo.cjs',
            fonte_comercial: 'dados/catalogo_consolidado.json (app.js)',
            fonte_editorial: 'dados/fichas.json',
            total_produtos: catalogo.length,
            aviso: 'Arquivo gerado. Não edite à mão — mexa em fichas.json ou catalogo_consolidado.json e rode o script de novo.'
        },
        taxonomia: taxonomia.categorias.map(c => ({
            slug: c.slug,
            nome: c.nome,
            total: catalogo.filter(p => p.categoria.slug === c.slug).length
        })),
        produtos: catalogo
    };
    fs.writeFileSync(path.join(DADOS, 'catalogo.json'), JSON.stringify(saida, null, 2), 'utf8');

    /* Mesmo conteúdo como script, para a página de conferência abrir com dois
       cliques no Explorer. Navegador bloqueia fetch de arquivo local, script
       tag não. */
    fs.writeFileSync(
        path.join(DADOS, 'catalogo.js'),
        '/* Gerado por scripts/gerar-catalogo.cjs. Não edite à mão. */\n' +
        'window.CATALOGO = ' + JSON.stringify(saida) + ';\n',
        'utf8'
    );

    /* --- catalogo.csv: revisão no Excel --- */
    const colunas = [
        'sku', 'id', 'nome', 'marca', 'expressao', 'categoria', 'subcategoria', 'tipo',
        'pais', 'teor_alcoolico', 'embalagem', 'volume_ml', 'volume', 'preco_unitario',
        'preco_por_litro', 'unidades_por_caixa', 'preco_caixa', 'imagem_status',
        'confirmar_antes_de_publicar', 'confirmar_se_sobrar_tempo'
    ];
    const linhas = catalogo.map(p => [
        p.sku, p.id, p.nome, p.marca || '', p.expressao || '', p.categoria.nome, p.subcategoria.nome,
        p.tipo, p.origem.pais || '', p.ficha_tecnica.teor_alcoolico === null ? '' : p.ficha_tecnica.teor_alcoolico,
        p.embalagem.nome, p.embalagem.volume_ml, p.embalagem.volume_label,
        p.preco.unitario.toFixed(2).replace('.', ','),
        p.preco.por_litro === null ? '' : p.preco.por_litro.toFixed(2).replace('.', ','),
        p.operacional.unidades_por_caixa || '',
        p.operacional.preco_caixa ? p.operacional.preco_caixa.toFixed(2).replace('.', ',') : '',
        p.imagem.status,
        p.pendencias.criticas.join(' | '),
        p.pendencias.cosmeticas.join(' | ')
    ]);
    const escapar = v => {
        const s = String(v);
        return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [colunas.join(';'), ...linhas.map(l => l.map(escapar).join(';'))].join('\r\n');
    fs.writeFileSync(path.join(DADOS, 'catalogo.csv'), '\uFEFF' + csv, 'utf8');

    /* --- pesquisa-imagens/produtos.json: entrada da pesquisa de imagem, agora
       com marca, embalagem esperada e o alerta de variante. --- */
    const alvos = catalogo.map(p => ({
        id: p.id,
        sku: p.sku,
        nome: p.nome,
        marca: p.marca,
        variante: p.expressao,
        volume: p.embalagem.volume_label,
        embalagem: p.embalagem.unidade_venda,
        categoria: p.categoria.nome,
        pais: p.origem.pais,
        busca_sugerida: p.busca_imagem.termo,
        site_oficial: p.produtor.site_oficial,
        fontes_prioritarias: p.busca_imagem.fontes_prioritarias,
        variante_critica: p.flags.variante_critica,
        agrupado: p.flags.agrupado,
        cuidado: p.busca_imagem.cuidado,
        arquivo_destino: p.imagem.arquivo_local
    }));
    fs.writeFileSync(
        path.join(RAIZ, 'pesquisa-imagens', 'produtos.json'),
        JSON.stringify(alvos, null, 2),
        'utf8'
    );

    /* --- pendencias.md: a lista de perguntas para o cliente e status editorial --- */
    const criticas = catalogo.filter(p => p.pendencias.criticas.length > 0);
    const pendentesEditoriais = catalogo.filter(p => !p.flags.ficha_completa);
    const cosmeticas = catalogo.filter(p => p.flags.ficha_completa && p.pendencias.cosmeticas.length > 0);
    const criticos = catalogo.filter(p => p.flags.variante_critica);
    const agrupados = catalogo.filter(p => p.flags.agrupado);

    const md = [
        '# Pendências do catálogo — Monte Cristo Bebidas',
        '',
        `Gerado em ${HOJE} por \`scripts/gerar-catalogo.cjs\`. Não editar à mão.`,
        '',
        `## Resolver antes de publicar (${criticas.length} itens)`,
        '',
        'Sem isso, a imagem ou a oferta saem erradas na frente do cliente.',
        '',
        '| SKU | Produto | Confirmar | Por quê |',
        '| --- | --- | --- | --- |',
        ...(criticas.length
            ? criticas.map(p => `| ${p.sku} | ${p.nome} | ${p.pendencias.criticas.join(', ')} | ${(p.conteudo.observacao_interna || '').replace(/\|/g, '/')} |`)
            : ['| - | - | - | Nenhuma pendência crítica impedindo publicação. |']),
        '',
        `## Fichas editoriais pendentes (${pendentesEditoriais.length} itens)`,
        '',
        'Estes produtos utilizam nome, volume, preço e categoria do catálogo consolidado',
        '(`dados/catalogo_consolidado.json` / `app.js`). Estão ativos e publicáveis no site,',
        'mas aguardam ficha editorial completa em `dados/fichas.json` (notas de degustação,',
        'marca/expressão refinadas, teor alcoólico exato e fabricante). Podem ser completados',
        'gradualmente sem bloquear o catálogo.',
        '',
        '| SKU | ID | Produto | Categoria | Volume | Preço | Pendências Editoriais |',
        '| --- | --- | --- | --- | --- | --- | --- |',
        ...pendentesEditoriais.map(p => `| ${p.sku} | ${p.id} | ${p.nome} | ${p.categoria.nome} | ${p.embalagem.volume_label} | R$ ${p.preco.unitario.toFixed(2).replace('.', ',')} | ${p.pendencias.cosmeticas.join(', ')} |`),
        '',
        `## Enriquece a ficha existente, não bloqueia nada (${cosmeticas.length} itens)`,
        '',
        'Teor alcoólico, fabricante e região deixam a ficha mais completa, mas nenhum',
        'deles é exigido de quem revende — o teor é obrigatório no rótulo da garrafa, e',
        'rótulo é responsabilidade do fabricante. Onde o dado não apareceu em fonte',
        'confiável, o campo simplesmente não é exibido no site. Vale preencher aos poucos,',
        'olhando a garrafa no estoque, sem segurar o lançamento por causa disso.',
        '',
        '| SKU | Produto | Falta |',
        '| --- | --- | --- |',
        ...cosmeticas.map(p => `| ${p.sku} | ${p.nome} | ${p.pendencias.cosmeticas.join(', ')} |`),
        '',
        `## Campos operacionais (${catalogo.length} itens)`,
        '',
        'Campos sincronizados do catálogo consolidado (`unidades_por_caixa`, `preco_caixa`)',
        'e campos reservados para integração futura (`ean`, `ncm`, `estoque`).',
        '',
        `- Produtos com caixa definida: ${catalogo.filter(p => p.operacional.unidades_por_caixa).length} de ${catalogo.length}`,
        `- Produtos com EAN cadastrado: ${catalogo.filter(p => p.operacional.ean).length} de ${catalogo.length}`,
        '',
        `## Variantes críticas para a busca de imagem (${criticos.length} itens)`,
        '',
        'Rótulos com irmão parecido na mesma tabela. Imagem trocada aqui passa despercebida',
        'na revisão e chega no cliente final.',
        '',
        ...criticos.map(p => `- **${p.nome}** (${p.sku})${p.conteudo.observacao_interna ? ' — ' + p.conteudo.observacao_interna : ''}`),
        '',
        `## Itens agrupados (${agrupados.length})`,
        '',
        'Uma linha da tabela representa vários produtos. Não viram página de produto',
        'sem antes definir quais variantes entram.',
        '',
        ...agrupados.map(p => `- **${p.nome}** (${p.sku}) — ${p.conteudo.observacao_interna || ''}`),
        ''
    ].join('\n');
    fs.writeFileSync(path.join(DADOS, 'pendencias.md'), md, 'utf8');

    /* --- relatório --- */
    const comFoto = catalogo.filter(p => p.imagem.status === 'ok').length;
    console.log(`\ncatalogo.json  ${catalogo.length} produtos em ${taxonomia.categorias.length} categorias`);
    console.log(`catalogo.csv   mesma tabela para revisão no Excel`);
    console.log(`pendencias.md  ${criticas.length} a resolver antes de publicar, ${pendentesEditoriais.length} fichas editoriais pendentes, ${cosmeticas.length} enriquecimentos opcionais, ${criticos.length} variantes críticas`);
    console.log(`\nImagens: ${comFoto} de ${catalogo.length} com foto (${catalogo.length - comFoto} usando a garrafa vetorial).`);
    console.log(`Teor alcoólico preenchido: ${catalogo.filter(p => p.ficha_tecnica.teor_alcoolico !== null).length} de ${catalogo.length}.`);
    console.log('');
}

main();
