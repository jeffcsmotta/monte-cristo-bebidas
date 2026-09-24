/* Camada fácil: fotos nos sites oficiais das marcas.
   Uso: node scripts/raspar-oficiais.cjs
   Baixa para assets/produtos/ e imprime o bloco de mapeamento
   id -> arquivo para colar no raspar-nexxt.cjs (ALVOS) ou aplicar direto. */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const RAIZ = path.resolve(__dirname, '..');
const DESTINO = path.join(RAIZ, 'assets', 'produtos');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ALVOS = [
  { id: 'en-25', file: 'energetico-red-bull-tradicional-250ml.webp', urls: [
    'https://www.redbull.com/br-pt/energydrink/products/red-bull-energy-drink',
  ]},
  { id: 'en-30', file: 'energetico-red-bull-zero-250ml.webp', urls: [
    'https://www.redbull.com/br-pt/energydrink/products/red-bull-zero',
    'https://www.redbull.com/br-pt/energydrink/products/red-bull-sugarfree',
  ]},
  { id: 'lc-36', file: 'licor-43-original-700ml.webp', urls: [
    'https://licor43.com/pt-br/licor-43-original/',
  ]},
  { id: 'gt-56', file: 'rum-bacardi-limon-980ml.webp', urls: [
    'https://www.bacardi.com/us/en/our-rums/limon-rum/',
  ]},
  { id: 'wh-80', file: 'whisky-jack-daniels-blackberry-1l.webp', urls: [
    'https://www.jackdaniels.com/en-us/whiskey/tennessee-blackberry',
  ]},
  { id: 'xr-107', file: 'xarope-monin-tangerina-700ml.webp', urls: [
    'https://monin.com.br/products/xarope-monin-de-tangerina',
  ]},
];

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html' } });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.text();
}

function extrairImagens(html) {
  const achadas = [];
  const og = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i);
  if (og) achadas.push(og[1]);
  const og2 = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (og2) achadas.push(og2[1]);
  for (const m of html.matchAll(/"image"\s*:\s*"(https?:[^"]+)"/g)) achadas.push(m[1].replace(/\\/g, ''));
  for (const m of html.matchAll(/https?:\/\/[^"'\s<>]+\.(?:png|jpe?g|webp)(?:\?[^"'\s<>]*)?/gi)) achadas.push(m[0]);
  // prioriza nomes com cara de foto de produto
  const score = (u) => {
    const l = u.toLowerCase();
    let s = 0;
    if (/bottle|product|packshot|can|_p\d|hero|principal|featured/.test(l)) s += 3;
    if (/logo|icon|sprite|banner|flag|loader|avatar/.test(l)) s -= 5;
    if (/\.svg/.test(l)) s -= 10;
    return s;
  };
  return [...new Set(achadas)].sort((a, b) => score(b) - score(a));
}

function baixar(url, redir = 0) {
  return new Promise((resolve, reject) => {
    if (redir > 5) return reject(new Error('redirects demais'));
    let alvo;
    try {
      alvo = new URL(url, 'https://x/');
    } catch (e) {
      return reject(new Error('URL malformada'));
    }
    const cliente = alvo.protocol === 'http:' ? http : https;
    const req = cliente.get(alvo, { headers: { 'User-Agent': UA, Accept: 'image/*' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(baixar(new URL(res.headers.location, alvo).toString(), redir + 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode));
      }
      const tipo = (res.headers['content-type'] || '').split(';')[0].trim();
      const partes = [];
      res.on('data', (p) => partes.push(p));
      res.on('end', () => resolve({ buffer: Buffer.concat(partes), tipo }));
      res.on('error', reject);
    });
    req.setTimeout(25000, () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

function ehImagem(buffer, tipo) {
  if (buffer.length < 4 * 1024) return false;
  // Alguns CDNs (ex.: Licor 43) não mandam content-type: confere o magic bytes.
  const magico = buffer.subarray(0, 12);
  const assinatura = magico.toString('ascii', 0, 4);
  if (assinatura === 'RIFF' && magico.toString('ascii', 8, 12) === 'WEBP') return true;
  if (assinatura === '\x89PNG') return true;
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return true;
  if (assinatura === 'GIF8') return true;
  return /image\//.test(tipo || '');
}

(async () => {
  fs.mkdirSync(DESTINO, { recursive: true });
  const filtro = process.argv[2];
  const alvos = filtro ? ALVOS.filter((a) => a.id === filtro) : ALVOS;
  for (const alvo of alvos) {
    let feito = false;
    for (const pagina of alvo.urls) {
      if (feito) break;
      try {
        const html = await fetchText(pagina);
        const candidatas = extrairImagens(html).slice(0, 6);
        console.log(`\n## ${alvo.id} <- ${pagina}`);
        candidatas.forEach((u) => console.log('   cand: ' + u.slice(0, 140)));
        for (const imgUrl of candidatas) {
          try {
            const full = new URL(imgUrl, pagina).toString();
            const { buffer, tipo } = await baixar(full);
            if (!ehImagem(buffer, tipo)) continue;
            fs.writeFileSync(path.join(DESTINO, alvo.file), buffer);
            console.log(`   + SALVOU ${alvo.file} (${Math.round(buffer.length / 1024)}KB, ${tipo})`);
            feito = true;
            break;
          } catch (e) {
            console.log('   x ' + e.message + ' :: ' + imgUrl.slice(0, 100));
          }
        }
      } catch (e) {
        console.log(`\n## ${alvo.id} <- ${pagina} FALHOU: ${e.message}`);
      }
      await sleep(800);
    }
    if (!feito) console.log(`\n!! ${alvo.id}: sem imagem aproveitável`);
  }
})();
