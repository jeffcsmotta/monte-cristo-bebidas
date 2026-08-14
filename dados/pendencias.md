# Pendências do catálogo — Monte Cristo Bebidas

Gerado em 2026-08-14 por `scripts/gerar-catalogo.cjs`. Não editar à mão.

## Resolver antes de publicar (7 itens)

Sem isso, a imagem ou a oferta saem erradas na frente do cliente.

| SKU | Produto | Confirmar | Por quê |
| --- | --- | --- | --- |
| MC-RM-001 | Rum Bacardi Big Apple | volume | Quatro Bacardi na tabela. O Big Apple é o único de 700ml — usar o volume para conferir a imagem. ATENCAO: o varejo lista o Big Apple em 980ml; a tabela do Ivan diz 700ml. Confirmar o volume antes de buscar imagem. |
| MC-LC-001 | Aperitivo Aperol Spritz | variante | A tabela diz 'Aperol Spritz'. Existe o Aperol garrafa (aperitivo) e o Aperol Spritz pronto para beber, que são produtos diferentes. O volume 750ml indica o aperitivo tradicional — confirmar com o Ivan antes de fechar a imagem. |
| MC-LC-009 | Licor Stock (Todos os Sabores) | sabores_disponiveis | Item agrupado: representa vários SKUs. Levantar com o Ivan quais sabores a Monte Cristo realmente estoca antes de virar página de produto. |
| MC-CV-005 | Cerveja Pilsen Garrafa | marca_exata | Atenção: 'Pilsen' aqui pode ser a marca uruguaia Pilsen (da mesma casa de Norteña e Patricia) ou uma pilsen genérica. O volume 960ml sugere a uruguaia. CONFIRMAR com o Ivan antes de buscar imagem — é o item de maior risco de erro do catálogo. |
| MC-ES-002 | Espumante Salton Series (Todas Variedades) | variedades_disponiveis | Item agrupado. Levantar quais rótulos da linha a Monte Cristo estoca. |
| MC-XR-001 | Xarope Formula (Todos os Sabores) | sabores_disponiveis, preco | Item agrupado. O preço de R$ 45 está acima do Monin (R$ 11,90) na mesma tabela — vale conferir com o Ivan se não houve inversão. |
| MC-XR-002 | Xarope Monin (Todos os Sabores) | sabores_disponiveis, preco | Item agrupado. Preço de R$ 11,90 está bem abaixo do praticado no varejo para Monin 700ml — conferir com o Ivan. |

## Enriquece a ficha, não bloqueia nada (37 itens)

Teor alcoólico, fabricante e região deixam a ficha mais completa, mas nenhum
deles é exigido de quem revende — o teor é obrigatório no rótulo da garrafa, e
rótulo é responsabilidade do fabricante. Onde o dado não apareceu em fonte
confiável, o campo simplesmente não é exibido no site. Vale preencher aos poucos,
olhando a garrafa no estoque, sem segurar o lançamento por causa disso.

| SKU | Produto | Falta |
| --- | --- | --- |
| MC-WH-001 | Aperitivo Malt Whisky Canela Firebird | abv, fabricante |
| MC-WH-003 | Whisky Black Stone | abv, fabricante |
| MC-VK-004 | Vodka Natasha | abv, fabricante |
| MC-VK-008 | Vodka Rajska Red Fruits | abv |
| MC-GN-002 | Gin Rock's Traditional | abv, fabricante |
| MC-GN-003 | Gin Rock's Strawberry | abv, fabricante |
| MC-GN-004 | Gin Seagers Original | abv |
| MC-GN-005 | Gin Tanqueray London Dry | abv |
| MC-GN-006 | Tequila Jose Cuervo Reposado | abv |
| MC-GN-007 | Tequila Jose Cuervo Silver | abv |
| MC-RM-001 | Rum Bacardi Big Apple | origem |
| MC-RM-002 | Rum Bacardi Carta Blanca Superior | abv, origem |
| MC-RM-003 | Rum Bacardi Gold | abv, origem |
| MC-RM-004 | Rum Bacardi Limon | abv, origem |
| MC-RM-006 | Rum Montilla Carta Cristal | abv |
| MC-RM-008 | Steinhaeger Doble W | abv, fabricante, origem |
| MC-LC-003 | Licor 43 Chocolate Edition | abv |
| MC-LC-005 | Licor Amaretto Dell Orso | origem, fabricante |
| MC-LC-006 | Licor Don Luiz Doce de Leite | origem, fabricante |
| MC-LC-009 | Licor Stock (Todos os Sabores) | abv |
| MC-CC-002 | Cachaça Velho Barreiro | fabricante |
| MC-CC-003 | Cachaça Ypióca Brasilizar Ouro | abv |
| MC-CC-004 | Cachaça Ypióca Brasilizar Prata | abv |
| MC-CC-005 | Cachaça Casa Bucco Artesanal | abv, regiao, envelhecimento |
| MC-CC-006 | Conhaque Domecq | fabricante |
| MC-CC-008 | Conhaque Presidente | fabricante |
| MC-CV-001 | Cerveja Norteña Garrafa | abv, fabricante |
| MC-CV-002 | Cerveja Norteña Latão | abv, fabricante |
| MC-CV-003 | Cerveja Patricia Garrafa | abv, fabricante |
| MC-CV-004 | Cerveja Patricia Latão | abv, fabricante |
| MC-CV-005 | Cerveja Pilsen Garrafa | origem, abv |
| MC-CV-006 | Cerveja Zillertal Garrafa | abv, fabricante |
| MC-CV-007 | Cerveja Zillertal Latão | abv, fabricante |
| MC-ES-001 | Espumante Salton Brut | abv |
| MC-ES-002 | Espumante Salton Series (Todas Variedades) | abv |
| MC-VB-001 | Brasilberg Original Aperitivo | fabricante, perfil |
| MC-VB-002 | Bitter Campari Red | abv |

