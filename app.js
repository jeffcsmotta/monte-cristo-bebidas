/* ==========================================================================
   MONTE CRISTO BEBIDAS — APLICAÇÃO JS & CATÁLOGO COMPLETO OFICIAL 2026
   Tabela Vigente até 30/09/2026 • Canal de Distribuição Serra Gaúcha
   ========================================================================== */

const BASE_PRODUCTS_DATA = [
    {
        id: "wh-1",
        name: "Aperitivo Malt.whisky Canela Firebird 950ML",
        volume: "950ML",
        price: 25.00,
        category: "licores",
        boxQty: 6,
        boxTotal: 146.25,
        active: true
    },
    {
        id: "lc-1",
        name: "Aperol",
        volume: "1L",
        price: 64.50,
        category: "licores",
        boxQty: 6,
        boxTotal: 377.33,
        active: true
    },
    {
        id: "lc-3",
        name: "Brasilberg Original 920ML",
        volume: "920ML",
        price: 66.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 391.37,
        active: true
    },
    {
        id: "lc-4",
        name: "Campari 998ML",
        volume: "998ML",
        price: 69.90,
        category: "licores",
        boxQty: 12,
        boxTotal: 817.83,
        active: true
    },
    {
        id: "cc-1",
        name: "Cachaça 51 Pirassununga 965ML",
        volume: "965ML",
        price: 18.90,
        category: "cachaca-conhaque",
        boxQty: 12,
        boxTotal: 221.13,
        active: true
    },
    {
        id: "cc-2",
        name: "Cachaça Velho Barreiro 910ML",
        volume: "910ML",
        price: 18.50,
        category: "cachaca-conhaque",
        boxQty: 12,
        boxTotal: 216.45,
        active: true
    },
    {
        id: "cc-7",
        name: "Cachaça Ypioca Brasilizar Ouro 965ML",
        volume: "965ML",
        price: 35.00,
        category: "cachaca-conhaque",
        boxQty: 12,
        boxTotal: 409.50,
        active: true
    },
    {
        id: "cc-8",
        name: "Cachaça Ypioca Brasilizar Prata 965ML",
        volume: "965ML",
        price: 35.00,
        category: "cachaca-conhaque",
        boxQty: 12,
        boxTotal: 409.50,
        active: true
    },
    {
        id: "cc-5",
        name: "Cachaça Casa Bucco",
        volume: "1L",
        price: 68.00,
        category: "cachaca-conhaque",
        boxQty: 6,
        boxTotal: 397.80,
        active: true
    },
    {
        id: "cc-10",
        name: "Cerveja Norteña 960ML",
        volume: "960ML",
        price: 28.00,
        category: "cachaca-conhaque",
        boxQty: 12,
        boxTotal: 327.60,
        active: true
    },
    {
        id: "cv-2",
        name: "Cerveja Norteña Latão",
        volume: "1L",
        price: 8.90,
        category: "cachaca-conhaque",
        boxQty: 6,
        boxTotal: 52.07,
        active: true
    },
    {
        id: "cc-12",
        name: "Cerveja Patricia 960ML",
        volume: "960ML",
        price: 23.50,
        category: "cachaca-conhaque",
        boxQty: 12,
        boxTotal: 274.95,
        active: true
    },
    {
        id: "cv-4",
        name: "Cerveja Patricia Latão",
        volume: "1L",
        price: 7.50,
        category: "cachaca-conhaque",
        boxQty: 6,
        boxTotal: 43.88,
        active: true
    },
    {
        id: "cc-14",
        name: "Cerveja Pilsen 960ML",
        volume: "960ML",
        price: 23.50,
        category: "cachaca-conhaque",
        boxQty: 12,
        boxTotal: 274.95,
        active: true
    },
    {
        id: "cc-15",
        name: "Cerveja Zillertal 970ML",
        volume: "970ML",
        price: 30.00,
        category: "cachaca-conhaque",
        boxQty: 12,
        boxTotal: 351.00,
        active: true
    },
    {
        id: "cv-7",
        name: "Cerveja Zillertal Latão",
        volume: "1L",
        price: 8.90,
        category: "cachaca-conhaque",
        boxQty: 6,
        boxTotal: 52.07,
        active: true
    },
    {
        id: "cc-6",
        name: "Conhaque Domecq 1L",
        volume: "1L",
        price: 55.00,
        category: "cachaca-conhaque",
        boxQty: 12,
        boxTotal: 643.50,
        active: true
    },
    {
        id: "cc-7-alt",
        name: "Conhaque Dreher",
        volume: "1L",
        price: 30.00,
        category: "cachaca-conhaque",
        boxQty: 12,
        boxTotal: 351.00,
        active: true
    },
    {
        id: "cc-8-alt",
        name: "Conhaque Presidente 900ML",
        volume: "900ML",
        price: 25.00,
        category: "cachaca-conhaque",
        boxQty: 6,
        boxTotal: 146.25,
        active: true
    },
    {
        id: "en-20",
        name: "Energetico Baly 2L",
        volume: "2L",
        price: 11.90,
        category: "energeticos",
        boxQty: 6,
        boxTotal: 69.62,
        active: true
    },
    {
        id: "en-21",
        name: "Energetico Baly Frutas Tropicais 2L",
        volume: "2L",
        price: 11.90,
        category: "energeticos",
        boxQty: 6,
        boxTotal: 69.62,
        active: true
    },
    {
        id: "en-22",
        name: "Energetico Baly Maça Verde 2L",
        volume: "2L",
        price: 11.90,
        category: "energeticos",
        boxQty: 6,
        boxTotal: 69.62,
        active: true
    },
    {
        id: "en-23",
        name: "Energetico Baly Melancia 2L",
        volume: "2L",
        price: 11.90,
        category: "energeticos",
        boxQty: 6,
        boxTotal: 69.62,
        active: true
    },
    {
        id: "en-24",
        name: "Energetico Baly Morango e Pêssego 2L",
        volume: "2L",
        price: 11.90,
        category: "energeticos",
        boxQty: 6,
        boxTotal: 69.62,
        active: true
    },
    {
        id: "en-25",
        name: "Energetico Red Bull 250ML",
        volume: "250ML",
        price: 9.50,
        category: "energeticos",
        boxQty: 24,
        boxTotal: 222.30,
        active: true
    },
    {
        id: "en-26",
        name: "Energetico Red Bull Tropical Edition 250ML",
        volume: "250ML",
        price: 10.50,
        category: "energeticos",
        boxQty: 24,
        boxTotal: 245.70,
        active: true
    },
    {
        id: "en-27",
        name: "Energetico Red Bull Melancia Edition 250ML",
        volume: "250ML",
        price: 10.50,
        category: "energeticos",
        boxQty: 24,
        boxTotal: 245.70,
        active: true
    },
    {
        id: "en-28",
        name: "Energetico Red Bull Morango e Pêssego Edition 250ML",
        volume: "250ML",
        price: 10.50,
        category: "energeticos",
        boxQty: 24,
        boxTotal: 245.70,
        active: true
    },
    {
        id: "en-29",
        name: "Energetico Red Bull Sugar Free 250ML",
        volume: "250ML",
        price: 10.50,
        category: "energeticos",
        boxQty: 24,
        boxTotal: 245.70,
        active: true
    },
    {
        id: "en-30",
        name: "Energetico Red Bull Zero 250ML",
        volume: "250ML",
        price: 10.50,
        category: "energeticos",
        boxQty: 24,
        boxTotal: 245.70,
        active: true
    },
    {
        id: "gn-1",
        name: "Gin Gordons 750ML",
        volume: "750ML",
        price: 89.90,
        category: "gin-tequila",
        boxQty: 12,
        boxTotal: 1051.83,
        active: true
    },
    {
        id: "gn-3",
        name: "Gin Rocks 1L",
        volume: "1L",
        price: 35.00,
        category: "gin-tequila",
        boxQty: 6,
        boxTotal: 204.75,
        active: true
    },
    {
        id: "gt-33",
        name: "Gin Rocks Strawberry 1L",
        volume: "1L",
        price: 35.00,
        category: "gin-tequila",
        boxQty: 6,
        boxTotal: 204.75,
        active: true
    },
    {
        id: "gt-34",
        name: "Gin Seagers 1L",
        volume: "1L",
        price: 59.00,
        category: "gin-tequila",
        boxQty: 12,
        boxTotal: 690.30,
        active: true
    },
    {
        id: "gt-35",
        name: "Gin Tanqueray 750ML",
        volume: "750ML",
        price: 133.90,
        category: "gin-tequila",
        boxQty: 12,
        boxTotal: 1566.63,
        active: true
    },
    {
        id: "lc-36",
        name: "Licor 43 700ML",
        volume: "700ML",
        price: 169.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 993.92,
        active: true
    },
    {
        id: "lc-37",
        name: "Licor 43 Chocolate 700ML",
        volume: "700ML",
        price: 180.00,
        category: "licores",
        boxQty: 6,
        boxTotal: 1053.00,
        active: true
    },
    {
        id: "lc-38",
        name: "Licor Amarula 750ML",
        volume: "750ML",
        price: 99.90,
        category: "licores",
        boxQty: 12,
        boxTotal: 1168.83,
        active: true
    },
    {
        id: "lc-5",
        name: "Licor Amaretto Dell Orso",
        volume: "1L",
        price: 99.80,
        category: "licores",
        boxQty: 6,
        boxTotal: 583.83,
        active: true
    },
    {
        id: "lc-40",
        name: "Licor Don Luiz Creme de Doce de Leite 750ML",
        volume: "750ML",
        price: 89.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 525.92,
        active: true
    },
    {
        id: "lc-41",
        name: "Licor Cointreau 700ML",
        volume: "700ML",
        price: 169.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 993.92,
        active: true
    },
    {
        id: "lc-42",
        name: "Licor Jägermeister 700ML",
        volume: "700ML",
        price: 159.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 935.42,
        active: true
    },
    {
        id: "lc-43",
        name: "Licor Stock Curaçau Fino",
        volume: "1L",
        price: 59.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 350.42,
        active: true
    },
    {
        id: "lc-44",
        name: "Licor Stock Pêssego",
        volume: "1L",
        price: 59.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 350.42,
        active: true
    },
    {
        id: "lc-45",
        name: "Licor Stock Curaçau Blue",
        volume: "1L",
        price: 59.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 350.42,
        active: true
    },
    {
        id: "lc-46",
        name: "Licor Stock Morango",
        volume: "1L",
        price: 59.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 350.42,
        active: true
    },
    {
        id: "lc-47",
        name: "Licor Stock Chocolate",
        volume: "1L",
        price: 59.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 350.42,
        active: true
    },
    {
        id: "lc-48",
        name: "Licor Stock Marula",
        volume: "1L",
        price: 79.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 467.42,
        active: true
    },
    {
        id: "lc-49",
        name: "Licor Stock Creme de Cacau",
        volume: "1L",
        price: 59.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 350.42,
        active: true
    },
    {
        id: "lc-50",
        name: "Licor Stock Creme de Cassis",
        volume: "1L",
        price: 59.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 350.42,
        active: true
    },
    {
        id: "lc-51",
        name: "Licor Stock Menta",
        volume: "1L",
        price: 79.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 467.42,
        active: true
    },
    {
        id: "lc-52",
        name: "Licor Stock Café",
        volume: "1L",
        price: 59.90,
        category: "licores",
        boxQty: 6,
        boxTotal: 350.42,
        active: true
    },
    {
        id: "rm-1",
        name: "Rum Bacardi Big Apple 700ML",
        volume: "700ML",
        price: 55.00,
        category: "gin-tequila",
        boxQty: 12,
        boxTotal: 643.50,
        active: true
    },
    {
        id: "rm-2",
        name: "Rum Bacardi Carta Blanca Superior 980ML",
        volume: "980ML",
        price: 52.50,
        category: "gin-tequila",
        boxQty: 12,
        boxTotal: 614.25,
        active: true
    },
    {
        id: "rm-3",
        name: "Rum Bacardi Gold 980ML",
        volume: "980ML",
        price: 55.00,
        category: "gin-tequila",
        boxQty: 12,
        boxTotal: 643.50,
        active: true
    },
    {
        id: "gt-56",
        name: "Rum Bacardi Limón 980ML",
        volume: "980ML",
        price: 55.00,
        category: "gin-tequila",
        boxQty: 12,
        boxTotal: 643.50,
        active: true
    },
    {
        id: "gt-57",
        name: "Rum Malibu 750ML",
        volume: "750ML",
        price: 69.90,
        category: "gin-tequila",
        boxQty: 12,
        boxTotal: 817.83,
        active: true
    },
    {
        id: "rm-6",
        name: "Rum Montilla Carta Cristal 1L",
        volume: "1L",
        price: 36.90,
        category: "gin-tequila",
        boxQty: 12,
        boxTotal: 431.73,
        active: true
    },
    {
        id: "rm-7",
        name: "Rum Montilla Carta Ouro 1L",
        volume: "1L",
        price: 36.90,
        category: "gin-tequila",
        boxQty: 12,
        boxTotal: 431.73,
        active: true
    },
    {
        id: "rm-8",
        name: "Steinhaeger Doble W 900ML",
        volume: "900ML",
        price: 55.00,
        category: "gin-tequila",
        boxQty: 12,
        boxTotal: 643.50,
        active: true
    },
    {
        id: "gn-6",
        name: "Tequila Jose Cuervo Reposado 750ML",
        volume: "750ML",
        price: 139.90,
        category: "gin-tequila",
        boxQty: 12,
        boxTotal: 1636.83,
        active: true
    },
    {
        id: "gn-7",
        name: "Tequila Jose Cuervo Silver 750ML",
        volume: "750ML",
        price: 139.90,
        category: "gin-tequila",
        boxQty: 12,
        boxTotal: 1636.83,
        active: true
    },
    {
        id: "vb-3",
        name: "Vermouth Martini Bianco 750ML",
        volume: "750ML",
        price: 50.00,
        category: "vermouth-bitter",
        boxQty: 12,
        boxTotal: 585.00,
        active: true
    },
    {
        id: "vb-4",
        name: "Vermouth Martini Extra Dry 750ML",
        volume: "750ML",
        price: 50.00,
        category: "vermouth-bitter",
        boxQty: 12,
        boxTotal: 585.00,
        active: true
    },
    {
        id: "vb-5",
        name: "Vermouth Martini Rosato 750ML",
        volume: "750ML",
        price: 50.00,
        category: "vermouth-bitter",
        boxQty: 12,
        boxTotal: 585.00,
        active: true
    },
    {
        id: "vb-6",
        name: "Vermouth Martini Rosso 750ML",
        volume: "750ML",
        price: 50.00,
        category: "vermouth-bitter",
        boxQty: 12,
        boxTotal: 585.00,
        active: true
    },
    {
        id: "vk-1",
        name: "Vodka Absolut 1L",
        volume: "1L",
        price: 99.90,
        category: "vodka",
        boxQty: 12,
        boxTotal: 1168.83,
        active: true
    },
    {
        id: "vk-68",
        name: "Vodka Ciroc 750ML",
        volume: "750ML",
        price: 275.00,
        category: "vodka",
        boxQty: 12,
        boxTotal: 3217.50,
        active: true
    },
    {
        id: "vk-3",
        name: "Vodka Grey Goose 750ML",
        volume: "750ML",
        price: 175.00,
        category: "vodka",
        boxQty: 6,
        boxTotal: 1023.75,
        active: true
    },
    {
        id: "vk-4",
        name: "Vodka Natasha 900ML",
        volume: "900ML",
        price: 25.00,
        category: "vodka",
        boxQty: 12,
        boxTotal: 292.50,
        active: true
    },
    {
        id: "vk-5",
        name: "Vodka Orloff 1L",
        volume: "1L",
        price: 35.70,
        category: "vodka",
        boxQty: 12,
        boxTotal: 417.69,
        active: true
    },
    {
        id: "vk-6",
        name: "Vodka Rajska",
        volume: "1L",
        price: 25.00,
        category: "vodka",
        boxQty: 12,
        boxTotal: 292.50,
        active: true
    },
    {
        id: "vk-7",
        name: "Vodka Rajska Apple",
        volume: "1L",
        price: 28.00,
        category: "vodka",
        boxQty: 12,
        boxTotal: 327.60,
        active: true
    },
    {
        id: "vk-8",
        name: "Vodka Rajska Red Fruits",
        volume: "1L",
        price: 28.00,
        category: "vodka",
        boxQty: 12,
        boxTotal: 327.60,
        active: true
    },
    {
        id: "vk-75",
        name: "Vodka Smirnoff 998ML",
        volume: "998ML",
        price: 40.00,
        category: "vodka",
        boxQty: 12,
        boxTotal: 468.00,
        active: true
    },
    {
        id: "wh-76",
        name: "Whisky Ballantine's Finnest 1L",
        volume: "1L",
        price: 99.00,
        category: "whisky",
        boxQty: 12,
        boxTotal: 1158.30,
        active: true
    },
    {
        id: "wh-3",
        name: "Whisky Black Stone",
        volume: "1L",
        price: 25.00,
        category: "whisky",
        boxQty: 12,
        boxTotal: 292.50,
        active: true
    },
    {
        id: "wh-4",
        name: "Whisky Chivas Regal 12 Anos 1L",
        volume: "1L",
        price: 170.43,
        category: "whisky",
        boxQty: 12,
        boxTotal: 1994.09,
        active: true
    },
    {
        id: "wh-9",
        name: "Whisky Jack Daniel's Apple 1L",
        volume: "1L",
        price: 155.00,
        category: "whisky",
        boxQty: 12,
        boxTotal: 1813.50,
        active: true
    },
    {
        id: "wh-80",
        name: "Whisky Jack Daniel's Blackberri 1L",
        volume: "1L",
        price: 165.00,
        category: "whisky",
        boxQty: 12,
        boxTotal: 1930.50,
        active: true
    },
    {
        id: "wh-81",
        name: "Whisky Jack Daniel's Fire 1L",
        volume: "1L",
        price: 155.00,
        category: "whisky",
        boxQty: 12,
        boxTotal: 1813.50,
        active: true
    },
    {
        id: "wh-82",
        name: "Whisky Jack Daniel's Old Nº 7 1L",
        volume: "1L",
        price: 155.00,
        category: "whisky",
        boxQty: 12,
        boxTotal: 1813.50,
        active: true
    },
    {
        id: "wh-83",
        name: "Whisky Jack Daniel's Honey 1L",
        volume: "1L",
        price: 155.00,
        category: "whisky",
        boxQty: 12,
        boxTotal: 1813.50,
        active: true
    },
    {
        id: "wh-84",
        name: "Whisky Jim Bean",
        volume: "1L",
        price: 119.90,
        category: "whisky",
        boxQty: 12,
        boxTotal: 1402.83,
        active: true
    },
    {
        id: "wh-11",
        name: "Whisky Johnnie Walker Black Label 1L",
        volume: "1L",
        price: 179.90,
        category: "whisky",
        boxQty: 12,
        boxTotal: 2104.83,
        active: true
    },
    {
        id: "wh-12",
        name: "Whisky Johnnie Walker Red Label 1L",
        volume: "1L",
        price: 99.90,
        category: "whisky",
        boxQty: 12,
        boxTotal: 1168.83,
        active: true
    },
    {
        id: "wh-14",
        name: "Whisky Passport 1L",
        volume: "1L",
        price: 58.00,
        category: "whisky",
        boxQty: 12,
        boxTotal: 678.60,
        active: true
    },
    {
        id: "wh-15",
        name: "Whisky White Horse 1L",
        volume: "1L",
        price: 89.90,
        category: "whisky",
        boxQty: 12,
        boxTotal: 1051.83,
        active: true
    },
    {
        id: "xr-89",
        name: "Xarope Fórmula Morango",
        volume: "1L",
        price: 45.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 263.25,
        active: true
    },
    {
        id: "xr-90",
        name: "Xarope Fórmula Chocolate",
        volume: "1L",
        price: 45.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 263.25,
        active: true
    },
    {
        id: "xr-91",
        name: "Xarope Fórmula Cranberry",
        volume: "1L",
        price: 45.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 263.25,
        active: true
    },
    {
        id: "xr-92",
        name: "Xarope Fórmula Grenadine",
        volume: "1L",
        price: 45.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 263.25,
        active: true
    },
    {
        id: "xr-93",
        name: "Xarope Fórmula Gengibre",
        volume: "1L",
        price: 45.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 263.25,
        active: true
    },
    {
        id: "xr-94",
        name: "Xarope Fórmula Maça Verde",
        volume: "1L",
        price: 45.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 263.25,
        active: true
    },
    {
        id: "xr-95",
        name: "Xarope Fórmula Pêssego",
        volume: "1L",
        price: 45.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 263.25,
        active: true
    },
    {
        id: "xr-96",
        name: "Xarope Fórmula Tangerina",
        volume: "1L",
        price: 45.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 263.25,
        active: true
    },
    {
        id: "xr-97",
        name: "Xarope Fórmula Limão Siciliano",
        volume: "1L",
        price: 45.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 263.25,
        active: true
    },
    {
        id: "xr-98",
        name: "Xarope Monin Maça Verde",
        volume: "1L",
        price: 65.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 380.25,
        active: true
    },
    {
        id: "xr-99",
        name: "Xarope Monin Morango",
        volume: "1L",
        price: 65.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 380.25,
        active: true
    },
    {
        id: "xr-100",
        name: "Xarope Monin Limão Siciliano",
        volume: "1L",
        price: 65.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 380.25,
        active: true
    },
    {
        id: "xr-101",
        name: "Xarope Monin Gengibre",
        volume: "1L",
        price: 65.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 380.25,
        active: true
    },
    {
        id: "xr-102",
        name: "Xarope Monin Cranberry",
        volume: "1L",
        price: 65.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 380.25,
        active: true
    },
    {
        id: "xr-103",
        name: "Xarope Monin Flor de Sabugueiro",
        volume: "1L",
        price: 65.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 380.25,
        active: true
    },
    {
        id: "xr-104",
        name: "Xarope Monin Cereja",
        volume: "1L",
        price: 65.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 380.25,
        active: true
    },
    {
        id: "xr-105",
        name: "Xarope Monin Romã",
        volume: "1L",
        price: 65.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 380.25,
        active: true
    },
    {
        id: "xr-106",
        name: "Xarope Monin Pêssego",
        volume: "1L",
        price: 65.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 380.25,
        active: true
    },
    {
        id: "xr-107",
        name: "Xarope Monin Tangerina",
        volume: "1L",
        price: 65.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 380.25,
        active: true
    },
    {
        id: "xr-108",
        name: "Xarope Monin Framboesa",
        volume: "1L",
        price: 65.00,
        category: "xaropes",
        boxQty: 6,
        boxTotal: 380.25,
        active: true
    },
];

