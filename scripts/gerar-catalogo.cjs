/* ==========================================================================
   Gera o catálogo estruturado da Monte Cristo.

   Entradas:
     app.js                 -> PRODUCTS_DATA (fonte da verdade: nome, volume,
                               preço, categoria). Não é alterado aqui.
     dados/fichas.json      -> camada editorial (marca, ficha técnica, texto)
     dados/taxonomia.json   -> categorias, subcategorias, faixas, tags
     dados/imagens.json     -> banco de imagens, se já existir (opcional)

   Saídas:
     dados/catalogo.json    -> catálogo completo, um objeto por produto
     dados/catalogo.csv     -> mesma coisa achatada, para revisão no Excel
     dados/pendencias.md    -> o que precisa de confirmação do cliente

   Uso: node scripts/gerar-catalogo.cjs

   O script falha alto e cedo: id sem ficha, subcategoria inexistente ou slug
   repetido interrompem a geração. Catálogo pela metade é pior que catálogo
   nenhum, porque ninguém percebe o buraco.
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const DADOS = path.join(RAIZ, 'dados');
const APP = path.join(RAIZ, 'app.js');

const HOJE = new Date().toISOString().slice(0, 10);

/* --- e-commerces brasileiros que costumam ter foto de produto em fundo
   branco padronizado. Entram como fonte secundária na busca de imagem. --- */
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
    const fonte = fs.readFileSync(APP, 'utf8');
    const i = fonte.indexOf('const PRODUCTS_DATA');
    if (i === -1) {
        console.error('PRODUCTS_DATA não encontrado em app.js.');
        process.exit(1);
    }
    const j = fonte.indexOf('\n];', i) + 3;
    return eval(fonte.slice(i + 'const PRODUCTS_DATA ='.length, j - 1));
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

function descricao_seo(produto, ficha, volumeRotulo) {
    const pedacos = [produto.name, volumeRotulo];
    if (ficha.abv !== null && ficha.abv > 0) pedacos.push(`${String(ficha.abv).replace('.', ',')}% vol.`);
    if (ficha.pais) pedacos.push(ficha.pais);
    return `${pedacos.join(' · ')}. ${ficha.descricao} Monte Cristo Bebidas, Caxias do Sul/RS.`;
}

