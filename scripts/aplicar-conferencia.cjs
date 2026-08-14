/* ==========================================================================
   Aplica o resultado da conferência visual.

   Entrada : conferencia.json   (baixado da página conferencia.html)
   Efeitos :
     - imagem reprovada sai do images.js na hora
     - o arquivo vai para assets/produtos/reprovadas/, não é apagado
     - pesquisa-imagens/refazer.json recebe os itens para nova busca,
       já com o motivo que você escreveu na conferência

   Uso: node scripts/aplicar-conferencia.cjs [caminho/para/conferencia.json]

   Sem caminho, procura conferencia.json na raiz do projeto e na pasta de
   Downloads do usuário, que é onde o navegador larga o arquivo.
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const os = require('os');

const RAIZ = path.resolve(__dirname, '..');
const IMAGES = path.join(RAIZ, 'images.js');
const CATALOGO = path.join(RAIZ, 'dados', 'catalogo.json');
const PRODUTOS = path.join(RAIZ, 'assets', 'produtos');
const REPROVADAS = path.join(PRODUTOS, 'reprovadas');
const REFAZER = path.join(RAIZ, 'pesquisa-imagens', 'refazer.json');

function achar_entrada() {
    if (process.argv[2]) return path.resolve(process.argv[2]);
    const candidatos = [
        path.join(RAIZ, 'conferencia.json'),
        path.join(os.homedir(), 'Downloads', 'conferencia.json')
    ];
    return candidatos.find(fs.existsSync) || candidatos[0];
}

function main() {
    const entrada = achar_entrada();

    if (!fs.existsSync(entrada)) {
        console.error(`Não achei ${path.relative(RAIZ, entrada)}.`);
        console.error('Abra conferencia.html, confira as imagens e clique em "Baixar conferência".');
        process.exit(1);
    }
    if (!fs.existsSync(CATALOGO)) {
        console.error('dados/catalogo.json não existe. Rode antes: node scripts/gerar-catalogo.cjs');
        process.exit(1);
    }

    let conferencia;
    try {
        conferencia = JSON.parse(fs.readFileSync(entrada, 'utf8'));
    } catch (e) {
        console.error('conferencia.json não é um JSON válido:', e.message);
        process.exit(1);
    }
    if (!conferencia || !Array.isArray(conferencia.itens)) {
        console.error('conferencia.json precisa ter uma lista em "itens".');
        process.exit(1);
    }

    const catalogo = JSON.parse(fs.readFileSync(CATALOGO, 'utf8')).produtos;
    const porId = new Map(catalogo.map(p => [p.id, p]));

    /* mapa atual de imagens, lido sem executar o arquivo inteiro */
    let mapa = {};
    if (fs.existsSync(IMAGES)) {
        const texto = fs.readFileSync(IMAGES, 'utf8');
        const abre = texto.indexOf('{', texto.indexOf('window.PRODUCT_IMAGES'));
        const fecha = texto.lastIndexOf('}');
        if (abre !== -1 && fecha > abre) {
            try {
                mapa = JSON.parse(texto.slice(abre, fecha + 1));
            } catch (e) {
                console.error('Não consegui ler o mapa em images.js:', e.message);
                process.exit(1);
            }
        }
    }

    const aprovados = conferencia.itens.filter(i => i.decisao === 'aprovado');
    const reprovados = conferencia.itens.filter(i => i.decisao === 'reprovado');
    const desconhecidos = [];
    const movidos = [];

    reprovados.forEach(item => {
        const produto = porId.get(item.id);
        if (!produto) { desconhecidos.push(item.id); return; }

        delete mapa[item.id];

        const arquivo = item.arquivo && item.arquivo.startsWith('assets/produtos/')
            ? path.join(RAIZ, item.arquivo)
            : null;

        if (arquivo && fs.existsSync(arquivo)) {
            fs.mkdirSync(REPROVADAS, { recursive: true });
            const destino = path.join(REPROVADAS, path.basename(arquivo));
            fs.renameSync(arquivo, destino);
            movidos.push(path.basename(arquivo));
        }
    });

    const cabecalho = `/* Atualizado por scripts/aplicar-conferencia.cjs em ${new Date().toISOString()}.
   ${aprovados.length} imagens aprovadas na conferência visual, ${reprovados.length} reprovadas e removidas.
   Não edite à mão. */\n`;
    fs.writeFileSync(IMAGES, cabecalho + 'window.PRODUCT_IMAGES = ' + JSON.stringify(mapa, null, 2) + ';\n', 'utf8');

    /* lista de nova busca, no mesmo formato que a pesquisa já conhece */
    if (reprovados.length) {
        const refazer = reprovados
            .filter(i => porId.has(i.id))
            .map(i => {
                const p = porId.get(i.id);
                return {
                    id: p.id,
                    sku: p.sku,
                    nome: p.nome,
                    marca: p.marca,
                    variante: p.expressao,
                    volume: p.embalagem.volume_label,
                    embalagem: p.embalagem.unidade_venda,
                    busca_sugerida: p.busca_imagem.termo,
                    site_oficial: p.produtor.site_oficial,
                    fontes_prioritarias: p.busca_imagem.fontes_prioritarias,
                    variante_critica: p.flags.variante_critica,
                    cuidado: p.busca_imagem.cuidado,
                    arquivo_destino: p.imagem.arquivo_local,
                    reprovada_porque: i.nota || '(sem motivo anotado)',
                    url_reprovada: i.arquivo || null
                };
            });
        fs.writeFileSync(REFAZER, JSON.stringify(refazer, null, 2), 'utf8');
    } else if (fs.existsSync(REFAZER)) {
        fs.unlinkSync(REFAZER);
    }

    /* --- relatório --- */
    const noAr = Object.keys(mapa).length;
    console.log(`\nConferência aplicada: ${aprovados.length} aprovadas, ${reprovados.length} reprovadas.`);
    console.log(`images.js agora tem ${noAr} de ${catalogo.length} produtos com foto.`);

    if (movidos.length) {
        console.log(`\nArquivos movidos para assets/produtos/reprovadas/ (${movidos.length}):`);
        movidos.forEach(m => console.log('  -', m));
    }
    if (reprovados.length) {
        console.log(`\npesquisa-imagens/refazer.json gravado com ${reprovados.length} itens para nova busca:`);
        reprovados.forEach(i => console.log(`  - ${i.id} ${i.nome} — ${i.nota || '(sem motivo anotado)'}`));
    }
    if (desconhecidos.length) {
        console.log(`\nIgnorados, id fora do catálogo: ${desconhecidos.join(', ')}`);
    }

    const semDecisao = catalogo.filter(p => mapa[p.id] && !conferencia.itens.some(i => i.id === p.id));
    if (semDecisao.length) {
        console.log(`\nAinda no ar sem passar pela conferência (${semDecisao.length}): ${semDecisao.map(p => p.id).join(', ')}`);
    }
    console.log('');
}

main();