// PRODUCTS_DATA dinâmico que integra itens base + itens customizados via Admin
let PRODUCTS_DATA = [...BASE_PRODUCTS_DATA];

// Wholesale vs Retail calculation helpers (Tabela Oficial Monte Cristo 2026)
function getBoxSize(item) {
    if (item.boxQty && item.boxQty > 0) return item.boxQty;
    if (item.boxSize) return item.boxSize;
    if (item.category === 'energeticos' || item.category === 'xaropes') return 12;
    if (item.category === 'cachaca-conhaque' && item.volume && item.volume.toLowerCase().includes('lata')) return 24;
    if (item.category === 'licores' || item.id === 'wh-11' || item.id === 'wh-4') return 6;
    return 12;
}

function getBoxUnitPrice(item) {
    if (item.boxTotal && item.boxTotal > 0 && item.boxQty && item.boxQty > 0) {
        return Math.round((item.boxTotal / item.boxQty) * 100) / 100;
    }
    const discount = item.boxDiscount || 0.08; // fração aplicada no total da caixa fechada (tabela)
    return Math.round((item.price * (1 - discount)) * 100) / 100;
}

function getBoxTotalPrice(item) {
    if (item.boxTotal && item.boxTotal > 0) {
        return Math.round(item.boxTotal * 100) / 100;
    }
    const size = getBoxSize(item);
    const uPrice = getBoxUnitPrice(item);
    return Math.round(size * uPrice * 100) / 100;
}

