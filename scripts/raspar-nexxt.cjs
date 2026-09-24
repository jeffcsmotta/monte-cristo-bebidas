/* ==========================================================================
   Raspa fotos dos produtos que faltam em nexxtbebidas.com.br (Nuvemshop)
   e grava em assets/produtos/, atualizando images.js.

   Uso: node scripts/raspar-nexxt.cjs

   Para cada slug: busca a página do produto, extrai a maior imagem do CDN
   (acdn-us.mitiendanube.com), baixa para assets/produtos/ e registra o
   mapeamento id -> arquivo. Também remapeia os arquivos locais existentes
   para os ids atuais do catálogo (app.js), corrigindo chaves antigas que
   apontavam para o produto errado (ex.: lc-3 exibia Licor 43 no Brasilberg).
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const RAIZ = path.resolve(__dirname, '..');
const DESTINO = path.join(RAIZ, 'assets', 'produtos');
const SAIDA = path.join(RAIZ, 'images.js');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* slug na nexxt -> { arquivo local, ids do nosso catálogo } */
const ALVOS = [
  { slug: 'energetico-baly-2000-ml', file: 'energetico-baly-tradicional-2l.webp', ids: ['en-20', 'en-24'] },
  { slug: 'energetico-baly-melancia-2000-ml', file: 'energetico-baly-melancia-2l.webp', ids: ['en-23'] },
  { slug: 'energetico-baly-tropical-2000-ml', file: 'energetico-baly-tropical-2l.webp', ids: ['en-21'] },
  { slug: 'energetico-baly-maca-verde-2000-ml', file: 'energetico-baly-maca-verde-2l.webp', ids: ['en-22'] },
  { slug: 'energetico-red-bull-sugar-free-250-ml', file: 'energetico-red-bull-sugar-free-250ml.webp', ids: ['en-29'] },
  { slug: 'energetico-red-bull-melancia', file: 'energetico-red-bull-melancia-250ml.webp', ids: ['en-27'] },
  { slug: 'energetico-red-bull-morango-pessego250-ml', file: 'energetico-red-bull-morango-pessego-250ml.webp', ids: ['en-28'] },
  { slug: 'energetico-red-bull-tropical-250-ml', file: 'energetico-red-bull-tropical-250ml.webp', ids: ['en-26'] },
  { slug: 'xarope-monin-cereja-700-ml', file: 'xarope-monin-cereja-700ml.webp', ids: ['xr-104'] },
  { slug: 'xarope-monin-pessego-700-ml', file: 'xarope-monin-pessego-700ml.webp', ids: ['xr-106'] },
  { slug: 'xarope-monin-morango-700-ml', file: 'xarope-monin-morango-700ml.webp', ids: ['xr-99'] },
  { slug: 'xarope-monin-framboesa-700-ml', file: 'xarope-monin-framboesa-700ml.webp', ids: ['xr-108'] },
  { slug: 'xarope-monin-cranberry-700-ml', file: 'xarope-monin-cranberry-700ml.webp', ids: ['xr-102'] },
  { slug: 'xarope-monin-gengibre-700-ml', file: 'xarope-monin-gengibre-700ml.webp', ids: ['xr-101'] },
  { slug: 'xarope-monin-maca-verde-700-ml', file: 'xarope-monin-maca-verde-700ml.webp', ids: ['xr-98'] },
  { slug: 'xarope-monin-limao-siciliano-700-ml', file: 'xarope-monin-limao-siciliano-700ml.webp', ids: ['xr-100'] },
  { slug: 'xarope-monin-roma-700-ml', file: 'xarope-monin-roma-700ml.webp', ids: ['xr-105'] },
  { slug: 'xarope-monin-flor-de-sabugueiro-700-ml', file: 'xarope-monin-sabugueiro-700ml.webp', ids: ['xr-103'] },
  { slug: 'licor-formula-morango-700-ml', file: 'xarope-formula-morango-1l.webp', ids: ['xr-89'] },
  { slug: 'licor-formula-chocolate-700-ml', file: 'xarope-formula-chocolate-1l.webp', ids: ['xr-90'] },
  { slug: 'licor-formula-maca-verde-700-ml', file: 'xarope-formula-maca-verde-1l.webp', ids: ['xr-94'] },
  { slug: 'licor-formula-pessego-700-ml', file: 'xarope-formula-pessego-1l.webp', ids: ['xr-95'] },
  { slug: 'licor-stock-chocolate-720-ml', file: 'licor-stock-chocolate-720ml.webp', ids: ['lc-47'] },
  { slug: 'licor-stock-morango-720-ml', file: 'licor-stock-morango-720ml.webp', ids: ['lc-46'] },
  { slug: 'licor-stock-menta-720-ml', file: 'licor-stock-menta-720ml.webp', ids: ['lc-51'] },
  { slug: 'licor-stock-cafe-720-ml', file: 'licor-stock-cafe-720ml.webp', ids: ['lc-52'] },
  { slug: 'licor-stock-pessego-720-ml', file: 'licor-stock-pessego-720ml.webp', ids: ['lc-44'] },
  { slug: 'licor-stock-marula-720-ml', file: 'licor-stock-marula-720ml.webp', ids: ['lc-48'] },
  { slug: 'licor-stock-curacau-fino-720-ml', file: 'licor-stock-curacau-fino-720ml.webp', ids: ['lc-43'] },
  { slug: 'licor-stock-curacau-blue-720-ml', file: 'licor-stock-curacau-blue-720ml.webp', ids: ['lc-45'] },
  { slug: 'licor-stock-creme-de-cacao-720-ml', file: 'licor-stock-creme-cacau-720ml.webp', ids: ['lc-49'] },
  { slug: 'licor-stock-creme-de-cassis-720-ml', file: 'licor-stock-creme-cassis-720ml.webp', ids: ['lc-50'] },
  { slug: 'gin-rocks-1000-ml', file: 'gin-rocks-tradicional-1l.webp', ids: ['gn-3'] },
  { slug: 'gin-rocks-strawberry-1000-ml', file: 'gin-rocks-strawberry-1l.webp', ids: ['gt-33'] },
  { slug: 'steinhaeger-doble-w-900-ml', file: 'steinhaeger-doble-w-900ml.webp', ids: ['rm-8'] },
  { slug: 'vodka-natasha-900-ml', file: 'vodka-natasha-900ml.webp', ids: ['vk-4'] },
  { slug: 'cachaca-ypioca-prata-965-ml', file: 'cachaca-ypioca-prata-965ml.webp', ids: ['cc-8'] },
  { slug: 'whisky-jack-daniels-green-apple-1000-ml', file: 'whisky-jack-daniels-apple-1l.webp', ids: ['wh-9'] },
  { slug: 'whisky-jack-daniels-honey-1000-ml', file: 'whisky-jack-daniels-honey-nexxt-1l.webp', ids: ['wh-83'] },
  { slug: 'whisky-jack-daniels-fire-1000-ml', file: 'whisky-jack-daniels-fire-nexxt-1l.webp', ids: ['wh-81'] },
];

