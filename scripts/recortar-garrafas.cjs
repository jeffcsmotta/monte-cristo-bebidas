const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PRODUTOS = [
  'whisky-jack-daniels-old-no-7-1l.webp',
  'energetico-red-bull-tradicional-250ml.webp',
  'gin-tanqueray-london-dry-750ml.webp',
  'whisky-chivas-regal-12-anos-1l.webp',
  'vodka-absolut-1l.webp',
  'aperitivo-aperol-spritz-750ml.webp',
  'whisky-johnnie-walker-black-label-1l.webp',
  'whisky-jack-daniels-honey-nexxt-1l.webp'
];

async function recortarComAutoTrim() {
  console.log('✂️ Refinando recorte de fundo e eliminando reflexos de rodapé...');

  const dirOrigem = path.resolve(__dirname, '../assets/produtos');
  const dirDestino = path.resolve(__dirname, '../assets/produtos/recortados');
  if (!fs.existsSync(dirDestino)) {
    fs.mkdirSync(dirDestino, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const html = `
    <!DOCTYPE html>
    <html>
    <body>
      <canvas id="c"></canvas>
      <canvas id="trim"></canvas>
      <script>
        window.processCutoutAndTrim = function(src, filename) {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.getElementById('c');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);

              const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const data = imgData.data;
              const w = canvas.width;
              const h = canvas.height;

              const visited = new Uint8Array(w * h);
              const queue = [];

              function isNearWhite(idx) {
                const r = data[idx];
                const g = data[idx + 1];
                const b = data[idx + 2];
                return (r >= 235 && g >= 235 && b >= 235);
              }

              for (let x = 0; x < w; x++) {
                queue.push(x, 0);
                queue.push(x, h - 1);
              }
              for (let y = 0; y < h; y++) {
                queue.push(0, y);
                queue.push(w - 1, y);
              }

              let qHead = 0;
              while (qHead < queue.length) {
                const x = queue[qHead++];
                const y = queue[qHead++];
                if (x < 0 || x >= w || y < 0 || y >= h) continue;
                const pIdx = y * w + x;
                if (visited[pIdx]) continue;
                visited[pIdx] = 1;

                const dIdx = pIdx * 4;
                if (isNearWhite(dIdx)) {
                  data[dIdx + 3] = 0;

                  if (x > 0 && !visited[pIdx - 1]) queue.push(x - 1, y);
                  if (x < w - 1 && !visited[pIdx + 1]) queue.push(x + 1, y);
                  if (y > 0 && !visited[pIdx - w]) queue.push(x, y - 1);
                  if (y < h - 1 && !visited[pIdx + w]) queue.push(x, y + 1);
                }
              }

              // Calcular Bounding Box
              let minX = w, maxX = 0, minY = h, maxY = 0;
              for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                  const pIdx = y * w + x;
                  const alpha = data[pIdx * 4 + 3];
                  if (alpha > 10) {
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                  }
                }
              }

              // Ajuste cirúrgico para garrafas que possuem reflexo de mesa no arquivo original
              if (filename.includes('chivas')) {
                // Remove o reflexo inferior abaixo da base de vidro
                const totalH = maxY - minY;
                maxY = Math.round(minY + totalH * 0.905);
              } else if (filename.includes('absolut')) {
                const totalH = maxY - minY;
                maxY = Math.round(minY + totalH * 0.95);
              }

              if (minX <= maxX && minY <= maxY) {
                const trimW = maxX - minX + 1;
                const trimH = maxY - minY + 1;
                const trimCanvas = document.getElementById('trim');
                trimCanvas.width = trimW;
                trimCanvas.height = trimH;
                const trimCtx = trimCanvas.getContext('2d');

                ctx.putImageData(imgData, 0, 0);
                trimCtx.drawImage(canvas, minX, minY, trimW, trimH, 0, 0, trimW, trimH);
                resolve(trimCanvas.toDataURL('image/png'));
              } else {
                ctx.putImageData(imgData, 0, 0);
                resolve(canvas.toDataURL('image/png'));
              }
            };
            img.src = src;
          });
        };
      </script>
    </body>
    </html>
  `;

  await page.setContent(html);

  for (const arquivo of PRODUTOS) {
    const caminhoOrigem = path.join(dirOrigem, arquivo);
    if (!fs.existsSync(caminhoOrigem)) continue;

    const buffer = fs.readFileSync(caminhoOrigem);
    const dataUri = `data:image/webp;base64,${buffer.toString('base64')}`;

    console.log(`⏳ Refinando: ${arquivo}...`);
    const pngDataUrl = await page.evaluate(async ({ uri, file }) => {
      return await window.processCutoutAndTrim(uri, file);
    }, { uri: dataUri, file: arquivo });

    const base64Data = pngDataUrl.replace(/^data:image\/png;base64,/, '');
    const nomeBase = arquivo.replace(/\.webp$/, '.png');
    const caminhoDestino = path.join(dirDestino, nomeBase);

    fs.writeFileSync(caminhoDestino, Buffer.from(base64Data, 'base64'));
    console.log(`✅ Salvo: ${nomeBase}`);
  }

  await browser.close();
  console.log('🎉 Recorte refinado com sucesso!');
}

recortarComAutoTrim().catch(err => {
  console.error('Erro no processamento:', err);
  process.exit(1);
});