// App State
let cart = JSON.parse(localStorage.getItem('monte_cristo_cart')) || [];
let cardUnits = {}; // map productId -> 'unit' | 'box'
let activeCategory = 'all';
let searchQuery = '';
let paymentMethod = 'Pix'; // 'Pix' | 'Cartão' | 'Boleto'
let viewMode = 'cards'; // 'cards' or 'table'

// Alternador dinâmico de modalidade no card (Garrafa vs Caixa)
window.setCardUnit = function(productId, unitType) {
    cardUnits[productId] = unitType;
    renderProducts();
};

// Google Sheets Live Data Source ID (Oficial Publicado)
const MONTE_CRISTO_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7wGWevLALQ0P9Q73gBQFvUpveuRL-Jgnk-TlzqNwW0E4A7GYS9sxyRkoWABSBFY_TP3mm4fIbaelo/pub?output=csv';

function parseCsvPrice(valStr) {
    if (!valStr) return null;
    let clean = valStr.toString().trim().replace(/['"R$\s]/g, '');
    if (clean.includes(',') && clean.includes('.')) {
        clean = clean.replace(/\./g, '').replace(',', '.');
    } else if (clean.includes(',')) {
        clean = clean.replace(',', '.');
    }
    const num = parseFloat(clean);
    return isNaN(num) || num <= 0 ? null : num;
}

function parseCSVLine(text) {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === '"') {
            inQuotes = !inQuotes;
        } else if ((ch === ',' || ch === ';') && !inQuotes) {
            result.push(cur.trim().replace(/^"|"$/g, ''));
            cur = '';
        } else {
            cur += ch;
        }
    }
    result.push(cur.trim().replace(/^"|"$/g, ''));
    return result;
}

