# Pendências do catálogo — Monte Cristo Bebidas

Gerado em 2026-09-23 por `scripts/gerar-catalogo.cjs`. Não editar à mão.

## Resolver antes de publicar (2 itens)

Sem isso, a imagem ou a oferta saem erradas na frente do cliente.

| SKU | Produto | Confirmar | Por quê |
| --- | --- | --- | --- |
| MC-LC-001 | Aperol | variante | A tabela diz 'Aperol Spritz'. Existe o Aperol garrafa (aperitivo) e o Aperol Spritz pronto para beber, que são produtos diferentes. O volume 750ml indica o aperitivo tradicional — confirmar com o Ivan antes de fechar a imagem. |
| MC-RM-001 | Rum Bacardi Big Apple 700ML | volume | Quatro Bacardi na tabela. O Big Apple é o único de 700ml — usar o volume para conferir a imagem. ATENCAO: o varejo lista o Big Apple em 980ml; a tabela do Ivan diz 700ml. Confirmar o volume antes de buscar imagem. |

## Fichas editoriais pendentes (66 itens)

Estes produtos utilizam nome, volume, preço e categoria do catálogo consolidado
(`dados/catalogo_consolidado.json` / `app.js`). Estão ativos e publicáveis no site,
mas aguardam ficha editorial completa em `dados/fichas.json` (notas de degustação,
marca/expressão refinadas, teor alcoólico exato e fabricante). Podem ser completados
gradualmente sem bloquear o catálogo.

