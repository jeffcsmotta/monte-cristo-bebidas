/* ==========================================================================
   Servidor local do projeto. Sem dependência, sem instalação.

   Uso: node scripts/servir.cjs [porta]        (padrão: 8080)

   Serve a pasta do projeto em http://localhost:8080 —
     /                    o site
     /conferencia.html    a conferência de imagens

   Abrir os arquivos direto pelo Explorer também funciona, mas pelo servidor
   o comportamento é idêntico ao do site publicado.
   ========================================================================== */

const http = require('http');
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const PORTA = Number(process.argv[2]) || 8080;

const TIPOS = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.md': 'text/plain; charset=utf-8',
    '.csv': 'text/csv; charset=utf-8'
};

http.createServer((req, res) => {
    let caminho = decodeURIComponent(req.url.split('?')[0]);
    if (caminho === '/') caminho = '/index.html';

    const arquivo = path.join(RAIZ, caminho);

    // não sair da pasta do projeto
    if (!arquivo.startsWith(RAIZ)) {
        res.writeHead(403);
        return res.end('fora do projeto');
    }
    if (!fs.existsSync(arquivo) || fs.statSync(arquivo).isDirectory()) {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        return res.end(`não achei ${caminho}`);
    }

    res.writeHead(200, {
        'content-type': TIPOS[path.extname(arquivo).toLowerCase()] || 'application/octet-stream',
        'cache-control': 'no-cache'
    });
    fs.createReadStream(arquivo).pipe(res);
}).listen(PORTA, () => {
    console.log(`\nSite            http://localhost:${PORTA}/`);
    console.log(`Conferência     http://localhost:${PORTA}/conferencia.html`);
    console.log(`\nCtrl+C para parar.\n`);
});