function parseAndApplyCsvPrices(csvText) {
    if (!csvText || typeof csvText !== 'string') return;
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length <= 1) return;

    const headerCols = parseCSVLine(lines[0]).map(c => c.toUpperCase());
    const idIdx = headerCols.findIndex(c => c === 'ID' || c.includes('ID') || c === 'SKU');
    const priceIdx = headerCols.findIndex(c => c.includes('PRECO') || c.includes('VALOR') || c.includes('VAREJO'));
    const statusIdx = headerCols.findIndex(c => c.includes('STATUS') || c.includes('ESTOQUE') || c.includes('DISPONIVEL'));

    let updatedCount = 0;
    const remoteOverrides = {};

    for (let i = 1; i < lines.length; i++) {
        const cols = parseCSVLine(lines[i]);
        if (cols.length < 2) continue;

        const id = (cols[idIdx >= 0 ? idIdx : 0] || '').trim();
        const priceRaw = cols[priceIdx >= 0 ? priceIdx : 4];
        const statusRaw = cols[statusIdx >= 0 ? statusIdx : 5];

        if (!id) continue;

        const product = PRODUCTS_DATA.find(p => p.id.toLowerCase() === id.toLowerCase());
        if (product) {
            const parsedPrice = parseCsvPrice(priceRaw);
            const isAvailable = !statusRaw || !['NAO', 'NÃO', 'PAUSADO', 'ESGOTADO', '0', 'FALSE'].includes(statusRaw.toUpperCase().trim());

            if (parsedPrice !== null) {
                product.price = parsedPrice;
            }
            product.active = isAvailable;

            remoteOverrides[product.id] = {
                price: parsedPrice !== null ? parsedPrice : product.price,
                active: isAvailable
            };
            updatedCount++;
        }
    }

    if (updatedCount > 0) {
        localStorage.setItem('monte_cristo_sheet_cache', JSON.stringify({
            timestamp: Date.now(),
            overrides: remoteOverrides
        }));
    }
}

async function syncPricesFromGoogleSheet() {
    const customUrl = localStorage.getItem('monte_cristo_custom_sheet_url');
    const targetUrl = customUrl || MONTE_CRISTO_SHEET_URL;

    // 1. Render instantâneo com cache local (0ms)
    try {
        const cache = JSON.parse(localStorage.getItem('monte_cristo_sheet_cache'));
        if (cache && cache.overrides) {
            PRODUCTS_DATA.forEach(item => {
                if (!item.originalPrice) item.originalPrice = item.price;
                if (cache.overrides[item.id]) {
                    if (typeof cache.overrides[item.id].price === 'number') item.price = cache.overrides[item.id].price;
                    if (typeof cache.overrides[item.id].active === 'boolean') item.active = cache.overrides[item.id].active;
                }
            });
            renderProducts();
        }
    } catch(e) {}

    // 2. Consulta em tempo real no Google Sheets (Stale-While-Revalidate)
    try {
        const response = await fetch(targetUrl);
        if (response.ok) {
            const csvText = await response.text();
            if (csvText && (csvText.includes('ID') || csvText.includes('wh-') || csvText.includes('vk-') || csvText.includes('PRODUTO'))) {
                parseAndApplyCsvPrices(csvText);
                applyPriceOverrides();
                renderProducts();
                updateCartUI();
            }
        }
    } catch(err) {
        console.warn('Falha silenciosa ao sincronizar planilha:', err);
    }
}