| SKU | ID | Produto | Categoria | Volume | Preço | Pendências Editoriais |
| --- | --- | --- | --- | --- | --- | --- |
| MC-CC-006 | cc-10 | Cerveja Norteña 960ML | Cachaça, Conhaque, Cerveja e Espumante | 960ML | R$ 28,00 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-CC-007 | cc-12 | Cerveja Patricia 960ML | Cachaça, Conhaque, Cerveja e Espumante | 960ML | R$ 23,50 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-CC-008 | cc-14 | Cerveja Pilsen 960ML | Cachaça, Conhaque, Cerveja e Espumante | 960ML | R$ 23,50 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-CC-009 | cc-15 | Cerveja Zillertal 970ML | Cachaça, Conhaque, Cerveja e Espumante | 970ML | R$ 30,00 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-CC-011 | cc-7-alt | Conhaque Dreher | Cachaça, Conhaque, Cerveja e Espumante | 1L | R$ 30,00 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-CC-012 | cc-8-alt | Conhaque Presidente 900ML | Cachaça, Conhaque, Cerveja e Espumante | 900ML | R$ 25,00 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-EN-001 | en-20 | Energetico Baly 2L | Energéticos | 2L | R$ 11,90 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-EN-002 | en-21 | Energetico Baly Frutas Tropicais 2L | Energéticos | 2L | R$ 11,90 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-EN-003 | en-22 | Energetico Baly Maça Verde 2L | Energéticos | 2L | R$ 11,90 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-EN-004 | en-23 | Energetico Baly Melancia 2L | Energéticos | 2L | R$ 11,90 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-EN-005 | en-24 | Energetico Baly Morango e Pêssego 2L | Energéticos | 2L | R$ 11,90 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-EN-006 | en-25 | Energetico Red Bull 250ML | Energéticos | 250ML | R$ 9,50 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-EN-007 | en-26 | Energetico Red Bull Tropical Edition 250ML | Energéticos | 250ML | R$ 10,50 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-EN-008 | en-27 | Energetico Red Bull Melancia Edition 250ML | Energéticos | 250ML | R$ 10,50 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-EN-009 | en-28 | Energetico Red Bull Morango e Pêssego Edition 250ML | Energéticos | 250ML | R$ 10,50 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-EN-010 | en-29 | Energetico Red Bull Sugar Free 250ML | Energéticos | 250ML | R$ 10,50 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-EN-011 | en-30 | Energetico Red Bull Zero 250ML | Energéticos | 250ML | R$ 10,50 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-GT-001 | gt-33 | Gin Rocks Strawberry 1L | Gin, Tequila e Rum | 1L | R$ 35,00 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-GT-002 | gt-34 | Gin Seagers 1L | Gin, Tequila e Rum | 1L | R$ 59,00 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-GT-003 | gt-35 | Gin Tanqueray 750ML | Gin, Tequila e Rum | 750ML | R$ 133,90 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-LC-004 | lc-36 | Licor 43 700ML | Licores e Aperitivos | 700ML | R$ 169,90 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-LC-005 | lc-37 | Licor 43 Chocolate 700ML | Licores e Aperitivos | 700ML | R$ 180,00 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-LC-006 | lc-38 | Licor Amarula 750ML | Licores e Aperitivos | 750ML | R$ 99,90 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-LC-008 | lc-40 | Licor Don Luiz Creme de Doce de Leite 750ML | Licores e Aperitivos | 750ML | R$ 89,90 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-LC-009 | lc-41 | Licor Cointreau 700ML | Licores e Aperitivos | 700ML | R$ 169,90 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-LC-010 | lc-42 | Licor Jägermeister 700ML | Licores e Aperitivos | 700ML | R$ 159,90 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-LC-011 | lc-43 | Licor Stock Curaçau Fino | Licores e Aperitivos | 1L | R$ 59,90 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-LC-012 | lc-44 | Licor Stock Pêssego | Licores e Aperitivos | 1L | R$ 59,90 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-LC-013 | lc-45 | Licor Stock Curaçau Blue | Licores e Aperitivos | 1L | R$ 59,90 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-LC-014 | lc-46 | Licor Stock Morango | Licores e Aperitivos | 1L | R$ 59,90 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-LC-015 | lc-47 | Licor Stock Chocolate | Licores e Aperitivos | 1L | R$ 59,90 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-LC-016 | lc-48 | Licor Stock Marula | Licores e Aperitivos | 1L | R$ 79,90 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-LC-017 | lc-49 | Licor Stock Creme de Cacau | Licores e Aperitivos | 1L | R$ 59,90 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-LC-018 | lc-50 | Licor Stock Creme de Cassis | Licores e Aperitivos | 1L | R$ 59,90 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-LC-019 | lc-51 | Licor Stock Menta | Licores e Aperitivos | 1L | R$ 79,90 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-LC-020 | lc-52 | Licor Stock Café | Licores e Aperitivos | 1L | R$ 59,90 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-GT-004 | gt-56 | Rum Bacardi Limón 980ML | Gin, Tequila e Rum | 980ML | R$ 55,00 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-GT-005 | gt-57 | Rum Malibu 750ML | Gin, Tequila e Rum | 750ML | R$ 69,90 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-VK-002 | vk-68 | Vodka Ciroc 750ML | Vodka | 750ML | R$ 275,00 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-VK-009 | vk-75 | Vodka Smirnoff 998ML | Vodka | 998ML | R$ 40,00 | ficha_editorial_completa, abv, origem, fabricante, descricao_editorial |
| MC-WH-002 | wh-76 | Whisky Ballantine's Finnest 1L | Whisky | 1L | R$ 99,00 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-WH-006 | wh-80 | Whisky Jack Daniel's Blackberri 1L | Whisky | 1L | R$ 165,00 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-WH-007 | wh-81 | Whisky Jack Daniel's Fire 1L | Whisky | 1L | R$ 155,00 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-WH-008 | wh-82 | Whisky Jack Daniel's Old Nº 7 1L | Whisky | 1L | R$ 155,00 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-WH-009 | wh-83 | Whisky Jack Daniel's Honey 1L | Whisky | 1L | R$ 155,00 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-WH-010 | wh-84 | Whisky Jim Bean | Whisky | 1L | R$ 119,90 | ficha_editorial_completa, abv, fabricante, descricao_editorial |
| MC-XR-001 | xr-89 | Xarope Fórmula Morango | Xaropes | 1L | R$ 45,00 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-XR-002 | xr-90 | Xarope Fórmula Chocolate | Xaropes | 1L | R$ 45,00 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-XR-003 | xr-91 | Xarope Fórmula Cranberry | Xaropes | 1L | R$ 45,00 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-XR-004 | xr-92 | Xarope Fórmula Grenadine | Xaropes | 1L | R$ 45,00 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-XR-005 | xr-93 | Xarope Fórmula Gengibre | Xaropes | 1L | R$ 45,00 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-XR-006 | xr-94 | Xarope Fórmula Maça Verde | Xaropes | 1L | R$ 45,00 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-XR-007 | xr-95 | Xarope Fórmula Pêssego | Xaropes | 1L | R$ 45,00 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-XR-008 | xr-96 | Xarope Fórmula Tangerina | Xaropes | 1L | R$ 45,00 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-XR-009 | xr-97 | Xarope Fórmula Limão Siciliano | Xaropes | 1L | R$ 45,00 | ficha_editorial_completa, fabricante, descricao_editorial |
| MC-XR-010 | xr-98 | Xarope Monin Maça Verde | Xaropes | 1L | R$ 65,00 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-XR-011 | xr-99 | Xarope Monin Morango | Xaropes | 1L | R$ 65,00 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-XR-012 | xr-100 | Xarope Monin Limão Siciliano | Xaropes | 1L | R$ 65,00 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-XR-013 | xr-101 | Xarope Monin Gengibre | Xaropes | 1L | R$ 65,00 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-XR-014 | xr-102 | Xarope Monin Cranberry | Xaropes | 1L | R$ 65,00 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-XR-015 | xr-103 | Xarope Monin Flor de Sabugueiro | Xaropes | 1L | R$ 65,00 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-XR-016 | xr-104 | Xarope Monin Cereja | Xaropes | 1L | R$ 65,00 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-XR-017 | xr-105 | Xarope Monin Romã | Xaropes | 1L | R$ 65,00 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-XR-018 | xr-106 | Xarope Monin Pêssego | Xaropes | 1L | R$ 65,00 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-XR-019 | xr-107 | Xarope Monin Tangerina | Xaropes | 1L | R$ 65,00 | ficha_editorial_completa, origem, fabricante, descricao_editorial |
| MC-XR-020 | xr-108 | Xarope Monin Framboesa | Xaropes | 1L | R$ 65,00 | ficha_editorial_completa, origem, fabricante, descricao_editorial |

