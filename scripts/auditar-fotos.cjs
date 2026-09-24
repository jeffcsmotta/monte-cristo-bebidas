/* Audita a cobertura de fotos do catálogo.
   Uso: node scripts/auditar-fotos.cjs
   Cruza os ids de BASE_PRODUCTS_DATA (app.js) com as chaves de images.js
   e lista quem segue na ilustração vetorial (bottles.js). */
const fs = require('fs');
const app = fs.readFileSync('app.js', 'utf8');
const ids = [...app.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
const img = fs.readFileSync('images.js', 'utf8');
const keys = [...img.matchAll(/"([a-z]+-[0-9]+(?:-alt)?)"/g)].map((m) => m[1]);
const imgSet = new Set(keys);
const sem = ids.filter((id) => !imgSet.has(id));
console.log('TOTAL catalogo: ' + ids.length);
console.log('COM foto: ' + (ids.length - sem.length));
console.log('SEM foto (' + sem.length + '): ' + sem.join(', '));
const nomes = [...app.matchAll(/id:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)"/g)];
const mapa = Object.fromEntries(nomes.map((m) => [m[1], m[2]]));
sem.forEach((id) => console.log('  - ' + id + ': ' + (mapa[id] || '?')));