// Dynamic Pricing & Stock Overrides Engine (Local + Remote)
function applyPriceOverrides() {
    try {
        const overrides = JSON.parse(localStorage.getItem('monte_cristo_price_overrides')) || {};
        PRODUCTS_DATA.forEach(item => {
            if (!item.originalPrice) item.originalPrice = item.price;
            const ov = overrides[item.id];
            if (ov) {
                if (typeof ov.price === 'number' && !isNaN(ov.price)) {
                    item.price = ov.price;
                }
                if (typeof ov.active === 'boolean') {
                    item.active = ov.active;
                }
            }
        });
    } catch(e) {
        console.warn('Erro ao carregar overrides de preços:', e);
    }
}

function updateSimulationBanner() {
    let existingBanner = document.getElementById('sim-banner');
    const overrides = JSON.parse(localStorage.getItem('monte_cristo_price_overrides')) || {};
    const hasOverrides = Object.keys(overrides).length > 0;

    if (hasOverrides) {
        if (!existingBanner) {
            existingBanner = document.createElement('div');
            existingBanner.id = 'sim-banner';
            existingBanner.className = 'sim-floating-bar';
            document.body.appendChild(existingBanner);
        }
        existingBanner.innerHTML = `
            <span>🧪 <strong>Simulação de Preços Ativa:</strong> ${Object.keys(overrides).length} item(ns) alterado(s)</span>
            <a href="gestao-precos.html" target="_blank">Ajustar Preços</a>
            <button type="button" class="btn-reset-sim" onclick="resetSimOverrides()">Restaurar</button>
        `;
    } else if (existingBanner) {
        existingBanner.remove();
    }
}

window.resetSimOverrides = function() {
    localStorage.removeItem('monte_cristo_price_overrides');
    applyPriceOverrides();
    renderProducts();
    updateSimulationBanner();
    if (typeof showToast === 'function') showToast('✓ Preços restaurados para os valores padrão.');
};

// Expose PRODUCTS_DATA globally for external table pages
window.PRODUCTS_DATA = PRODUCTS_DATA;


// ==========================================================================
// CANAIS DE ATENDIMENTO MONTE CRISTO (CONTROLE INTERNO DISCRETO)
// ==========================================================================
const WHATSAPP_CONFIG = {
    ivan: {
        id: 'ivan',
        name: 'Ivan (Atendimento Principal)',
        label: 'Ivan',
        number: '5554999692859',
        display: '(54) 99969-2859'
    },
    michele: {
        id: 'michele',
        name: 'Michele (Atendimento Comercial)',
        label: 'Michele',
        number: '5554991552544',
        display: '(54) 99155-2544'
    }
};

window.WHATSAPP_CONFIG = WHATSAPP_CONFIG;

window.getActiveWhatsAppData = function() {
    try {
        const saved = localStorage.getItem('monte_cristo_active_whatsapp');
        if (saved === 'michele') return WHATSAPP_CONFIG.michele;
    } catch(e) {}
    return WHATSAPP_CONFIG.ivan;
};

window.setActiveWhatsApp = function(targetKey) {
    if (targetKey === 'michele' || targetKey === 'ivan') {
        localStorage.setItem('monte_cristo_active_whatsapp', targetKey);
        window.dispatchEvent(new CustomEvent('whatsapp_agent_changed', { detail: WHATSAPP_CONFIG[targetKey] }));
    }
};

// Fallback constant
const CLIENT_WHATSAPP = '5554999692859';

// Rebuild dynamic PRODUCTS_DATA from base + custom + edits - deleted
function rebuildProductsData() {
    try {
        const deletedIds = new Set(JSON.parse(localStorage.getItem('monte_cristo_deleted_ids')) || []);
        const productEdits = JSON.parse(localStorage.getItem('monte_cristo_product_edits')) || {};
        const customProducts = JSON.parse(localStorage.getItem('monte_cristo_custom_products')) || [];

        const list = BASE_PRODUCTS_DATA.filter(p => !deletedIds.has(p.id)).map(p => {
            const edit = productEdits[p.id];
            if (edit) {
                return { ...p, ...edit };
            }
            return { ...p };
        });

        customProducts.forEach(cp => {
            if (!deletedIds.has(cp.id)) {
                list.push({ ...cp });
            }
        });

        PRODUCTS_DATA = list;
        window.PRODUCTS_DATA = PRODUCTS_DATA;
    } catch(e) {
        console.error('Erro ao reconstruir catálogo de produtos:', e);
    }
}
window.rebuildProductsData = rebuildProductsData;
 

// Init App
document.addEventListener('DOMContentLoaded', () => {
    rebuildProductsData();
    applyPriceOverrides();
    renderProducts();
    updateSimulationBanner();
    setupEventListeners();
    setupCartDrawerListeners();
    updateCartUI();
    syncPricesFromGoogleSheet();
});


// Real-time synchronization across multiple tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'monte_cristo_price_overrides' || 
        e.key === 'monte_cristo_custom_products' || 
        e.key === 'monte_cristo_product_edits' || 
        e.key === 'monte_cristo_deleted_ids') {
        rebuildProductsData();
        applyPriceOverrides();
        renderProducts();
        updateSimulationBanner();
    }
    if (e.key === 'monte_cristo_active_whatsapp') {
        window.dispatchEvent(new CustomEvent('whatsapp_agent_changed', { detail: window.getActiveWhatsAppData() }));
    }
});


function setupEventListeners() {
    // Search input listener
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');
    const syncClear = () => {
        if (searchClear) searchClear.classList.toggle('visible', !!searchQuery);
    };
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            syncClear();
            renderProducts();
        });
    }
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchQuery = '';
            if (searchInput) {
                searchInput.value = '';
                searchInput.focus();
            }
            syncClear();
            renderProducts();
        });
    }

    // Category filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            renderProducts();
        });
    });

    // Inicia comportamento inteligente de rolagem (Smart Scroll)
    setupSmartScroll();
}

/* ==========================================================================
   SMART SCROLL: Ocultar busca e categorias durante a rolagem para baixo
   Liberando a tela do mobile para os produtos, e reexibindo ao rolar para cima.
   ========================================================================== */