## Enriquece a ficha existente, não bloqueia nada (21 itens)

Teor alcoólico, fabricante e região deixam a ficha mais completa, mas nenhum
deles é exigido de quem revende — o teor é obrigatório no rótulo da garrafa, e
rótulo é responsabilidade do fabricante. Onde o dado não apareceu em fonte
confiável, o campo simplesmente não é exibido no site. Vale preencher aos poucos,
olhando a garrafa no estoque, sem segurar o lançamento por causa disso.

| SKU | Produto | Falta |
| --- | --- | --- |
| MC-WH-001 | Aperitivo Malt.whisky Canela Firebird 950ML | abv, fabricante |
| MC-LC-002 | Brasilberg Original 920ML | abv |
| MC-CC-002 | Cachaça Velho Barreiro 910ML | fabricante |
| MC-CC-004 | Cachaça Ypioca Brasilizar Prata 965ML | fabricante |
| MC-CC-005 | Cachaça Casa Bucco | abv, regiao, envelhecimento |
| MC-CV-001 | Cerveja Norteña Latão | abv, fabricante |
| MC-CV-002 | Cerveja Patricia Latão | abv, fabricante |
| MC-CV-003 | Cerveja Zillertal Latão | abv, fabricante |
| MC-CC-010 | Conhaque Domecq 1L | fabricante |
| MC-GN-002 | Gin Rocks 1L | abv, fabricante |
| MC-LC-007 | Licor Amaretto Dell Orso | origem, fabricante |
| MC-RM-001 | Rum Bacardi Big Apple 700ML | origem |
| MC-RM-002 | Rum Bacardi Carta Blanca Superior 980ML | abv, origem |
| MC-RM-003 | Rum Bacardi Gold 980ML | abv, origem |
| MC-RM-004 | Rum Montilla Carta Cristal 1L | abv |
| MC-RM-006 | Steinhaeger Doble W 900ML | abv, fabricante, origem |
| MC-GN-003 | Tequila Jose Cuervo Reposado 750ML | abv |
| MC-GN-004 | Tequila Jose Cuervo Silver 750ML | abv |
| MC-VK-004 | Vodka Natasha 900ML | abv, fabricante |
| MC-VK-008 | Vodka Rajska Red Fruits | abv |
| MC-WH-003 | Whisky Black Stone | abv, fabricante |