function main() {
    const taxonomia = ler_json('taxonomia.json');
    const fichasArquivo = ler_json('fichas.json');
    const imagens = ler_json('imagens.json', path.join(RAIZ, 'pesquisa-imagens'));

    if (!taxonomia || !fichasArquivo) {
        console.error('Faltam dados/taxonomia.json e/ou dados/fichas.json.');
        process.exit(1);
    }

    const fichas = fichasArquivo.fichas;
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
        const ficha = fichas[produto.id];
        if (!ficha) {
            erros.push(`${produto.id} (${produto.name}): sem ficha em dados/fichas.json`);
            return null;
        }

        const categoria = porCategoria.get(produto.category);
        if (!categoria) {
            erros.push(`${produto.id}: categoria "${produto.category}" não existe na taxonomia`);
            return null;
        }

        const subcategoria = subPorSlug.get(`${categoria.slug}/${ficha.subcategoria}`);
        if (!subcategoria) {
            erros.push(`${produto.id}: subcategoria "${ficha.subcategoria}" não existe dentro de "${categoria.slug}"`);
            return null;
        }

        const embalagem = taxonomia.embalagens[ficha.embalagem];
        if (!embalagem) {
            erros.push(`${produto.id}: embalagem "${ficha.embalagem}" não existe na taxonomia`);
            return null;
        }

        const ml = volume_em_ml(produto.volume);
        if (!ml) erros.push(`${produto.id}: volume "${produto.volume}" não pôde ser convertido para ml`);

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

        const fontes = [];
        if (ficha.site_oficial) fontes.push(ficha.site_oficial);
        fontes.push(...FONTES_BR);

        const termoBusca = [ficha.marca, ficha.expressao, produto.volume, 'garrafa fundo branco']
            .filter(Boolean)
            .join(' ');

        return {
            sku,
            id: produto.id,
            slug,
            ordem: ordem + 1,

            nome: produto.name,
            nome_curto: [ficha.marca, ficha.expressao].filter(Boolean).join(' '),
            marca: ficha.marca,
            expressao: ficha.expressao,

            categoria: { slug: categoria.slug, nome: categoria.nome },
            subcategoria: { slug: subcategoria.slug, nome: subcategoria.nome },
            tipo: ficha.tipo,
            breadcrumb: ['Catálogo', categoria.nome, subcategoria.nome, produto.name],

            origem: {
                pais: ficha.pais,
                regiao: ficha.regiao,
                importado: ficha.pais !== null && ficha.pais !== 'Brasil'
            },
            produtor: {
                proprietaria: ficha.proprietaria,
                site_oficial: ficha.site_oficial
            },

            embalagem: {
                tipo: ficha.embalagem,
                nome: embalagem.nome,
                unidade_venda: embalagem.unidade_venda,
                volume_ml: ml,
                volume_label: produto.volume
            },

            ficha_tecnica: {
                teor_alcoolico: ficha.abv,
                alcoolico: ficha.abv === null || ficha.abv > 0,
                servir: ficha.servir
            },

            preco: {
                unitario: produto.price,
                moeda: 'BRL',
                por_litro: preco_por_litro(produto.price, ml),
                faixa: faixa ? { slug: faixa.slug, nome: faixa.nome } : null,
                atualizado_em: HOJE
            },

            /* Campos operacionais da distribuidora. Ficam vazios de propósito:
               são dados da Monte Cristo, não podem ser deduzidos daqui. */
            operacional: {
                unidades_por_caixa: null,
                preco_caixa: null,
                pedido_minimo: null,
                ean: ficha.ean || null,
                ncm: null,
                estoque: null,
                disponivel: true
            },

            conteudo: {
                descricao_curta: ficha.descricao,
                observacao_interna: ficha.observacao || null
            },

            tags: ficha.tags,
            flags: {
                variante_critica: ficha.variante_critica,
                agrupado: ficha.agrupado,
                destaque: false
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
                variante_critica: ficha.variante_critica,
                cuidado: ficha.observacao || null
            },

            seo: {
                title: `${produto.name} ${produto.volume} | Monte Cristo Bebidas`,
                description: descricao_seo(produto, ficha, produto.volume).slice(0, 300),
                canonical: `/produto/${slug}`
            },

            pendencias: {
                criticas: ficha.confirmar.filter(c => PENDENCIA_CRITICA.includes(c)),
                cosmeticas: ficha.confirmar.filter(c => !PENDENCIA_CRITICA.includes(c))
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
            fonte_comercial: 'app.js (PRODUCTS_DATA)',
            fonte_editorial: 'dados/fichas.json',
            total_produtos: catalogo.length,
            aviso: 'Arquivo gerado. Não edite à mão — mexa em fichas.json ou app.js e rode o script de novo.'
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

    /* --- catalogo.csv: revisão do Ivan no Excel --- */
    const colunas = [
        'sku', 'id', 'nome', 'marca', 'expressao', 'categoria', 'subcategoria', 'tipo',
        'pais', 'teor_alcoolico', 'embalagem', 'volume_ml', 'volume', 'preco_unitario',
        'preco_por_litro', 'unidades_por_caixa', 'ean', 'imagem_status',
        'confirmar_antes_de_publicar', 'confirmar_se_sobrar_tempo'
    ];
    const linhas = catalogo.map(p => [
        p.sku, p.id, p.nome, p.marca, p.expressao || '', p.categoria.nome, p.subcategoria.nome,
        p.tipo, p.origem.pais || '', p.ficha_tecnica.teor_alcoolico === null ? '' : p.ficha_tecnica.teor_alcoolico,
        p.embalagem.nome, p.embalagem.volume_ml, p.embalagem.volume_label,
        p.preco.unitario.toFixed(2).replace('.', ','),
        p.preco.por_litro === null ? '' : p.preco.por_litro.toFixed(2).replace('.', ','),
        '', '', p.imagem.status,
        p.pendencias.criticas.join(' | '), p.pendencias.cosmeticas.join(' | ')
    ]);
    const escapar = v => {
        const s = String(v);
        return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [colunas.join(';'), ...linhas.map(l => l.map(escapar).join(';'))].join('\r\n');
    fs.writeFileSync(path.join(DADOS, 'catalogo.csv'), '﻿' + csv, 'utf8');

    /* --- pesquisa-imagens/produtos.json: entrada da pesquisa de imagem, agora
       com marca, embalagem esperada e o alerta de variante. Quem pesquisa
       precisa saber que Jack Daniel's Fire tem quatro irmãos na mesma lista. --- */
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

    /* --- pendencias.md: a lista de perguntas para o cliente --- */
    const criticas = catalogo.filter(p => p.pendencias.criticas.length > 0);
    const cosmeticas = catalogo.filter(p => p.pendencias.cosmeticas.length > 0);
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
        ...criticas.map(p => `| ${p.sku} | ${p.nome} | ${p.pendencias.criticas.join(', ')} | ${(p.conteudo.observacao_interna || '').replace(/\|/g, '/')} |`),
        '',
        `## Enriquece a ficha, não bloqueia nada (${cosmeticas.length} itens)`,
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
        '## Campos operacionais — vazios nos 80 itens',
        '',
        'Nenhum pode ser deduzido de fora da distribuidora, e nenhum é necessário para',
        'um site de vitrine com pedido por WhatsApp. Só passam a fazer falta se o site',
        'virar loja com carrinho e nota fiscal:',
        '',
        '- `unidades_por_caixa` e `preco_caixa` — se houver venda por caixa no site',
        '- `pedido_minimo` — se houver política de atacado',
        '- `ean` (código de barras) — só se o catálogo for para marketplace',
        '- `ncm` — só para emissão de nota fiscal',
        '- `estoque` — só se o site for mostrar disponibilidade em tempo real',
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
    console.log(`pendencias.md  ${criticas.length} a resolver antes de publicar, ${cosmeticas.length} opcionais, ${criticos.length} variantes críticas`);
    console.log(`\nImagens: ${comFoto} de ${catalogo.length} com foto (${catalogo.length - comFoto} usando a garrafa vetorial).`);
    console.log(`Teor alcoólico preenchido: ${catalogo.filter(p => p.ficha_tecnica.teor_alcoolico !== null).length} de ${catalogo.length}.`);
    console.log('');
}

main();