## Campos operacionais — vazios nos 80 itens

Nenhum pode ser deduzido de fora da distribuidora, e nenhum é necessário para
um site de vitrine com pedido por WhatsApp. Só passam a fazer falta se o site
virar loja com carrinho e nota fiscal:

- `unidades_por_caixa` e `preco_caixa` — se houver venda por caixa no site
- `pedido_minimo` — se houver política de atacado
- `ean` (código de barras) — só se o catálogo for para marketplace
- `ncm` — só para emissão de nota fiscal
- `estoque` — só se o site for mostrar disponibilidade em tempo real

## Variantes críticas para a busca de imagem (44 itens)

Rótulos com irmão parecido na mesma tabela. Imagem trocada aqui passa despercebida
na revisão e chega no cliente final.

- **Whisky Jack Daniel's Apple** (MC-WH-005) — Cinco Jack Daniel's na tabela. Rótulo verde — não confundir com Fire (vermelho), Honey (dourado), Blackberri (roxo) e Old Nº 7 (preto).
- **Whisky Jack Daniel's Blackberri** (MC-WH-006) — Rótulo roxo. Variante mais nova e a mais fácil de errar na busca de imagem.
- **Whisky Jack Daniel's Fire** (MC-WH-007) — Rótulo vermelho.
- **Whisky Jack Daniel's Old Nº 7** (MC-WH-008) — Rótulo preto e branco. É o produto-âncora da família.
- **Whisky Jack Daniel's Honey** (MC-WH-009) — Rótulo dourado.
- **Whisky Johnnie Walker Black Label** (MC-WH-011) — Rótulo preto. Não trocar com o Red Label, que também está na tabela.
- **Whisky Johnnie Walker Red Label** (MC-WH-012) — Rótulo vermelho.
- **Vodka Rajska Traditional** (MC-VK-006) — Três Rajska na tabela: Traditional, Apple e Red Fruits. Conferir o rótulo pelo nome, não pela cor da garrafa.
- **Vodka Rajska Apple** (MC-VK-007) — Não confundir com Traditional e Red Fruits.
- **Vodka Rajska Red Fruits** (MC-VK-008) — Não confundir com Traditional e Apple.
- **Gin Rock's Traditional** (MC-GN-002) — Dois Rock's na tabela: Traditional e Strawberry.
- **Gin Rock's Strawberry** (MC-GN-003) — Não confundir com o Traditional.
- **Tequila Jose Cuervo Reposado** (MC-GN-006) — Rótulo dourado. Está na tabela junto com a Silver — imagem trocada é erro provável.
- **Tequila Jose Cuervo Silver** (MC-GN-007) — Rótulo prateado, líquido transparente.
- **Rum Bacardi Big Apple** (MC-RM-001) — Quatro Bacardi na tabela. O Big Apple é o único de 700ml — usar o volume para conferir a imagem. ATENCAO: o varejo lista o Big Apple em 980ml; a tabela do Ivan diz 700ml. Confirmar o volume antes de buscar imagem.
- **Rum Bacardi Carta Blanca Superior** (MC-RM-002) — Rótulo branco. Não confundir com Gold (dourado) e Limón. Fontes de varejo divergem no teor (38% e 40%) — checar rotulo.
- **Rum Bacardi Gold** (MC-RM-003) — Rótulo dourado.
- **Rum Bacardi Limon** (MC-RM-004) — Rótulo amarelo-esverdeado.
- **Rum Montilla Carta Cristal** (MC-RM-006) — Rótulo claro. Está na tabela junto com o Carta Ouro.
- **Rum Montilla Carta Ouro** (MC-RM-007) — Rótulo dourado.
- **Aperitivo Aperol Spritz** (MC-LC-001) — A tabela diz 'Aperol Spritz'. Existe o Aperol garrafa (aperitivo) e o Aperol Spritz pronto para beber, que são produtos diferentes. O volume 750ml indica o aperitivo tradicional — confirmar com o Ivan antes de fechar a imagem.
- **Licor 43 Cuarenta y Tres** (MC-LC-002) — Está na tabela junto com a Chocolate Edition.
- **Licor 43 Chocolate Edition** (MC-LC-003) — Rótulo escuro. Não usar a foto do 43 tradicional.
- **Cachaça Ypióca Brasilizar Ouro** (MC-CC-003) — Ouro e Prata estão na tabela com o mesmo preço. Diferenciar pela cor do líquido e do rótulo.
- **Cachaça Ypióca Brasilizar Prata** (MC-CC-004) — Líquido transparente. Não confundir com a Ouro.
- **Cerveja Norteña Garrafa** (MC-CV-001) — Existe versão garrafa e latão na tabela. A imagem tem que ser da GARRAFA. Lager uruguaia de Paysandu, desde 1947.
- **Cerveja Norteña Latão** (MC-CV-002) — A imagem tem que ser da LATA, não da garrafa.
- **Cerveja Patricia Garrafa** (MC-CV-003) — Versão garrafa. Existe latão na mesma tabela.
- **Cerveja Patricia Latão** (MC-CV-004) — A imagem tem que ser da LATA.
- **Cerveja Pilsen Garrafa** (MC-CV-005) — Atenção: 'Pilsen' aqui pode ser a marca uruguaia Pilsen (da mesma casa de Norteña e Patricia) ou uma pilsen genérica. O volume 960ml sugere a uruguaia. CONFIRMAR com o Ivan antes de buscar imagem — é o item de maior risco de erro do catálogo.
- **Cerveja Zillertal Garrafa** (MC-CV-006) — Versão garrafa.
- **Cerveja Zillertal Latão** (MC-CV-007) — A imagem tem que ser da LATA.
- **Espumante Salton Brut** (MC-ES-001) — Item regional: a proximidade com Caxias é argumento de venda. A Salton mantém material oficial de imprensa — é a foto mais fácil de licenciar do catálogo.
- **Vermouth Martini Bianco** (MC-VB-003) — Quatro Martini na tabela, todos a R$ 50 e 750ml. Conferir cada rótulo pelo nome: Bianco (rótulo claro), Rosso (rótulo escuro), Rosato e Extra Dry.
- **Vermouth Martini Extra Dry** (MC-VB-004) — Não confundir com Bianco — ambos são claros.
- **Vermouth Martini Rosato** (MC-VB-005) — É o menos comum da linha — o mais provável de vir com imagem errada.
- **Vermouth Martini Rosso** (MC-VB-006) — Rótulo escuro.
- **Energético Baly Tradicional** (MC-EN-001) — Cinco sabores Baly na tabela, todos 2L e R$ 11,90. A imagem tem que ser a PET de 2L, não a lata.
- **Energético Baly Frutas Tropicais** (MC-EN-002) — PET 2L. Conferir o sabor no rótulo.
- **Energético Baly Maçã Verde** (MC-EN-003) — PET 2L. Conferir o sabor no rótulo.
- **Energético Baly Melancia** (MC-EN-004) — PET 2L. Conferir o sabor no rótulo.
- **Energético Baly Morango e Pêssego** (MC-EN-005) — PET 2L. Conferir o sabor no rótulo.
- **Energético Red Bull Energy Drink** (MC-EN-006) — A imagem tem que ser da LATA de 250ml. Duas versões Red Bull na tabela.
- **Energético Red Bull Tropical Edition** (MC-EN-007) — LATA amarela da Tropical Edition — não usar a lata azul tradicional.

## Itens agrupados (4)

Uma linha da tabela representa vários produtos. Não viram página de produto
sem antes definir quais variantes entram.

- **Licor Stock (Todos os Sabores)** (MC-LC-009) — Item agrupado: representa vários SKUs. Levantar com o Ivan quais sabores a Monte Cristo realmente estoca antes de virar página de produto.
- **Espumante Salton Series (Todas Variedades)** (MC-ES-002) — Item agrupado. Levantar quais rótulos da linha a Monte Cristo estoca.
- **Xarope Formula (Todos os Sabores)** (MC-XR-001) — Item agrupado. O preço de R$ 45 está acima do Monin (R$ 11,90) na mesma tabela — vale conferir com o Ivan se não houve inversão.
- **Xarope Monin (Todos os Sabores)** (MC-XR-002) — Item agrupado. Preço de R$ 11,90 está bem abaixo do praticado no varejo para Monin 700ml — conferir com o Ivan.
