/* ==========================================================================
   Mescla o que a raspagem apurou na ficha editorial.

   Entrada : dados/royal-ficha.json   (coletado por raspar-royal.cjs)
   Saída   : dados/fichas.json        (atualizado)

   Uso: node scripts/mesclar-royal.cjs [--simular]

   Conservador de propósito:
     - só preenche campo que está vazio, nunca sobrescreve o que já foi escrito
     - só aceita correspondência de confiança alta ou manual; média fica de fora,
       porque teor de outro rótulo é pior que teor nenhum
     - preço do varejo é ignorado: o preço do catálogo é o da Monte Cristo
     - o que entra fica registrado em fonte_ficha, para dar para auditar depois
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const FICHAS = path.join(RAIZ, 'dados', 'fichas.json');
const ROYAL = path.join(RAIZ, 'dados', 'royal-ficha.json');
const SIMULAR = process.argv.includes('--simular');

function main() {
    if (!fs.existsSync(ROYAL)) {
        console.error('dados/royal-ficha.json não existe. Rode antes: node scripts/raspar-royal.cjs');
        process.exit(1);
    }

    const arquivo = JSON.parse(fs.readFileSync(FICHAS, 'utf8'));
    const royal = JSON.parse(fs.readFileSync(ROYAL, 'utf8')).fichas;

    const aplicados = [];
    const ignorados = [];

    Object.entries(royal).forEach(([id, r]) => {
        const f = arquivo.fichas[id];
        if (!f) return;

        if (r.confianca_correspondencia !== 'alta' && r.confianca_correspondencia !== 'manual') {
            ignorados.push(`${id}: correspondência ${r.confianca_correspondencia}, não confio o bastante para copiar ficha`);
            return;
        }

        const mudou = [];

        if (f.abv === null && r.teor != null) {
            f.abv = r.teor;
            f.confirmar = f.confirmar.filter(c => c !== 'abv');
            mudou.push(`teor ${r.teor}%`);
        }
        if (!f.ean && r.ean) {
            f.ean = r.ean;
            mudou.push(`EAN ${r.ean}`);
        }
        if (!f.regiao && r.regiao && r.regiao.length < 40) {
            f.regiao = r.regiao;
            mudou.push(`região ${r.regiao}`);
        }

        if (mudou.length) {
            f.fonte_ficha = 'Royal Bebidas (varejo), coletado em ' + new Date().toISOString().slice(0, 10);
            aplicados.push(`${id}: ${mudou.join(', ')}`);
        }
    });

    if (!SIMULAR) {
        fs.writeFileSync(FICHAS, JSON.stringify(arquivo, null, 2), 'utf8');
    }

    console.log(`\n${aplicados.length} fichas enriquecidas${SIMULAR ? ' (simulação, nada gravado)' : ''}:`);
    aplicados.forEach(a => console.log('  -', a));

    if (ignorados.length) {
        console.log(`\nDeixados de fora (${ignorados.length}) — a correspondência não é firme o bastante:`);
        ignorados.forEach(i => console.log('  -', i));
    }

    const total = Object.keys(arquivo.fichas).length;
    const comAbv = Object.values(arquivo.fichas).filter(f => f.abv !== null).length;
    const comEan = Object.values(arquivo.fichas).filter(f => f.ean).length;
    console.log(`\nAgora: ${comAbv} de ${total} com teor alcoólico, ${comEan} de ${total} com EAN.`);
    console.log(SIMULAR ? '' : 'Rode node scripts/gerar-catalogo.cjs para atualizar o catálogo.\n');
}

main();
