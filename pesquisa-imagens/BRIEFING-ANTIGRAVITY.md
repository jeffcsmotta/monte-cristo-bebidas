# Briefing — Banco de imagens de garrafas (Monte Cristo Bebidas)

Cole o bloco **PROMPT** abaixo no Antigravity. Ele já contém tudo: objetivo,
regras de aceite, formato de saída e critério de desistência.

Entrada: `produtos.json` (80 itens, nesta mesma pasta). É gerado por
`scripts/gerar-catalogo.cjs` a partir do catálogo estruturado — não editar à mão.
Saída esperada: `imagens.json`, na mesma pasta.
Depois: `node ../scripts/baixar-imagens.cjs` baixa os arquivos para
`assets/produtos/` e grava o `images.js` que o site lê.

---

## PROMPT

Você vai montar um banco de imagens de produto para o catálogo de uma
distribuidora de bebidas em Caxias do Sul/RS. As imagens vão aparecer nos cards
de um site de vendas, uma imagem por rótulo.

**Entrada.** O arquivo `produtos.json` tem 80 objetos. O campo `id` é a chave e
não pode ser alterado, inventado nem reordenado — é por ele que a imagem será
casada com o produto no site. Cada objeto já vem com o que você precisa para
não errar:

- `marca` e `variante` — o que precisa estar legível no rótulo da foto
- `volume` e `embalagem` — se diz `lata`, a imagem tem que ser da lata
- `site_oficial` e `fontes_prioritarias` — onde procurar, na ordem
- `variante_critica` — `true` significa que existe um rótulo irmão parecido na
  mesma lista; é onde a troca de imagem passa despercebida
- `cuidado` — a armadilha específica daquele item, quando ela é conhecida
- `arquivo_destino` — o nome de arquivo que a imagem vai ter no repositório

**Tarefa.** Para cada um dos 80 itens, encontre exatamente uma imagem da garrafa.

### Onde procurar, nesta ordem de preferência

1. Site oficial da marca ou do fabricante, incluindo a área de imprensa e o
   material para revendedores. É a fonte mais confiável e a mais defensável.
2. Site oficial do importador ou distribuidor no Brasil.
3. E-commerces grandes de bebidas e supermercados brasileiros, onde a foto de
   produto costuma vir em fundo branco padronizado.

Prefira sempre a fonte mais alta desta lista que resolva o item. Registre de
onde veio.

### Regras de aceite — uma imagem só entra se cumprir todas

- **Unitária.** Uma garrafa apenas. Nada de pack, fardo, caixa, kit, combo,
  display de loja ou a garrafa ao lado do copo servido.
- **Fundo limpo.** Branco ou transparente. Recusar foto de ambiente, bar,
  mesa posta, mão segurando, pessoa, gelo, cenário.
- **Rótulo de frente e legível.** A marca precisa estar identificável.
- **Variante exata.** Este é o erro mais provável e o mais caro. Quarenta e
  quatro dos oitenta itens vêm com `variante_critica: true` — leia o campo
  `cuidado` antes de fechar cada um deles. Jack Daniel's
  Apple, Honey, Fire, Blackberri e Old Nº 7 são cinco produtos diferentes e têm
  rótulos diferentes. O mesmo vale para Johnnie Walker Red e Black, Bacardi
  Carta Blanca / Gold / Limón / Big Apple, Ypióca Ouro e Prata, Montilla
  Cristal e Ouro, Rajska tradicional / Apple / Red Fruits, Martini Bianco /
  Rosso / Rosato / Extra Dry, e Licor 43 tradicional e Chocolate.
- **Volume compatível.** Se o item pede 1L, não sirva a foto da versão 750ml
  quando o formato da garrafa for visivelmente outro. Quando a marca usa a mesma
  arte em todos os tamanhos, aceite e anote em `observacao`.
- **Lata é lata.** Norteña, Patricia, Zillertal e Red Bull têm itens em lata na
  tabela. A imagem tem que ser da lata, não da garrafa.
- **Resolução.** No mínimo 800px no lado maior. PNG com transparência é o ideal;
  JPG em fundo branco serve. O script de ingestão recusa qualquer arquivo com
  menos de 600px, então imagem pequena é trabalho perdido.
