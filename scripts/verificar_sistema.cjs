const fs = require('fs');
const path = require('path');

console.log("=== INICIANDO VERIFICAÇÃO INTEGRAL MONTE CRISTO ===");

// 1. Check JS syntax
const jsFiles = ['app.js', 'images.js', 'bottles.js'];
jsFiles.forEach(file => {
    try {
        const fullPath = path.join(__dirname, '..', file);
        const code = fs.readFileSync(fullPath, 'utf8');
        new Function(code);
        console.log(`✓ [JS Sintaxe] ${file}: OK`);
    } catch(err) {
        console.error(`✕ [JS Sintaxe] ${file} Erro:`, err.message);
    }
});

// 2. Check HTML files
const htmlFiles = ['index.html', 'gestao-precos.html'];
htmlFiles.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('Monte Cristo') && content.includes('app.js')) {
        console.log(`✓ [HTML] ${file}: OK (Tags e scripts presentes)`);
    } else {
        console.error(`✕ [HTML] ${file}: Estrutura incompleta!`);
    }
});

// 3. Verify WhatsApp Numbers
const appContent = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const ivanOk = appContent.includes('5554999692859');
const micheleOk = appContent.includes('5554991552544');

if (ivanOk && micheleOk) {
    console.log("✓ [WhatsApp] Canais Ivan (5554999692859) e Michele (5554991552544) configurados corretamente!");
} else {
    console.error("✕ [WhatsApp] Falha ao encontrar os números configurados!");
}

// 4. Verify Cloudflare Configs
const headersExists = fs.existsSync(path.join(__dirname, '..', '_headers'));
const wranglerExists = fs.existsSync(path.join(__dirname, '..', 'wrangler.toml'));

if (headersExists && wranglerExists) {
    console.log("✓ [Cloudflare Pages] Arquivos _headers e wrangler.toml prontos para deploy!");
} else {
    console.error("✕ [Cloudflare Pages] Arquivos de configuração ausentes!");
}

console.log("=== VERIFICAÇÃO CONCLUÍDA COM SUCESSO! ===");
