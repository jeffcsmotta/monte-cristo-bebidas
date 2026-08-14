# Catálogo estruturado — Monte Cristo Bebidas

Banco de dados dos 80 rótulos da tabela, no formato que e-commerce de destilado
e clube de compras usa: identificação, taxonomia, ficha técnica, origem, preço
com derivados de comparação, conteúdo editorial e banco de imagens.

## Como o dado circula

```
app.js (PRODUCTS_DATA)  ─┐
dados/fichas.json        ├─→  scripts/gerar-catalogo.cjs  ─→  dados/catalogo.json
dados/taxonomia.json     │                                     dados/catalogo.csv
pesquisa-imagens/        │                                     dados/pendencias.md
  imagens.json (opcional)┘                                     pesquisa-imagens/produtos.json
```

O que se edita à mão:

| Arquivo | Guarda | Quem mexe |
| --- | --- | --- |
| `app.js` → `PRODUCTS_DATA` | nome, volume, preço, categoria | fonte comercial, vem da tabela do cliente |
| `dados/fichas.json` | marca, ficha técnica, origem, texto, tags | camada editorial |
| `dados/taxonomia.json` | categorias, subcategorias, faixas, tags | estrutura de navegação |

O que é gerado e **não** se edita à mão: `catalogo.json`, `catalogo.csv`,
`pendencias.md`, `pesquisa-imagens/produtos.json`, `images.js`.

Depois de qualquer alteração de preço ou de ficha:

```bash
node scripts/gerar-catalogo.cjs
```

O script trava a geração se um id ficar sem ficha, se uma subcategoria não
existir na taxonomia ou se dois produtos gerarem o mesmo slug. Catálogo pela
metade é pior que catálogo nenhum, porque o buraco passa despercebido.

## Schema de um produto

```jsonc
{
  "sku": "MC-WH-008",          // derivado do id, estável
  "id": "wh-8",                // chave que casa com o site e com o banco de imagens
  "slug": "whisky-jack-daniels-old-no-7-1l",
  "ordem": 8,

  "nome": "Whisky Jack Daniel's Old Nº 7",   // como aparece na tabela do cliente
  "nome_curto": "Jack Daniel's Old Nº 7",    // marca + variante, para card e breadcrumb
  "marca": "Jack Daniel's",
  "expressao": "Old Nº 7",

  "categoria":    { "slug": "whisky", "nome": "Whisky" },              // filtro do site
  "subcategoria": { "slug": "whiskey-americano", "nome": "..." },      // filtro facetado
  "tipo": "Tennessee Whiskey",
  "breadcrumb": ["Catálogo", "Whisky", "Whiskey Americano", "..."],

  "origem":   { "pais": "Estados Unidos", "regiao": "Tennessee", "importado": true },
  "produtor": { "proprietaria": "Brown-Forman", "site_oficial": "https://..." },

  "embalagem": {
    "tipo": "garrafa-vidro",   // garrafa-vidro | garrafa-pet | lata
    "unidade_venda": "garrafa",
    "volume_ml": 1000,
    "volume_label": "1L"
  },

  "ficha_tecnica": {
    "teor_alcoolico": 40,      // null quando o dado não é confiável — ver "pendencias"
    "alcoolico": true,
    "servir": "Puro, com gelo ou com cola."
  },

  "preco": {
    "unitario": 155,
    "por_litro": 155,          // derivado: é como atacado e clube comparam embalagens
    "faixa": { "slug": "100-180", "nome": "R$ 100 a R$ 180" },
    "atualizado_em": "2026-08-13"
  },

  "operacional": {             // dados da distribuidora — nascem vazios de propósito
    "unidades_por_caixa": null,
    "preco_caixa": null,
    "pedido_minimo": null,
    "ean": null,
    "ncm": null,
    "estoque": null,
    "disponivel": true
  },

  "conteudo": {
    "descricao_curta": "...",           // vitrine
    "observacao_interna": "..."         // nota de trabalho, não publicar
  },

  "tags": ["importado", "puro", "para-drink"],
  "flags": {
    "variante_critica": true,  // tem irmão parecido na mesma tabela
    "agrupado": false,         // uma linha representa vários SKUs
    "destaque": false
  },

  "imagem": {
    "status": "pendente",      // ok | pendente
    "arquivo_local": "assets/produtos/whisky-jack-daniels-old-no-7-1l.png",
    "url_origem": null,
    "pagina_origem": null,
    "fonte": null,
    "fundo": null,             // transparente | branco | outro
    "confianca": null,
    "alt": "...",
    "fallback": "ilustração vetorial da garrafa (bottles.js)"
  },

  "busca_imagem": {            // vira pesquisa-imagens/produtos.json
    "termo": "Jack Daniel's Old Nº 7 1L garrafa fundo branco",
    "fontes_prioritarias": ["https://www.jackdaniels.com", "..."],
    "variante_critica": true,
    "cuidado": "Rótulo preto e branco. É o produto-âncora da família."
  },

  "seo": { "title": "...", "description": "...", "canonical": "/produto/..." },

  "pendencias": [],            // campos que precisam de confirmação do cliente
  "atualizado_em": "2026-08-13"
}
```

## O que é obrigatório e o que é enfeite

Vale separar, porque a lista de campos assusta mais do que deveria.

