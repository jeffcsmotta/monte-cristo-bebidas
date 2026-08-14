/* ==========================================================================
   Aplica o banco de imagens da pesquisa ao catálogo.

   Entrada : pesquisa-imagens/imagens.json  (saída do Antigravity)
   Saída   : images.js                      (mapa id -> url, lido pelo site)

   Uso: node scripts/aplicar-imagens.cjs

   O script é conservador de propósito. Item sem URL, com URL inválida, com id
   desconhecido ou marcado como nao_encontrado é descartado e reportado — o
   produto simplesmente segue com a ilustração vetorial da garrafa. Uma pesquisa
   que volta pela metade nunca deixa o site num estado quebrado.
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const ENTRADA = path.join(RAIZ, 'pesquisa-imagens', 'imagens.json');
const SAIDA = path.join(RAIZ, 'images.js');
const APP = path.join(RAIZ, 'app.js');

function ids_do_catalogo() {
    const a = fs.readFileSync(APP, 'utf8');
    const i = a.indexOf('const PRODUCTS_DATA');
    if (i === -1) throw new Error('PRODUCTS_DATA não encontrado em app.js');
    const j = a.indexOf('\n];', i) + 3;
    const lista = eval(a.slice(i + 'const PRODUCTS_DATA ='.length, j - 1));
    return new Map(lista.map(p => [p.id, p.name]));
}

function url_valida(u) {
    if (typeof u !== 'string' || !u.trim()) return false;
    try {
        const parsed = new URL(u);
        return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch (e) {
        return false;
    }
}

function main() {
    if (!fs.existsSync(ENTRADA)) {
        console.error(`Não achei ${path.relative(RAIZ, ENTRADA)}.`);
        console.error('Rode a pesquisa primeiro — o passo a passo está em pesquisa-imagens/BRIEFING-ANTIGRAVITY.md');
        process.exit(1);
    }

    let dados;
    try {
        dados = JSON.parse(fs.readFileSync(ENTRADA, 'utf8'));
    } catch (e) {
        console.error('imagens.json não é um JSON válido:', e.message);
        process.exit(1);
    }

    if (!Array.isArray(dados)) {
        console.error('imagens.json precisa ser uma lista de objetos.');
        process.exit(1);
    }

    const catalogo = ids_do_catalogo();
    const aceitos = {};
    const descartados = [];
    const duplicadas = new Map();

    dados.forEach((item, idx) => {
        const id = item && item.id;
        if (!id) return descartados.push(`item ${idx}: sem id`);
        if (!catalogo.has(id)) return descartados.push(`${id}: id não existe no catálogo`);
        if (aceitos[id]) return descartados.push(`${id}: id repetido no arquivo`);
        if (item.status === 'nao_encontrado') return descartados.push(`${id}: marcado como não encontrado`);
        if (!url_valida(item.url)) return descartados.push(`${id}: URL ausente ou inválida`);

        aceitos[id] = item.url;
        const lista = duplicadas.get(item.url) || [];
        lista.push(id);
        duplicadas.set(item.url, lista);
    });

    const repetidas = [...duplicadas.entries()].filter(([, ids]) => ids.length > 1);
    const baixaConfianca = dados.filter(i => i.confianca === 'baixa' || i.confianca === 'media');

    const cabecalho = `/* Gerado por scripts/aplicar-imagens.cjs em ${new Date().toISOString()}.
   Não edite à mão: rode o script de novo.
   Mapa id do produto -> URL da foto. O que não estiver aqui usa a garrafa vetorial. */\n`;

    fs.writeFileSync(
        SAIDA,
        cabecalho + 'window.PRODUCT_IMAGES = ' + JSON.stringify(aceitos, null, 2) + ';\n',
        'utf8'
    );

    const total = catalogo.size;
    const ok = Object.keys(aceitos).length;
    console.log(`\nimages.js gravado: ${ok} de ${total} produtos com foto (${total - ok} seguem com a garrafa vetorial).`);

    if (descartados.length) {
        console.log(`\nDescartados (${descartados.length}):`);
        descartados.forEach(d => console.log('  -', d));
    }

    if (repetidas.length) {
        console.log('\nATENÇÃO — mesma URL em produtos diferentes, pelo menos um está errado:');
        repetidas.forEach(([url, ids]) => console.log('  -', ids.join(', '), '->', url));
    }

    if (baixaConfianca.length) {
        console.log(`\nConferir à mão (confiança média ou baixa) — ${baixaConfianca.length} itens:`);
        baixaConfianca.forEach(i => console.log(`  - ${i.id} ${catalogo.get(i.id) || ''} ${i.observacao ? '— ' + i.observacao : ''}`));
    }

    const semFoto = [...catalogo.keys()].filter(id => !aceitos[id]);
    if (semFoto.length) {
        console.log(`\nAinda sem foto (${semFoto.length}): ${semFoto.join(', ')}`);
    }
    console.log('');
}

main();
