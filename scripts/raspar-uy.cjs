/* Camada UY: baixa og:image das páginas Disco/Devoto/Geant. */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const RAIZ = path.resolve(__dirname, '..');
const DESTINO = path.join(RAIZ, 'assets', 'produtos');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ALVOS = [
  { id: 'cc-10', file: 'cerveja-nortena-garrafa-960ml.webp', pagina: 'https://www.devoto.com.uy/product/cerveza-nortena-960-ml/550333' },
  { id: 'cv-2', file: 'cerveja-nortena-lata-473ml.webp', pagina: 'https://www.devoto.com.uy/product/cerveza-nortena-473-ml/550917' },
  { id: 'cc-12', file: 'cerveja-patricia-garrafa-960ml.webp', pagina: 'https://www.disco.com.uy/cerveza-patricia-960-ml-550431/p' },
  { id: 'cv-4', file: 'cerveja-patricia-lata-473ml.webp', pagina: 'https://www.devoto.com.uy/product/cerveza-patricia-473-ml/550916' },
  { id: 'cc-14', file: 'cerveja-pilsen-garrafa-960ml.webp', pagina: 'https://www.devoto.com.uy/product/cerveza-pilsen-960-ml/550222' },
  { id: 'cc-15', file: 'cerveja-zillertal-garrafa-970ml.webp', pagina: 'https://www.geant.com.uy/product/cerveza-zillertal-970-ml/550228' },
  { id: 'cv-7', file: 'cerveja-zillertal-lata-473ml.webp', pagina: 'https://www.devoto.com.uy/product/cerveza-zillertal-473-cc/550550' },
];

function baixar(url, redir = 0) {
  return new Promise((resolve, reject) => {
    if (redir > 5) return reject(new Error('redirects demais'));
    const alvo = new URL(url);
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
      const partes = [];
      res.on('data', (p) => partes.push(p));
      res.on('end', () => resolve(Buffer.concat(partes)));
      res.on('error', reject);
    });
    req.setTimeout(25000, () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

(async () => {
  const filtro = process.argv[2];
  for (const a of ALVOS.filter((x) => !filtro || x.id === filtro)) {
    try {
      const html = await (await fetch(a.pagina, { headers: { 'User-Agent': UA } })).text();
      const m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i);
      if (!m) throw new Error('og:image ausente');
      const img = m[1].replace(/&(amp|#038);/g, '&');
      console.log(`${a.id}: ${img.slice(0, 130)}`);
      const buf = await baixar(img.startsWith('http') ? img : new URL(img, a.pagina).toString());
      if (buf.length < 4 * 1024) throw new Error('bytes insuficientes');
      fs.writeFileSync(path.join(DESTINO, a.file), buf);
      console.log(`+ ${a.id} <- ${a.file} (${Math.round(buf.length / 1024)}KB)`);
    } catch (e) {
      console.log(`! ${a.id}: ${e.message}`);
    }
    await sleep(700);
  }
})();