**Obrigatório de verdade num site que oferta bebida alcoólica no Brasil**, e nada
disso é campo de produto: aviso de que a venda é proibida para menores de 18 anos
(Lei 13.106/2015, que alterou o ECA) e o alerta de consumo responsável. O Código
de Defesa do Consumidor, no artigo 31, exige que a oferta informe características,
quantidade e preço — o que o site já cumpre com nome, volume e preço na vitrine.

**Obrigatório no rótulo da garrafa**, não no anúncio de quem revende: teor
alcoólico, ingredientes, lote, dados do fabricante. Isso é responsabilidade do
fabricante perante o MAPA. A Monte Cristo revende garrafa lacrada; o rótulo já
vai na mão do cliente.

**Só passa a importar se o site virar loja com carrinho e nota fiscal:** NCM,
EAN, estoque, unidades por caixa. Enquanto o pedido sair por WhatsApp, esses
campos podem ficar vazios sem prejuízo nenhum.

**O resto é vantagem competitiva, não obrigação.** Teor alcoólico, país de
origem, tipo e sugestão de serviço existem aqui porque ajudam a vender e a
posicionar o site acima do concorrente que só lista nome e preço — e porque
alimentam filtro e busca. Onde o dado não apareceu em fonte confiável, o campo
fica vazio e o site simplesmente não exibe aquela linha.

Isto é leitura de quem monta o catálogo, não parecer jurídico. Se a Monte Cristo
for vender com emissão de nota pelo site, o contador precisa entrar na conversa.

## Regra de preenchimento

Três tipos de campo, três tratamentos diferentes:

**Dado público do produto** (teor alcoólico, país, tipo, proprietária da marca):
preenchido quando é estável e verificável. Onde há dúvida real — marca nacional
de pouca divulgação, teor que muda entre a versão brasileira e a importada —
fica `null` e o nome do campo entra em `pendencias`. Trinta e dois dos oitenta
itens têm teor alcoólico preenchido; o resto está listado em `pendencias.md`.
Preferimos o buraco declarado ao número plausível e errado.

**Dado operacional da Monte Cristo** (unidades por caixa, EAN, NCM, estoque,
preço de caixa): sempre `null`. Não dá para deduzir de fora da distribuidora e
inventar aqui é o tipo de erro que só aparece no pedido do cliente.

**Dado comercial** (nome, volume, preço, categoria): não vive neste diretório.
Vem de `app.js`, que segue sendo a tabela do cliente.

## Banco de imagens

Um arquivo por rótulo em `assets/produtos/`, nomeado pelo slug do produto.

1. A pesquisa consome `pesquisa-imagens/produtos.json` — gerado com marca,
   variante, embalagem esperada, site oficial e o alerta de variante crítica.
   O passo a passo está em `pesquisa-imagens/BRIEFING-ANTIGRAVITY.md`.
2. A pesquisa devolve `pesquisa-imagens/imagens.json`.
3. `node scripts/baixar-imagens.cjs` baixa cada URL, confere que o conteúdo é
   mesmo PNG/JPEG/WebP, que o maior lado tem pelo menos 600px e que o arquivo
   não é um placeholder de 8 bytes. O que passa vira arquivo no repositório e
   entra em `images.js`. O que não passa é reportado e o produto segue com a
   garrafa vetorial.

4. **Conferência visual.** Abra `conferencia.html` com dois cliques — não precisa
   de servidor. A página mostra os 80 rótulos em grade, cada foto ao lado do nome,
   do volume, da embalagem esperada e da armadilha conhecida daquele item ("rótulo
   verde, não confundir com o Fire"). Aprovar é `A`, reprovar é `R`, `Z` amplia,
   as setas navegam. Reprovado pede o motivo. As decisões ficam salvas no
   navegador enquanto você trabalha; no fim, "Baixar conferência" gera
   `conferencia.json`.
5. `node scripts/aplicar-conferencia.cjs` tira do ar o que você reprovou, move o
   arquivo para `assets/produtos/reprovadas/` em vez de apagar, e grava
   `pesquisa-imagens/refazer.json` com os itens para nova busca, já com o motivo
   que você escreveu. O ciclo volta ao passo 2 com uma lista curta.

Nenhuma imagem entra no site sem passar pelo passo 4. É por isso que o `images.js`
é gerado por script e nunca editado à mão: o que está no ar é exatamente o que foi
aprovado.

Há um segundo script, `scripts/aplicar-imagens.cjs`, que aponta o site direto
para a URL de terceiro em vez de baixar. Serve para montar o mockup rápido de
apresentação; não serve para o site definitivo, porque quebra no dia em que o
fornecedor reorganiza o próprio site.

Sobre direito de uso: foto de produto tem dono, normalmente o fabricante ou o
varejista que produziu a imagem. Para o site no ar em caráter definitivo, o
caminho seguro é usar o material que o fornecedor libera para revenda ou
fotografar o estoque da Monte Cristo. Isso precisa ser combinado com o Ivan
antes de publicar.

## Pendências abertas

`pendencias.md` é gerado junto com o catálogo e lista, item a item, o que falta
confirmar. `catalogo.csv` abre no Excel com as colunas `unidades_por_caixa` e
`ean` vazias, prontas para o cliente preencher e devolver.