function setupSmartScroll() {
    const shopBar = document.getElementById('shop-bar');
    const searchInput = document.getElementById('search-input');
    if (!shopBar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    const scrollDeltaThreshold = 8; // Sensibilidade do scroll em pixels

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const isSearchFocused = searchInput && document.activeElement === searchInput;

                // Só esconde depois que o usuário já rolou além do header (ex: 140px) e não está digitando
                if (currentScrollY > 140 && !isSearchFocused) {
                    if (currentScrollY > lastScrollY + scrollDeltaThreshold) {
                        // Rolando para BAIXO -> esconde busca e chips snacks
                        shopBar.classList.add('bar-hidden');
                    } else if (currentScrollY < lastScrollY - scrollDeltaThreshold) {
                        // Rolando para CIMA -> reexibe busca e chips
                        shopBar.classList.remove('bar-hidden');
                    }
                } else if (currentScrollY <= 80) {
                    // Próximo ao topo -> sempre visível
                    shopBar.classList.remove('bar-hidden');
                }

                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ==========================================================================
   CONSIGNAÇÃO 20%: Ações e Modal Explicativa
   ========================================================================== */
window.openConsignacaoModal = function() {
    const modal = document.getElementById('modal-consignacao');
    if (modal) {
        modal.hidden = false;
        if (window.lucide) lucide.createIcons();
    }
};

window.closeConsignacaoModal = function() {
    const modal = document.getElementById('modal-consignacao');
    if (modal) modal.hidden = true;
};

window.openWhatsAppConsignacao = function() {
    const wa = window.getActiveWhatsAppData ? window.getActiveWhatsAppData() : { number: '5554999692859' };
    const text = encodeURIComponent('Olá! Gostaria de falar com o consultor sobre a Consignação de 20% para bebidas no meu evento/casamento.');
    window.open(`https://wa.me/${wa.number}?text=${text}`, '_blank');
};

// Fechar modal ao clicar fora ou via tecla Escape
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-consignacao');
    if (modal && !modal.hidden && e.target === modal) {
        window.closeConsignacaoModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeConsignacaoModal();
    }
});

function renderConsignacaoCard() {
    return `
        <div class="consignacao-native-card">
            <div>
                <div class="consignacao-card-header">
                    <span class="consignacao-badge">
                        <i data-lucide="sparkles" style="width:13px; height:13px;"></i>
                        Diferencial Monte Cristo
                    </span>
                    <span style="font-size:0.75rem; color:#94A3B8; font-weight:700;">Eventos &amp; Casamentos</span>
                </div>
                <h3 class="consignacao-card-title">Consignação de <span>até 20%</span> do seu Pedido</h3>
                <p class="consignacao-card-desc">
                    Vai casar, comemorar formatura ou fazer evento corporativo? Monte sua lista com folga: as garrafas lacradas que sobrarem são <strong>recolhidas e 100% estornadas</strong> na sua conta!
                </p>
                <div class="consignacao-benefits-list">
                    <div class="consignacao-benefit-item">
                        <i data-lucide="shield-check"></i>
                        <span>Garantia de que as bebidas não vão faltar na festa</span>
                    </div>
                    <div class="consignacao-benefit-item">
                        <i data-lucide="rotate-ccw"></i>
                        <span>Devolução e estorno garantido do valor das sobras lacradas</span>
                    </div>
                    <div class="consignacao-benefit-item">
                        <i data-lucide="award"></i>
                        <span>Rótulos 100% originais, direto da distribuidora e com NF</span>
                    </div>
                </div>
            </div>
            <div class="consignacao-card-actions">
                <button type="button" class="btn-consignacao-wa" onclick="window.openWhatsAppConsignacao()">
                    <i data-lucide="message-circle" style="width:16px; height:16px;"></i>
                    <span>Falar com Consultor no WhatsApp</span>
                </button>
                <button type="button" class="btn-consignacao-info" onclick="window.openConsignacaoModal()">
                    <i data-lucide="info" style="width:15px; height:15px;"></i>
                    <span>Como funciona?</span>
                </button>
            </div>
        </div>
    `;
}

// Toggle View Mode (Cards vs Table)
window.setViewMode = function(mode) {
    viewMode = mode;
    document.querySelectorAll('.btn-view-mode').forEach(b => b.classList.remove('active'));
    if (mode === 'cards') {
        document.getElementById('btn-mode-cards')?.classList.add('active');
    } else {
        document.getElementById('btn-mode-table')?.classList.add('active');
    }
    renderProducts();
};

/* Miniatura do produto.
   Quando o banco de imagens reais estiver montado, basta preencher o campo
   `image` de cada produto: a foto passa a ser usada em todo lugar (grade,
   lista e pedido) sem nenhuma outra mudanca de codigo. Ate la, entra a
   ilustracao vetorial da garrafa. */
/* Tem foto real de garrafa? Serve tanto para ordenar a vitrine quanto para o
   filtro "Com foto". */
function hasPhoto(item) {
    const banco = window.PRODUCT_IMAGES || {};
    return !!(banco[item.id] || item.image);
}
window.hasPhoto = hasPhoto;

function productThumb(item, cssClass) {
    const cls = cssClass || 'product-img';
    const banco = window.PRODUCT_IMAGES || {};
    const foto = banco[item.id] || item.image;
    if (foto) {
        return `<img src="${foto}" alt="${item.name}" class="${cls}" loading="lazy">`;
    }
    return window.bottleSVG ? window.bottleSVG(item) : '';
}
window.productThumb = productThumb;