/* Arquivos locais já em disco -> ids atuais corretos do catálogo. */
const ALIASES = {
  'wh-76': 'whisky-ballantines-finest-1l.webp',
  'wh-4': 'whisky-chivas-regal-12-anos-1l.webp',
  'wh-82': 'whisky-jack-daniels-old-no-7-1l.webp',
  'wh-84': 'whisky-jim-beam-bourbon-1l.webp',
  'wh-11': 'whisky-johnnie-walker-black-label-1l.webp',
  'wh-12': 'whisky-johnnie-walker-red-label-1l.webp',
  'wh-14': 'whisky-passport-1l.webp',
  'wh-15': 'whisky-white-horse-1l.webp',
  'vk-1': 'vodka-absolut-1l.webp',
  'vk-3': 'vodka-grey-goose-750ml.webp',
  'vk-5': 'vodka-orloff-1l.webp',
  'vk-68': 'vodka-ciroc-original-750ml.webp',
  'vk-75': 'vodka-smirnoff-21-998ml.webp',
  'gn-1': 'gin-gordons-london-dry-750ml.webp',
  'gt-34': 'gin-seagers-original-1l.webp',
  'gt-35': 'gin-tanqueray-london-dry-750ml.webp',
  'gn-6': 'tequila-jose-cuervo-reposado-750ml.webp',
  'gn-7': 'tequila-jose-cuervo-silver-750ml.webp',
  'rm-1': 'rum-bacardi-big-apple-700ml.webp',
  'rm-2': 'rum-bacardi-carta-blanca-superior-980ml.webp',
  'rm-3': 'rum-bacardi-gold-980ml.webp',
  'rm-6': 'rum-montilla-carta-cristal-1l.webp',
  'rm-7': 'rum-montilla-carta-ouro-1l.webp',
  'gt-57': 'rum-malibu-coconut-750ml.webp',
  'lc-1': 'aperitivo-aperol-spritz-750ml.webp',
  'lc-3': 'brasilberg-original-aperitivo-920ml.webp',
  'lc-4': 'bitter-campari-red-998ml.webp',
  'lc-5': 'licor-amaretto-dell-orso-700ml.webp',
  'lc-37': 'licor-43-chocolate-edition-700ml.webp',
  'lc-38': 'licor-amarula-cream-750ml.webp',
  'lc-40': 'licor-don-luiz-doce-de-leite-750ml.webp',
  'lc-41': 'licor-cointreau-liqueur-700ml.webp',
  'lc-42': 'licor-jagermeister-herb-700ml.webp',
  'cc-1': 'cachaca-51-pirassununga-965ml.webp',
  'cc-2': 'cachaca-velho-barreiro-910ml.webp',
  'cc-6': 'conhaque-domecq-1l.webp',
  'cc-7': 'cachaca-ypioca-brasilizar-ouro-965ml.webp',
  'cc-7-alt': 'conhaque-dreher-900ml.webp',
  'cc-8-alt': 'conhaque-presidente-900ml.webp',
  'vb-3': 'vermouth-martini-bianco-750ml.webp',
  'vb-4': 'vermouth-martini-extra-dry-750ml.webp',
  'vb-5': 'vermouth-martini-rosato-750ml.webp',
  'vb-6': 'vermouth-martini-rosso-750ml.webp',
};

