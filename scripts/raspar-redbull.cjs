/* Red Bull: baixa o packshot da lata direto do Storyblok (CDN do redbull.com). */
const fs = require('fs');
const path = require('path');
const https = require('https');

const RAIZ = path.resolve(__dirname, '..');
const DESTINO = path.join(RAIZ, 'assets', 'produtos');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36';

const ALVOS = [
  { id: 'en-25', file: 'energetico-red-bull-tradicional-250ml.webp', pagina: 'https://www.redbull.com/br-pt/energydrink/products/red-bull-energy-drink', agulha: /br_ed_250ml/ },
  { id: 'en-30', file: 'energetico-red-bull-zero-250ml.webp', pagina: 'https://www.redbull.com/br-pt/energydrink/products/red-bull-zero', agulha: /br_zr_250ml/ },
];

function baixar(url, pagina) {
  return new Promise((resolve, reject) => {
    https.get(new URL(url), { headers: { 'User-Agent': UA, Accept: 'image/*', Referer: pagina } }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode));
      }
      const partes = [];
      res.on('data', (p) => partes.push(p));
      res.on('end', () => resolve(Buffer.concat(partes)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  for (const alvo of ALVOS) {
    const html = await (await fetch(alvo.pagina, { headers: { 'User-Agent': UA } })).text();
    const urls = [...new Set([...html.matchAll(/https?:\/\/[a-z0-9./_-]*storyblok\.com\/f\/287059\/[0-9x]+\/[a-f0-9]+\/[^"'()\s]+/gi)].map((m) => m[0]))];
    const boas = urls.filter((u) => alvo.agulha.test(u));
    console.log(`## ${alvo.id}: ${boas.length} candidatas`);
    boas.slice(0, 4).forEach((u) => console.log('   ' + u.slice(0, 150)));
    for (const u of boas) {
      const proxy = u.replace('https://a.storyblok.com/', 'https://www.redbull.com/energydrink/v1/resources/storyblok/images/');
      for (const tentativa of [proxy, u]) {
        try {
          const buf = await baixar(tentativa, alvo.pagina);
          if (buf.length < 10 * 1024) continue;
          fs.writeFileSync(path.join(DESTINO, alvo.file), buf);
          console.log(`   + SALVOU ${alvo.file} (${Math.round(buf.length / 1024)}KB)`);
          break;
        } catch (e) {
          console.log('   x ' + e.message + ' :: ' + tentativa.slice(0, 80));
        }
      }
      if (fs.existsSync(path.join(DESTINO, alvo.file))) break;
    }
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
