/* Camada regional: Fante (Rajska) + supermercados uruguaios (fNC).
   Uso: node scripts/raspar-regionais.cjs [id]
   Baixa para assets/produtos/ e imprime o resumo. O registro no images.js
   é feito à mão em seguida (poucas chaves). */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const RAIZ = path.resolve(__dirname, '..');
const DESTINO = path.join(RAIZ, 'assets', 'produtos');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html' } });
  if (!res.ok) throw new Error('HTTP ' + res.status + ' :: ' + url);
  return res.text();
}

function ogImage(html) {
  const m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  return m ? m[1].replace(/&(amp|#038);/g, '&') : null;
}

function baixar(url, redir = 0) {
  return new Promise((resolve, reject) => {
    if (redir > 5) return reject(new Error('redirects demais'));
    let alvo;
    try {
      alvo = new URL(url);
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

function ehImagem(buffer) {
  if (buffer.length < 4 * 1024) return false;
  const a = buffer.subarray(0, 4).toString('ascii');
  if (a === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP') return true;
  if (a === '\x89PNG' || (buffer[0] === 0xff && buffer[1] === 0xd8) || a === 'GIF8') return true;
  return true; // deixa passar o resto; a conferência visual decide
}

async function baixaDireta(id, file, url) {
  const { buffer } = await baixar(url);
  if (!ehImagem(buffer)) throw new Error('bytes inválidos');
  fs.writeFileSync(path.join(DESTINO, file), buffer);
  console.log(`+ ${id} <- ${file} (${Math.round(buffer.length / 1024)}KB) [direta]`);
}

async function viaPagina(id, file, pagina) {
  const html = await fetchText(pagina);
  const img = ogImage(html);
  if (!img) throw new Error('og:image ausente em ' + pagina);
  console.log(`  ${id} og:image: ${img.slice(0, 120)}`);
  await baixaDireta(id, file, img.startsWith('http') ? img : new URL(img, pagina).toString());
}

(async () => {
  fs.mkdirSync(DESTINO, { recursive: true });
  const filtro = process.argv[2];

  // 1. Fante — Rajska tradicional e Apple (og:image conhecido)
  const fante = [
    { id: 'vk-6', file: 'vodka-rajska-tradicional-1l.webp', url: 'https://www.fante.com.br/wp-content/uploads/2024/11/8bc45-nova-rajska.webp' },
    { id: 'vk-7', file: 'vodka-rajska-apple-1l.webp', url: 'https://www.fante.com.br/wp-content/uploads/2024/11/ee0b4-kv-nova-rajska-apple.webp' },
  ];
  for (const f of fante) {
    if (filtro && f.id !== filtro) continue;
    try {
      await baixaDireta(f.id, f.file, f.url);
    } catch (e) {
      console.log(`! ${f.id}: ${e.message}`);
    }
    await sleep(600);
  }

  // 2. Rajska Red Fruits: sonda slugs na Fante
  if (!filtro || filtro === 'vk-8') {
    let achou = false;
    for (const slug of ['rajska-red-fruits', 'rajska-frutal', 'rajska-fruits', 'rajska-morango']) {
      try {
        const html = await fetchText('https://www.fante.com.br/produto/' + slug + '/');
        const img = ogImage(html);
        if (img && /rajska/i.test(img)) {
          console.log(`  vk-8 slug ${slug}: ${img.slice(0, 120)}`);
          await baixaDireta('vk-8', 'vodka-rajska-red-fruits-1l.webp', img);
          achou = true;
          break;
        }
      } catch (e) {
        console.log(`  vk-8 slug ${slug}: ${e.message}`);
      }
      await sleep(500);
    }
    if (!achou) console.log('! vk-8: nenhum slug da Fante rendeu foto');
  }

  // 3. Devoto/Disco (UY): categoria de cervejas -> links -> og:image
  if (!filtro || filtro === 'uy') {
    try {
      const cat = await fetchText('https://www.devoto.com.uy/products/category/cervezas/1113');
      const links = [...new Set([...cat.matchAll(/href="(\/product\/[a-z0-9\-]+\/\d+\/?)"/g)].map((m) => 'https://www.devoto.com.uy' + m[1]))];
      console.log(`\ndevoto: ${links.length} produtos na categoria`);
      const querem = [/norten/, /patricia/, /zillertal/, /pilsen/];
      for (const link of links.filter((l) => querem.some((re) => re.test(l)))) {
        console.log('  pag: ' + link);
        try {
          const html = await fetchText(link);
          console.log('    og: ' + (ogImage(html) || 'NADA').slice(0, 130));
        } catch (e) {
          console.log('    ERRO ' + e.message);
        }
        await sleep(600);
      }
    } catch (e) {
      console.log('! devoto categoria: ' + e.message);
    }
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