- **URL direta e estável.** O link tem que apontar para o arquivo de imagem e
  abrir sozinho no navegador, sem estar atrás de login, sem thumbnail de
  resultado de busca, sem link que expira.

### Não faça

- Não use imagem gerada por IA.
- Não use foto de marketplace com selo, tarja de desconto, "frete grátis" ou
  marca d'água de loja por cima do produto.
- Não invente URL. Se não achou, é melhor devolver o item como não encontrado.
- Não preencha um item com a foto de outro sabor "parecido" para fechar a lista.

### Se não encontrar

Devolva o item mesmo assim, com `url` vazia, `status` em `"nao_encontrado"` e
uma `observacao` dizendo o que você tentou. Um item vazio é resultado válido: o
site tem uma ilustração vetorial de reserva que entra sozinha no lugar. Uma
imagem errada, não — ela vai parar na frente do cliente.

### Verificação antes de entregar

Passe uma segunda vez pela lista inteira e confirme, item a item, que o rótulo
da imagem corresponde ao `nome` do produto. Conte os itens: a saída precisa ter
exatamente 80 objetos, um por `id` de entrada, sem repetir `id`. Se a mesma URL
aparecer em dois itens diferentes, pelo menos um está errado — investigue.

### Formato de saída

Grave `imagens.json` com exatamente esta estrutura:

```json
[
  {
    "id": "wh-8",
    "nome": "Whisky Jack Daniel's Old Nº 7",
    "url": "https://exemplo.com/caminho/jack-daniels-old-no7.png",
    "pagina_origem": "https://exemplo.com/produto/jack-daniels-old-no7",
    "fonte": "site oficial da marca",
    "largura": 1200,
    "altura": 1600,
    "fundo": "transparente",
    "status": "ok",
    "confianca": "alta",
    "observacao": ""
  }
]
```

Campos: `status` aceita `ok` ou `nao_encontrado`. `fundo` aceita `transparente`,
`branco` ou `outro`. `confianca` aceita `alta`, `media` ou `baixa` — use `media`
ou `baixa` quando houver qualquer dúvida sobre a variante, e explique em
`observacao`. Prefira admitir dúvida a esconder.

### Relatório final

Ao terminar, escreva um resumo curto: quantos itens ficaram `ok`, quantos
`nao_encontrado`, quais categorias deram mais trabalho, e a lista dos itens em
que a confiança ficou `media` ou `baixa` para conferência manual.

---

## Depois que o `imagens.json` voltar

```bash
cd clientes/monte-cristo
node scripts/baixar-imagens.cjs
```

O script casa por `id`, ignora o que veio `nao_encontrado` ou com URL inválida,
baixa cada arquivo para `assets/produtos/`, confere que o conteúdo é mesmo
PNG/JPEG/WebP e que tem pelo menos 600px no lado maior, e grava `images.js`. O
site passa a servir o próprio arquivo. O que não passar na validação é
reportado e o produto segue com a garrafa vetorial — uma pesquisa que volta
pela metade nunca deixa o site num estado quebrado.

Ao final, o relatório aponta: URL repetida em produtos diferentes (pelo menos
um está errado), itens de confiança média ou baixa para conferência a olho, e
quais variantes críticas continuam sem foto.

Existe ainda `node scripts/aplicar-imagens.cjs`, que aponta o site direto para
a URL de terceiro sem baixar nada. Serve para montar o mockup de apresentação
em minutos; não serve para o site definitivo, porque quebra no dia em que o
fornecedor reorganiza o próprio site.

## Sobre direito de uso

Foto de produto tem dono: normalmente o fabricante ou o varejista que produziu a
imagem. Para o mockup de apresentação ao cliente, esse uso é comum e de baixo
risco. Para o site no ar em caráter definitivo, o caminho seguro é usar as
imagens que o próprio fornecedor libera para revenda, ou fotografar o estoque da
Monte Cristo — o que também rende foto melhor, com a garrafa que ela realmente
vende. Vale combinar isso com o Ivan antes de publicar como definitivo.