// Render Products Grid or Table
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const filtered = PRODUCTS_DATA.filter(item => {
        const matchesCategory = (activeCategory === 'all') || (item.category === activeCategory);
        const matchesSearch = item.name.toLowerCase().includes(searchQuery) || item.volume.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    })
        /* Foto na frente. A vitrine abre pelo que tem imagem de verdade; o que
           ainda usa a garrafa vetorial vem depois, na ordem original do
           catálogo. Ordenacao estavel, entao dentro de cada grupo nada muda. */
        .sort((a, b) => (hasPhoto(b) ? 1 : 0) - (hasPhoto(a) ? 1 : 0));

    const countEl = document.getElementById('results-count');
    if (countEl) {
        countEl.textContent = filtered.length === 1 ? '1 rótulo' : `${filtered.length} rótulos`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i data-lucide="search-x" style="width: 48px; height: 48px; color: #94A3B8; margin-bottom: 12px;"></i>
                <h3 style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--primary);">Nenhuma bebida encontrada</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Tente buscar por outro termo ou selecione outra categoria.</p>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
        return;
    }

    if (viewMode === 'table') {
        grid.style.display = 'block';
        grid.innerHTML = `
            <div class="products-table-wrapper">
                <table class="products-table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Bebida / Rótulo Oficial</th>
                            <th>Categoria</th>
                            <th>Embalagem</th>
                            <th>Preço Unitário</th>
                            <th>Preço Caixa Fechada</th>
                            <th style="text-align:right;">Adicionar</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filtered.map(item => {
                            const bSize = getBoxSize(item);
                            const bUnitPrice = getBoxUnitPrice(item);
                            const isAvailable = item.active !== false;

                            return `
                                <tr class="${!isAvailable ? 'is-paused' : ''}">
                                    <td>
                                        <div style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; position: relative;">
                                            ${productThumb(item)}
                                            ${!isAvailable ? '<span class="product-status-tag-paused" style="font-size:0.6rem; padding:1px 4px; top:0; right:0;">Esgotado</span>' : ''}
                                        </div>
                                    </td>
                                    <td>
                                        <strong style="color:var(--primary); font-weight:700;">${item.name}</strong>
                                    </td>
                                    <td>
                                        <span class="product-category-badge" style="position:static; display:inline-block;">${getCategoryName(item.category)}</span>
                                    </td>
                                    <td style="color:var(--text-muted); font-weight:600;">
                                        ${item.volume}
                                    </td>
                                    <td>
                                        <span style="font-family:var(--font-heading); font-weight:800; color:var(--primary); font-size:1.05rem;">
                                            R$ ${formatMoney(item.price)}
                                        </span>
                                    </td>
                                    <td>
                                        <span style="font-family:var(--font-heading); font-weight:800; color:var(--accent-green); font-size:1.05rem;">
                                            R$ ${formatMoney(bUnitPrice)}
                                        </span>
                                        <small style="display:block; color:var(--text-muted); font-size:0.75rem;">(${bSize} un)</small>
                                    </td>
                                    <td style="text-align:right;">
                                        ${isAvailable ? `
                                            <div style="display:inline-flex; gap:4px;">
                                                <button class="btn-add-unit" onclick="addToCart('${item.id}', 'unit')" title="Garrafa Avulsa">
                                                    + 🍾 Garrafa
                                                </button>
                                                <button class="btn-add-box" onclick="addToCart('${item.id}', 'box')" title="Caixa Fechada (${bSize} un)">
                                                    + 📦 Caixa (${bSize})
                                                </button>
                                            </div>
                                        ` : `
                                            <span style="font-size:0.8rem; font-weight:800; color:#EF4444;">Esgotado</span>
                                        `}
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        grid.style.display = 'grid';
        const cardsHtml = [];
        const insertIndex = 4; // Exibe após os 4 primeiros produtos (2 fileiras completas no mobile)
        let insertedConsignacao = false;

        filtered.forEach((item, index) => {
            if (index === insertIndex) {
                cardsHtml.push(renderConsignacaoCard());
                insertedConsignacao = true;
            }

            const bSize = getBoxSize(item);
            const bUnitPrice = getBoxUnitPrice(item);
            const bTotalPrice = getBoxTotalPrice(item);
            const currentUnit = cardUnits[item.id] || 'unit';
            const isBox = currentUnit === 'box';
            const isAvailable = item.active !== false;

            cardsHtml.push(`
                <div class="product-card ${!isAvailable ? 'is-paused' : ''}" data-id="${item.id}">
                    <div class="product-image-box">
                        <span class="product-category-badge">${getCategoryName(item.category)}</span>
                        ${!isAvailable ? '<span class="product-status-tag-paused">Esgotado</span>' : ''}
                        ${productThumb(item)}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${item.name} <small style="font-weight:600; color:var(--text-muted); font-size:0.8rem;">(${item.volume})</small></h3>

                        <div class="card-unit-tabs" data-id="${item.id}">
                            <button type="button" class="card-tab ${!isBox ? 'active' : ''}" data-unit="unit" onclick="window.setCardUnit('${item.id}', 'unit')">
                                🍾 Garrafa
                            </button>
                            <button type="button" class="card-tab ${isBox ? 'active' : ''}" data-unit="box" onclick="window.setCardUnit('${item.id}', 'box')">
                                📦 Caixa (${bSize}un)
                            </button>
                        </div>

                        <div class="product-price-box">
                            <div class="price-amount-display">
                                ${isBox
                                    ? `R$ ${formatMoney(bUnitPrice)} <small>/un na caixa</small>`
                                    : `R$ ${formatMoney(item.price)} <small>/garrafa avulsa</small>`
                                }
                            </div>
                            <div class="price-subtext-display">
                                ${isBox
                                    ? `Total da Caixa (${bSize}un): <strong>R$ ${formatMoney(bTotalPrice)}</strong>`
                                    : `Venda unitária de tabela`
                                }
                            </div>
                        </div>

                        ${isAvailable ? `
                            <button type="button" class="btn-add-main ${isBox ? 'box-mode' : 'unit-mode'}" onclick="addToCart('${item.id}', '${currentUnit}')">
                                <i data-lucide="${isBox ? 'package' : 'plus'}"></i>
                                <span>${isBox ? `Adicionar Caixa (${bSize}un)` : 'Adicionar 1 Garrafa'}</span>
                            </button>
                        ` : `
                            <button type="button" class="btn-add-main paused-btn" disabled>
                                <i data-lucide="slash"></i>
                                <span>Esgotado no Estoque</span>
                            </button>
                        `}
                    </div>
                </div>
            `);
        });

        if (!insertedConsignacao && filtered.length > 0) {
            cardsHtml.push(renderConsignacaoCard());
        }

        grid.innerHTML = cardsHtml.join('');
    }

    if (window.lucide) lucide.createIcons();
}

function getCategoryName(cat) {
    const map = {
        'whisky': 'Whisky',
        'vodka': 'Vodka',
        'gin-tequila': 'Gin & Tequila',
        'licores': 'Licor & Aperitivo',
        'cachaca-conhaque': 'Cachaça & Conhaque',
        'vermouth-bitter': 'Vermouth & Bitter',
        'energeticos': 'Energético & Ice',
        'xaropes': 'Xarope & Outros'
    };
    return map[cat] || 'Bebida';
}

// Cart Functions (Varejo x Atacado)
function addToCart(productId, unitType = 'unit') {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const cartItemId = `${productId}-${unitType}`;
    const existing = cart.find(c => (c.cartItemId === cartItemId) || (c.id === productId && c.unitType === unitType));

    const bSize = getBoxSize(product);
    const bUnitPrice = getBoxUnitPrice(product);
    const bTotalPrice = getBoxTotalPrice(product);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            cartItemId: cartItemId,
            id: product.id,
            name: product.name,
            volume: product.volume,
            category: product.category,
            image: product.image,
            unitType: unitType, // 'unit' | 'box'
            boxSize: bSize,
            unitPrice: unitType === 'box' ? bUnitPrice : product.price,
            price: unitType === 'box' ? bTotalPrice : product.price,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    renderProducts();
    const label = unitType === 'box' ? `Caixa de ${product.name} (${bSize} un)` : product.name;
    showToast(`✓ ${label} adicionado ao pedido!`);
}

function updateQuantity(cartItemId, newQty) {
    if (newQty <= 0) {
        cart = cart.filter(c => (c.cartItemId || c.id) !== cartItemId);
    } else {
        const item = cart.find(c => (c.cartItemId || c.id) === cartItemId);
        if (item) item.quantity = newQty;
    }

    saveCart();
    updateCartUI();
    renderProducts();
}

function saveCart() {
    localStorage.setItem('monte_cristo_cart', JSON.stringify(cart));
}

window.clearCart = function() {
    if (cart.length === 0) return;

    const itens = cart.reduce((soma, item) => soma + item.quantity, 0);
    const valor = cart.reduce((soma, item) => soma + (item.price * item.quantity), 0);

    const overlay = document.getElementById('confirm-clear');
    const texto = document.getElementById('confirm-clear-text');

    if (!overlay || !texto) {
        if (confirm(`Remover ${itens} ${itens === 1 ? 'bebida' : 'bebidas'} do pedido?`)) aplicarLimpeza();
        return;
    }

    texto.innerHTML = itens === 1
        ? `Você vai remover <strong>1 item</strong>, no valor de <strong>R$ ${formatMoney(valor)}</strong>.`
        : `Você vai remover <strong>${itens} itens</strong>, no valor de <strong>R$ ${formatMoney(valor)}</strong>.`;

    abrirConfirmacao(overlay);
};

function aplicarLimpeza() {
    cart = [];
    saveCart();
    updateCartUI();
    renderProducts();
    showToast('Pedido limpo. Escolha as bebidas de novo no catálogo.');
}