## Campos operacionais (108 itens)

Campos sincronizados do catálogo consolidado (`unidades_por_caixa`, `preco_caixa`)
e campos reservados para integração futura (`ean`, `ncm`, `estoque`).

- Produtos com caixa definida: 108 de 108
- Produtos com EAN cadastrado: 24 de 108

## Variantes críticas para a busca de imagem (23 itens)

Rótulos com irmão parecido na mesma tabela. Imagem trocada aqui passa despercebida
na revisão e chega no cliente final.

- **Aperol** (MC-LC-001) — A tabela diz 'Aperol Spritz'. Existe o Aperol garrafa (aperitivo) e o Aperol Spritz pronto para beber, que são produtos diferentes. O volume 750ml indica o aperitivo tradicional — confirmar com o Ivan antes de fechar a imagem.
- **Brasilberg Original 920ML** (MC-LC-002) — Rótulo escuro. Não usar a foto do 43 tradicional.
- **Cerveja Norteña Latão** (MC-CV-001) — A imagem tem que ser da LATA, não da garrafa.
- **Cerveja Patricia Latão** (MC-CV-002) — A imagem tem que ser da LATA.
- **Cerveja Zillertal Latão** (MC-CV-003) — A imagem tem que ser da LATA.
- **Gin Rocks 1L** (MC-GN-002) — Não confundir com o Traditional.
- **Rum Bacardi Big Apple 700ML** (MC-RM-001) — Quatro Bacardi na tabela. O Big Apple é o único de 700ml — usar o volume para conferir a imagem. ATENCAO: o varejo lista o Big Apple em 980ml; a tabela do Ivan diz 700ml. Confirmar o volume antes de buscar imagem.
- **Rum Bacardi Carta Blanca Superior 980ML** (MC-RM-002) — Rótulo branco. Não confundir com Gold (dourado) e Limón. Fontes de varejo divergem no teor (38% e 40%) — checar rotulo.
- **Rum Bacardi Gold 980ML** (MC-RM-003) — Rótulo dourado.
- **Rum Montilla Carta Cristal 1L** (MC-RM-004) — Rótulo claro. Está na tabela junto com o Carta Ouro.
- **Rum Montilla Carta Ouro 1L** (MC-RM-005) — Rótulo dourado.
- **Tequila Jose Cuervo Reposado 750ML** (MC-GN-003) — Rótulo dourado. Está na tabela junto com a Silver — imagem trocada é erro provável.
- **Tequila Jose Cuervo Silver 750ML** (MC-GN-004) — Rótulo prateado, líquido transparente.
- **Vermouth Martini Bianco 750ML** (MC-VB-001) — Quatro Martini na tabela, todos a R$ 50 e 750ml. Conferir cada rótulo pelo nome: Bianco (rótulo claro), Rosso (rótulo escuro), Rosato e Extra Dry.
- **Vermouth Martini Extra Dry 750ML** (MC-VB-002) — Não confundir com Bianco — ambos são claros.
- **Vermouth Martini Rosato 750ML** (MC-VB-003) — É o menos comum da linha — o mais provável de vir com imagem errada.
- **Vermouth Martini Rosso 750ML** (MC-VB-004) — Rótulo escuro.
- **Vodka Rajska** (MC-VK-006) — Três Rajska na tabela: Traditional, Apple e Red Fruits. Conferir o rótulo pelo nome, não pela cor da garrafa.
- **Vodka Rajska Apple** (MC-VK-007) — Não confundir com Traditional e Red Fruits.
- **Vodka Rajska Red Fruits** (MC-VK-008) — Não confundir com Traditional e Apple.
- **Whisky Jack Daniel's Apple 1L** (MC-WH-005) — Rótulo dourado.
- **Whisky Johnnie Walker Black Label 1L** (MC-WH-011) — Rótulo preto. Não trocar com o Red Label, que também está na tabela.
- **Whisky Johnnie Walker Red Label 1L** (MC-WH-012) — Rótulo vermelho.

## Itens agrupados (0)

Uma linha da tabela representa vários produtos. Não viram página de produto
sem antes definir quais variantes entram.

