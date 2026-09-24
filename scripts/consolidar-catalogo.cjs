/**
 * ==============================================================================
 * MONTE CRISTO BEBIDAS — SCRIPT DE CONSOLIDAÇÃO E VERSIONAMENTO DO CATÁLOGO
 * 
 * Uso:
 *   node scripts/consolidar-catalogo.cjs
 *   node scripts/consolidar-catalogo.cjs [caminho/para/catalogo_exportado.json]
 * 
 * Este script sincroniza a fonte única da verdade (catalogo_consolidado.json)
 * com os artefatos de runtime:
 *   1. dados/catalogo_consolidado.json
 *   2. dados/catalogo_completo_2026.json
 *   3. dados/base_products_data.js
 *   4. app.js (seção BASE_PRODUCTS_DATA)
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');
const DADOS_DIR = path.join(ROOT_DIR, 'dados');

const CONSOLIDADO_JSON_PATH = path.join(DADOS_DIR, 'catalogo_consolidado.json');
const COMPLETO_JSON_PATH = path.join(DADOS_DIR, 'catalogo_completo_2026.json');
const BASE_JS_PATH = path.join(DADOS_DIR, 'base_products_data.js');
const APP_JS_PATH = path.join(ROOT_DIR, 'app.js');

// 1. Determinar arquivo de entrada
const inputArg = process.argv[2];
const inputFile = inputArg ? path.resolve(process.cwd(), inputArg) : CONSOLIDADO_JSON_PATH;

if (!fs.existsSync(inputFile)) {
    console.error(`❌ Arquivo de entrada não encontrado: ${inputFile}`);
    process.exit(1);
}

console.log(`📦 Lendo catálogo de: ${path.relative(ROOT_DIR, inputFile)}`);

let rawData;
try {
    rawData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
} catch (e) {
    console.error(`❌ Erro de parsing JSON em ${inputFile}:`, e.message);
    process.exit(1);
}

if (!Array.isArray(rawData) || rawData.length === 0) {
    console.error('❌ O arquivo JSON precisa conter um array não-vazio de produtos.');
    process.exit(1);
}

// 2. Normalização e Validação dos Produtos
const seenIds = new Set();
const normalizedProducts = [];

rawData.forEach((item, idx) => {
    if (!item.id || typeof item.id !== 'string') {
        throw new Error(`Item no índice ${idx} não possui 'id' válido.`);
    }
    if (!item.name || typeof item.name !== 'string') {
        throw new Error(`Item [${item.id}] não possui 'name' válido.`);
    }
    if (seenIds.has(item.id)) {
        throw new Error(`ID duplicado detectado: "${item.id}".`);
    }
    seenIds.add(item.id);

    const price = typeof item.price === 'number' && !isNaN(item.price) 
        ? Math.round(item.price * 100) / 100 
        : parseFloat(item.price) || 0;

    const boxQty = parseInt(item.boxQty) || (item.category === 'energeticos' || item.category === 'xaropes' ? 12 : 6);
    
    let boxTotal;
    if (typeof item.boxTotal === 'number' && !isNaN(item.boxTotal)) {
        boxTotal = Math.round(item.boxTotal * 100) / 100;
    } else if (item.boxTotal) {
        boxTotal = Math.round(parseFloat(item.boxTotal) * 100) / 100;
    } else {
        // Cálculo padrão com ~8% de desconto no atacado da serra
        boxTotal = Math.round(price * boxQty * 0.92 * 100) / 100;
    }

    const prod = {
        id: item.id.trim(),
        name: item.name.trim(),
        volume: (item.volume || '1L').trim(),
        price: price,
        category: (item.category || 'outros').trim(),
        boxQty: boxQty,
        boxTotal: boxTotal,
        active: item.active !== false
    };

    if (item.image && typeof item.image === 'string') {
        prod.image = item.image.trim();
    }

    normalizedProducts.push(prod);
});

console.log(`✓ Validados ${normalizedProducts.length} produtos sem conflitos.`);

// 3. Gravação dos arquivos JSON consolidados
const formattedJson = JSON.stringify(normalizedProducts, null, 2);
fs.writeFileSync(CONSOLIDADO_JSON_PATH, formattedJson, 'utf8');
fs.writeFileSync(COMPLETO_JSON_PATH, formattedJson, 'utf8');
console.log(`✓ Atualizado: dados/catalogo_consolidado.json`);
console.log(`✓ Atualizado: dados/catalogo_completo_2026.json`);

// 4. Geração de dados/base_products_data.js
const jsLines = [
    'const BASE_PRODUCTS_DATA = ['
];

normalizedProducts.forEach(p => {
    jsLines.push('    {');
    jsLines.push(`        id: ${JSON.stringify(p.id)},`);
    jsLines.push(`        name: ${JSON.stringify(p.name)},`);
    jsLines.push(`        volume: ${JSON.stringify(p.volume)},`);
    jsLines.push(`        price: ${p.price.toFixed(2)},`);
    jsLines.push(`        category: ${JSON.stringify(p.category)},`);
    jsLines.push(`        boxQty: ${p.boxQty},`);
    jsLines.push(`        boxTotal: ${p.boxTotal.toFixed(2)},`);
    jsLines.push(`        active: ${p.active}`);
    if (p.image) {
        jsLines.push(`        image: ${JSON.stringify(p.image)}`);
    }
    jsLines.push('    },');
});

jsLines.push('];');
jsLines.push('');
jsLines.push('// PRODUCTS_DATA dinâmico que integra itens base + itens customizados via Admin');
jsLines.push('let PRODUCTS_DATA = [...BASE_PRODUCTS_DATA];');
jsLines.push('');

const baseProductsJsContent = jsLines.join('\n');
fs.writeFileSync(BASE_JS_PATH, baseProductsJsContent, 'utf8');
console.log(`✓ Atualizado: dados/base_products_data.js`);

// 5. Atualização in-place de app.js
let appJsContent = fs.readFileSync(APP_JS_PATH, 'utf8');

const startMarker = 'const BASE_PRODUCTS_DATA = [';
const endMarker = 'let PRODUCTS_DATA = [...BASE_PRODUCTS_DATA];';

const startIndex = appJsContent.indexOf(startMarker);
const endIndex = appJsContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    console.error('❌ Marcadores de BASE_PRODUCTS_DATA não encontrados em app.js para substituição segura.');
    process.exit(1);
}

const beforePart = appJsContent.slice(0, startIndex);
const afterPart = appJsContent.slice(endIndex + endMarker.length);

const updatedAppJsContent = beforePart + baseProductsJsContent.trim() + afterPart;

// Teste de sintaxe antes de salvar
try {
    new vm.Script(updatedAppJsContent);
} catch (err) {
    console.error('❌ Falha na verificação de sintaxe do novo app.js:', err.message);
    process.exit(1);
}

fs.writeFileSync(APP_JS_PATH, updatedAppJsContent, 'utf8');
console.log(`✓ Atualizado com sucesso: app.js (BASE_PRODUCTS_DATA sincronizado)`);

// 6. Resumo e Estatísticas
const catCount = {};
let activeCount = 0;
let minPrice = Infinity;
let maxPrice = -Infinity;

normalizedProducts.forEach(p => {
    catCount[p.category] = (catCount[p.category] || 0) + 1;
    if (p.active) activeCount++;
    if (p.price < minPrice) minPrice = p.price;
    if (p.price > maxPrice) maxPrice = p.price;
});

console.log('\n==================================================');
console.log('🎉 CATÁLOGO CONSOLIDADO E SINCRONIZADO!');
console.log('==================================================');
console.log(`Total de Rótulos : ${normalizedProducts.length}`);
console.log(`Itens Ativos     : ${activeCount}`);
console.log(`Faixa de Preço   : R$ ${minPrice.toFixed(2)} até R$ ${maxPrice.toFixed(2)}`);
console.log('Categorias:');
Object.entries(catCount).forEach(([cat, qty]) => {
    console.log(`  • ${cat.padEnd(20)}: ${qty} item(ns)`);
});
console.log('==================================================');
console.log('💡 DICA DE VERSIONAMENTO:');
console.log('  git add dados/ app.js');
console.log('  git commit -m "feat(catalogo): atualizar catalogo consolidado oficial"');
console.log('  git push origin master');
console.log('==================================================\n');