function abrirConfirmacao(overlay) {
    const sim = document.getElementById('confirm-clear-yes');
    const nao = document.getElementById('confirm-clear-no');

    function fechar() {
        overlay.hidden = true;
        document.removeEventListener('keydown', aoTeclar);
        overlay.removeEventListener('click', aoClicarFora);
        sim.onclick = null;
        nao.onclick = null;
    }
    function aoTeclar(e) {
        if (e.key === 'Escape') fechar();
    }
    function aoClicarFora(e) {
        if (e.target === overlay) fechar();
    }

    sim.onclick = () => { fechar(); aplicarLimpeza(); };
    nao.onclick = fechar;
    document.addEventListener('keydown', aoTeclar);
    overlay.addEventListener('click', aoClicarFora);

    overlay.hidden = false;
    if (window.lucide) lucide.createIcons();
    nao.focus();
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Badges & Headers
    const badgeCount = document.getElementById('cart-badge-count');
    const headerTotal = document.getElementById('cart-total-header');
    if (badgeCount) badgeCount.textContent = totalCount;
    if (headerTotal) headerTotal.textContent = `R$ ${formatMoney(subtotal)}`;

    // Floating Mobile Bar
    const floatingBar = document.getElementById('floating-cart-bar');
    const floatingCount = document.getElementById('floating-cart-count');
    const floatingTotal = document.getElementById('floating-cart-total');
    
    if (floatingBar) {
        if (totalCount > 0) {
            floatingBar.classList.add('active');
            if (floatingCount) floatingCount.textContent = `${totalCount} item(s) selecionado(s)`;
            if (floatingTotal) floatingTotal.textContent = `R$ ${formatMoney(subtotal)}`;
        } else {
            floatingBar.classList.remove('active');
        }
    }

    // Drawer Items Render
    const cartContainer = document.getElementById('cart-items-container');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartTotalEl = document.getElementById('cart-total-price');

    if (cartSubtotalEl) cartSubtotalEl.textContent = `R$ ${formatMoney(subtotal)}`;

    const clearBtn = document.getElementById('cart-clear-header');
    if (clearBtn) clearBtn.style.display = cart.length ? 'inline-flex' : 'none';

    if (cartContainer) {
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="cart-empty-msg">
                    <i data-lucide="shopping-bag"></i>
                    <p style="font-weight:700; color:var(--text-dark); margin-bottom:4px;">Seu pedido está vazio</p>
                    <p style="font-size:0.85rem;">Escolha as bebidas no catálogo ao lado para adicionar ao pedido.</p>
                </div>
            `;
        } else {
            cartContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-img">${productThumb(item, 'cart-thumb-img')}</div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name} (${item.volume})</div>
                        ${item.unitType === 'box' ? `
                            <div class="cart-item-tag box-tag">📦 Caixa Fechada (${item.boxSize} un) · R$ ${formatMoney(item.unitPrice)}/un</div>
                        ` : `
                            <div class="cart-item-tag unit-tag">🍾 Garrafa Avulsa · R$ ${formatMoney(item.unitPrice)}/un</div>
                        `}
                        <div class="cart-item-price">Subtotal: R$ ${formatMoney(item.price * item.quantity)}</div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="cart-controls">
                            <button type="button" class="cart-qty-btn" onclick="updateQuantity('${item.cartItemId || item.id}', ${item.quantity - 1})" aria-label="Diminuir quantidade">-</button>
                            <span class="cart-qty-num">${item.quantity} ${item.unitType === 'box' ? 'cx' : 'un'}</span>
                            <button type="button" class="cart-qty-btn" onclick="updateQuantity('${item.cartItemId || item.id}', ${item.quantity + 1})" aria-label="Aumentar quantidade">+</button>
                        </div>
                        <button type="button" class="btn-remove-item" onclick="updateQuantity('${item.cartItemId || item.id}', 0)" aria-label="Remover item">
                            <i data-lucide="trash-2" style="width:16px; height:16px;"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    if (cartTotalEl) cartTotalEl.textContent = `R$ ${formatMoney(subtotal)}`;

    if (window.lucide) lucide.createIcons();
}

// Drawer Toggle
window.toggleCartDrawer = function(open) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
        if (open) {
            drawer.classList.add('active');
            overlay.classList.add('active');
        } else {
            drawer.classList.remove('active');
            overlay.classList.remove('active');
        }
    }
};

window.openCart = function() {
    window.toggleCartDrawer(true);
};

window.closeCart = function() {
    window.toggleCartDrawer(false);
};

// Alternador de forma de pagamento Monte Cristo
function setupCartDrawerListeners() {
    document.querySelectorAll('.pay-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            paymentMethod = btn.dataset.pay || 'Pix';

            const cashBox = document.getElementById('cash-change-box');
            if (cashBox) cashBox.style.display = paymentMethod === 'Boleto' ? 'block' : 'none';
        });
    });
}

// WhatsApp Order Dispatch
window.sendWhatsAppOrder = function() {
    if (cart.length === 0) {
        showToast("⚠️ Adicione pelo menos uma bebida ao pedido antes de enviar.");
        return;
    }

    const clientNameInput = document.getElementById('input-client-name');
    const addressInput = document.getElementById('input-address');
    
    const clientName = clientNameInput ? clientNameInput.value.trim() : '';
    const address = addressInput ? addressInput.value.trim() : '';

    if (!clientName) {
        showToast("⚠️ Por favor, informe seu Nome Completo ou Razão Social.");
        if (clientNameInput) clientNameInput.focus();
        return;
    }

    if (!address) {
        showToast("⚠️ Por favor, informe o Endereço Completo de Entrega.");
        if (addressInput) addressInput.focus();
        return;
    }

    const cashChangeInput = document.getElementById('cash-change-val');
    const cashChange = cashChangeInput ? cashChangeInput.value.trim() : '';

    let msg = `_pedido via site by Onira.fly_

Solicitação de Distribuição · Reserva de Estoque

`;

    cart.forEach(item => {
        if (item.unitType === 'box') {
            msg += `*${item.quantity}x* Caixa Fechada (${item.boxSize} un) · ${item.name} (${item.volume})
`;
            msg += `+ R$ ${formatMoney(item.unitPrice)}/un (Caixa Fechada)
`;
            msg += `*R$ ${formatMoney(item.price * item.quantity)}*

`;
        } else {
            msg += `*${item.quantity}x* Garrafa Avulsa · ${item.name} (${item.volume})
`;
            msg += `*R$ ${formatMoney(item.price * item.quantity)}*

`;
        }
    });

    const subtotalVal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    msg += `*Subtotal Estimado: R$ ${formatMoney(subtotalVal)}*
`;
    msg += `Logística: Entrega após 24h úteis à confirmação do pedido com nosso atendente, conforme a disponibilidade dos itens em estoque.
`;
    msg += `*Total Estimado: R$ ${formatMoney(subtotalVal)}*

`;

    if (clientName) msg += `*${clientName}*
`;
    if (address) msg += `${address}
`;

    msg += `Pagamento: ${paymentMethod}
`;
    if (cashChange) {
        msg += `Obs/Faturamento: ${cashChange}
`;
    }

    msg += `
_Enviado pelo canal oficial Monte Cristo Bebidas_`;

    const encoded = encodeURIComponent(msg);
    const targetNumber = window.getActiveWhatsAppData ? window.getActiveWhatsAppData().number : CLIENT_WHATSAPP;
    const url = `https://wa.me/${targetNumber}?text=${encoded}`;
    window.open(url, '_blank');
};

// Toast Notification
function showToast(message) {
    const existing = document.querySelector('.toast-container');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.className = 'toast-container';
    container.innerHTML = `<div class="toast-box">${message}</div>`;
    document.body.appendChild(container);

    setTimeout(() => {
        container.remove();
    }, 3000);
}

// Utility Money Format
function formatMoney(val) {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