function fetchText(url) {
  return fetch(url, { headers: { 'User-Agent': UA } }).then((r) => {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.text();
  });
}

function extrairImagem(html) {
  // 1. JSON-LD da página do produto (foto principal oficial)
  const ld = html.match(/"image"\s*:\s*"(https:\/\/acdn-us\.mitiendanube\.com[^"]+)"/);
  if (ld) return ld[1].replace(/\\/g, '');
  // 2. maior variante do srcset (prefere 1024w)
  const urls = [...html.matchAll(/\/\/(acdn-us\.mitiendanube\.com\/stores\/[^"'\s]+?)-(\d+)-0\.webp/g)];
  const candidatas = urls
    .filter((m) => m[0].includes('/products/'))
    .map((m) => ({ url: 'https:' + m[0].split(' ')[0], w: parseInt(m[2], 10) }))
    .sort((a, b) => b.w - a.w);
  return candidatas.length ? candidatas[0].url : null;
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
    const req = cliente.get(
      alvo,
      { headers: { 'User-Agent': UA, Accept: 'image/avif,image/webp,image/png,image/jpeg,*/*' } },
      (res) => {
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
      }
    );
    req.setTimeout(25000, () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

async function main() {
  fs.mkdirSync(DESTINO, { recursive: true });
  const mapa = {};
  const ok = [];
  const falhas = [];

  // 1. aliases locais (sem rede)
  for (const [id, arq] of Object.entries(ALIASES)) {
    if (fs.existsSync(path.join(DESTINO, arq))) {
      mapa[id] = 'assets/produtos/' + arq;
    } else {
      falhas.push(id + ': arquivo local ausente (' + arq + ')');
    }
  }

  // 2. downloads da nexxt
  for (const alvo of ALVOS) {
    const pagina = 'https://www.nexxtbebidas.com.br/produtos/' + alvo.slug + '/';
    try {
      const html = await fetchText(pagina);
      const imgUrl = extrairImagem(html);
      if (!imgUrl) throw new Error('imagem não encontrada na página');
      const { buffer, tipo } = await baixar(imgUrl);
      if (buffer.length < 4 * 1024) throw new Error('arquivo pequeno demais (' + buffer.length + 'b)');
      if (!/image\//.test(tipo)) throw new Error('content-type inválido: ' + tipo);
      fs.writeFileSync(path.join(DESTINO, alvo.file), buffer);
      alvo.ids.forEach((id) => {
        mapa[id] = 'assets/produtos/' + alvo.file;
      });
      ok.push(alvo.ids.join(',') + ' <- ' + alvo.slug + ' (' + Math.round(buffer.length / 1024) + 'KB)');
    } catch (e) {
      falhas.push(alvo.ids.join(',') + ' (' + alvo.slug + '): ' + e.message);
    }
    await sleep(700);
  }

  const cabecalho =
    '/* Gerado por scripts/raspar-nexxt.cjs em ' + new Date().toISOString() + '.\n' +
    '   Fontes: acervo local + nexxtbebidas.com.br (fotos de vitrine).\n' +
    '   Mapa id do produto -> arquivo local em assets/produtos/.\n' +
    '   O que não estiver aqui cai na ilustração vetorial da garrafa (bottles.js). */\n';
  const ordenado = Object.fromEntries(Object.entries(mapa).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(SAIDA, cabecalho + 'window.PRODUCT_IMAGES = ' + JSON.stringify(ordenado, null, 2) + ';\n', 'utf8');

  console.log('\nBaixadas da nexxt (' + ok.length + '):');
  ok.forEach((l) => console.log('  +', l));
  if (falhas.length) {
    console.log('\nFalhas/ausentes (' + falhas.length + '):');
    falhas.forEach((l) => console.log('  !', l));
  }
  console.log('\nimages.js: ' + Object.keys(ordenado).length + ' ids com foto.');
}

main().catch((e) => {
  console.error('Erro:', e.message);
  process.exit(1);
});
