/* Smoke test pré-deploy: sintaxe JS + chaves de images.js resolvem em disco. */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const RAIZ = path.resolve(__dirname, '..');
let falhas = 0;

// 1. sintaxe dos JS que o navegador carrega
for (const f of ['app.js', 'images.js', 'bottles.js', 'sw.js']) {
  try {
    execSync(`node --check "${path.join(RAIZ, f)}"`, { stdio: 'pipe' });
    console.log('OK sintaxe: ' + f);
  } catch (e) {
    falhas++;
    console.log('FALHA sintaxe: ' + f);
  }
}

// 2. toda chave de images.js existe em disco
const src = fs.readFileSync(path.join(RAIZ, 'images.js'), 'utf8');
const valores = [...src.matchAll(/"assets\/produtos\/([^"]+)"/g)].map((m) => m[1]);
const ausentes = [...new Set(valores)].filter((v) => !fs.existsSync(path.join(RAIZ, 'assets', 'produtos', v)));
if (ausentes.length) {
  falhas += ausentes.length;
  ausentes.forEach((a) => console.log('FALHA arquivo ausente: ' + a));
} else {
  console.log(`OK imagens: ${new Set(valores).size} arquivos referenciados, todos em disco.`);
}

// 3. arquivos de entrada do deploy existem
for (const f of ['index.html', 'style.css', 'manifest.json', '_headers', 'robots.txt', 'wrangler.toml']) {
  if (fs.existsSync(path.join(RAIZ, f))) console.log('OK deploy: ' + f);
  else {
    falhas++;
    console.log('FALHA deploy ausente: ' + f);
  }
}

console.log(falhas === 0 ? '\nSMOKE TEST: PASSOU' : `\nSMOKE TEST: ${falhas} FALHA(S)`);
process.exit(falhas === 0 ? 0 : 1);
