/* ==========================================================================
   MONTE CRISTO BEBIDAS — APLICAÇÃO JS & CATÁLOGO COMPLETO DE PRODUTOS
   ========================================================================== */

const PRODUCTS_DATA = [
    // === WHISKY IMPORTADO E NACIONAL ===
    {
        id: "wh-1",
        name: "Aperitivo Malt Whisky Canela Firebird",
        volume: "950ml",
        price: 25.00,
        category: "whisky",
    },
    {
        id: "wh-2",
        name: "Whisky Ballantines Finest",
        volume: "1L",
        price: 99.00,
        category: "whisky",
    },
    {
        id: "wh-3",
        name: "Whisky Black Stone",
        volume: "1L",
        price: 23.50,
        category: "whisky",
    },
    {
        id: "wh-4",
        name: "Whisky Chivas Regal 12 Anos",
        volume: "1L",
        price: 170.43,
        category: "whisky",
    },
    {
        id: "wh-5",
        name: "Whisky Jack Daniel's Apple",
        volume: "1L",
        price: 155.00,
        category: "whisky",
    },
    {
        id: "wh-6",
        name: "Whisky Jack Daniel's Blackberri",
        volume: "1L",
        price: 165.00,
        category: "whisky",
    },
    {
        id: "wh-7",
        name: "Whisky Jack Daniel's Fire",
        volume: "1L",
        price: 155.00,
        category: "whisky",
    },
    {
        id: "wh-8",
        name: "Whisky Jack Daniel's Old Nº 7",
        volume: "1L",
        price: 155.00,
        category: "whisky",
    },
    {
        id: "wh-9",
        name: "Whisky Jack Daniel's Honey",
        volume: "1L",
        price: 155.00,
        category: "whisky",
    },
    {
        id: "wh-10",
        name: "Whisky Jim Beam Bourbon",
        volume: "1L",
        price: 119.90,
        category: "whisky",
    },
    {
        id: "wh-11",
        name: "Whisky Johnnie Walker Black Label",
        volume: "1L",
        price: 179.90,
        category: "whisky",
    },
    {
        id: "wh-12",
        name: "Whisky Johnnie Walker Red Label",
        volume: "1L",
        price: 99.90,
        category: "whisky",
    },
    {
        id: "wh-13",
        name: "Whisky Natu Nobilis",
        volume: "1L",
        price: 55.00,
        category: "whisky",
    },
    {
        id: "wh-14",
        name: "Whisky Passport",
        volume: "1L",
        price: 58.00,
        category: "whisky",
    },
    {
        id: "wh-15",
        name: "Whisky White Horse",
        volume: "1L",
        price: 89.90,
        category: "whisky",
    },

    // === VODKA IMPORTADA E NACIONAL ===
    {
        id: "vk-1",
        name: "Vodka Absolut",
        volume: "1L",
        price: 99.90,
        category: "vodka",
    },
    {
        id: "vk-2",
        name: "Vodka Cîroc Original",
        volume: "750ml",
        price: 275.00,
        category: "vodka",
    },
    {
        id: "vk-3",
        name: "Vodka Grey Goose",
        volume: "750ml",
        price: 175.00,
        category: "vodka",
    },
    {
        id: "vk-4",
        name: "Vodka Natasha",
        volume: "900ml",
        price: 25.00,
        category: "vodka",
    },
    {
        id: "vk-5",
        name: "Vodka Orloff",
        volume: "1L",
        price: 35.70,
        category: "vodka",
    },
    {
        id: "vk-6",
        name: "Vodka Rajska Traditional",
        volume: "1L",
        price: 22.00,
        category: "vodka",
    },
    {
        id: "vk-7",
        name: "Vodka Rajska Apple",
        volume: "1L",
        price: 28.00,
        category: "vodka",
    },
    {
        id: "vk-8",
        name: "Vodka Rajska Red Fruits",
        volume: "1L",
        price: 28.00,
        category: "vodka",
    },
    {
        id: "vk-9",
        name: "Vodka Smirnoff 21",
        volume: "998ml",
        price: 40.00,
        category: "vodka",
    },

    // === GIN, TEQUILA E RUM ===
    {
        id: "gn-1",
        name: "Gin Gordon's London Dry",
        volume: "750ml",
        price: 89.90,
        category: "gin-tequila",
    },
    {
        id: "gn-2",
        name: "Gin Rock's Traditional",
        volume: "1L",
        price: 35.00,
        category: "gin-tequila",
    },
    {
        id: "gn-3",
        name: "Gin Rock's Strawberry",
        volume: "1L",
        price: 35.00,
        category: "gin-tequila",
    },
    {
        id: "gn-4",
        name: "Gin Seagers Original",
        volume: "1L",
        price: 59.00,
        category: "gin-tequila",
    },
    {
        id: "gn-5",
        name: "Gin Tanqueray London Dry",
        volume: "750ml",
        price: 133.90,
        category: "gin-tequila",
    },
    {
        id: "gn-6",
        name: "Tequila Jose Cuervo Reposado",
        volume: "750ml",
        price: 139.90,
        category: "gin-tequila",
    },
    {
        id: "gn-7",
        name: "Tequila Jose Cuervo Silver",
        volume: "750ml",
        price: 139.90,
        category: "gin-tequila",
    },
    {
        id: "rm-1",
        name: "Rum Bacardi Big Apple",
        volume: "700ml",
        price: 55.00,
        category: "gin-tequila",
    },
    {
        id: "rm-2",
        name: "Rum Bacardi Carta Blanca Superior",
        volume: "980ml",
        price: 52.50,
        category: "gin-tequila",
    },
    {
        id: "rm-3",
        name: "Rum Bacardi Gold",
        volume: "980ml",
        price: 55.00,
        category: "gin-tequila",
    },
    {
        id: "rm-4",
        name: "Rum Bacardi Limon",
        volume: "980ml",
        price: 55.00,
        category: "gin-tequila",
    },
    {
        id: "rm-5",
        name: "Rum Malibu Coconut",
        volume: "750ml",
        price: 69.90,
        category: "gin-tequila",
    },
    {
        id: "rm-6",
        name: "Rum Montilla Carta Cristal",
        volume: "1L",
        price: 36.90,
        category: "gin-tequila",
    },
    {
        id: "rm-7",
        name: "Rum Montilla Carta Ouro",
        volume: "1L",
        price: 36.90,
        category: "gin-tequila",
    },
    {
        id: "rm-8",
        name: "Steinhaeger Doble W",
        volume: "900ml",
        price: 52.90,
        category: "gin-tequila",
    },

    // === LICORES E APERITIVOS ===
    {
        id: "lc-1",
        name: "Aperitivo Aperol Spritz",
        volume: "750ml",
        price: 64.50,
        category: "licores",
    },
    {
        id: "lc-2",
        name: "Licor 43 Cuarenta y Tres",
        volume: "700ml",
        price: 169.90,
        category: "licores",
    },
    {
        id: "lc-3",
        name: "Licor 43 Chocolate Edition",
        volume: "700ml",
        price: 180.00,
        category: "licores",
    },
    {
        id: "lc-4",
        name: "Licor Amarula Cream",
        volume: "750ml",
        price: 99.90,
        category: "licores",
    },
    {
        id: "lc-5",
        name: "Licor Amaretto Dell Orso",
        volume: "700ml",
        price: 99.80,
        category: "licores",
    },
    {
        id: "lc-6",
        name: "Licor Don Luiz Doce de Leite",
        volume: "750ml",
        price: 89.90,
        category: "licores",
    },
    {
        id: "lc-7",
        name: "Licor Cointreau Liqueur",
        volume: "700ml",
        price: 169.90,
        category: "licores",
    },
    {
        id: "lc-8",
        name: "Licor Jagermeister Herb",
        volume: "700ml",
        price: 159.90,
        category: "licores",
    },
    {
        id: "lc-9",
        name: "Licor Stock (Todos os Sabores)",
        volume: "700ml",
        price: 59.90,
        category: "licores",
    },

    // === CACHAÇA E CONHAQUE ===
    {
        id: "cc-1",
        name: "Cachaça 51 Pirassununga",
        volume: "965ml",
        price: 18.90,
        category: "cachaca-conhaque",
    },
    {
        id: "cc-2",
        name: "Cachaça Velho Barreiro",
        volume: "910ml",
        price: 17.49,
        category: "cachaca-conhaque",
    },
    {
        id: "cc-3",
        name: "Cachaça Ypióca Brasilizar Ouro",
        volume: "965ml",
        price: 32.50,
        category: "cachaca-conhaque",
    },
    {
        id: "cc-4",
        name: "Cachaça Ypióca Brasilizar Prata",
        volume: "965ml",
        price: 32.50,
        category: "cachaca-conhaque",
    },
    {
        id: "cc-5",
        name: "Cachaça Casa Bucco Artesanal",
        volume: "750ml",
        price: 65.00,
        category: "cachaca-conhaque",
    },
    {
        id: "cc-6",
        name: "Conhaque Domecq",
        volume: "1L",
        price: 55.00,
        category: "cachaca-conhaque",
    },
    {
        id: "cc-7",
        name: "Conhaque Dreher",
        volume: "900ml",
        price: 30.00,
        category: "cachaca-conhaque",
    },
    {
        id: "cc-8",
        name: "Conhaque Presidente",
        volume: "900ml",
        price: 20.00,
        category: "cachaca-conhaque",
    },
    {
        id: "cv-1",
        name: "Cerveja Norteña Garrafa",
        volume: "960ml",
        price: 28.00,
        category: "cachaca-conhaque",
    },
    {
        id: "cv-2",
        name: "Cerveja Norteña Latão",
        volume: "473ml",
        price: 8.90,
        category: "cachaca-conhaque",
    },
    {
        id: "cv-3",
        name: "Cerveja Patricia Garrafa",
        volume: "960ml",
        price: 23.50,
        category: "cachaca-conhaque",
    },
    {
        id: "cv-4",
        name: "Cerveja Patricia Latão",
        volume: "473ml",
        price: 6.90,
        category: "cachaca-conhaque",
    },
    {
        id: "cv-5",
        name: "Cerveja Pilsen Garrafa",
        volume: "960ml",
        price: 23.50,
        category: "cachaca-conhaque",
    },
    {
        id: "cv-6",
        name: "Cerveja Zillertal Garrafa",
        volume: "970ml",
        price: 30.00,
        category: "cachaca-conhaque",
    },
    {
        id: "cv-7",
        name: "Cerveja Zillertal Latão",
        volume: "473ml",
        price: 8.90,
        category: "cachaca-conhaque",
    },
    {
        id: "es-1",
        name: "Espumante Salton Brut",
        volume: "750ml",
        price: 35.90,
        category: "cachaca-conhaque",
    },
    {
        id: "es-2",
        name: "Espumante Salton Series (Todas Variedades)",
        volume: "750ml",
        price: 23.50,
        category: "cachaca-conhaque",
    },

    // === VERMOUTH E BITTER ===
    {
        id: "vb-1",
        name: "Brasilberg Original Aperitivo",
        volume: "920ml",
        price: 66.90,
        category: "vermouth-bitter",
    },
    {
        id: "vb-2",
        name: "Bitter Campari Red",
        volume: "998ml",
        price: 69.90,
        category: "vermouth-bitter",
    },
    {
        id: "vb-3",
        name: "Vermouth Martini Bianco",
        volume: "750ml",
        price: 50.00,
        category: "vermouth-bitter",
    },
    {
        id: "vb-4",
        name: "Vermouth Martini Extra Dry",
        volume: "750ml",
        price: 50.00,
        category: "vermouth-bitter",
    },
    {
        id: "vb-5",
        name: "Vermouth Martini Rosato",
        volume: "750ml",
        price: 50.00,
        category: "vermouth-bitter",
    },
    {
        id: "vb-6",
        name: "Vermouth Martini Rosso",
        volume: "750ml",
        price: 50.00,
        category: "vermouth-bitter",
    },

    // === ENERGÉTICOS E ICE ===
    {
        id: "en-1",
        name: "Energético Baly Tradicional",
        volume: "2L",
        price: 11.90,
        category: "energeticos",
    },
    {
        id: "en-2",
        name: "Energético Baly Frutas Tropicais",
        volume: "2L",
        price: 11.90,
        category: "energeticos",
    },
    {
        id: "en-3",
        name: "Energético Baly Maçã Verde",
        volume: "2L",
        price: 11.90,
        category: "energeticos",
    },
    {
        id: "en-4",
        name: "Energético Baly Melancia",
        volume: "2L",
        price: 11.90,
        category: "energeticos",
    },
    {
        id: "en-5",
        name: "Energético Baly Morango e Pêssego",
        volume: "2L",
        price: 11.90,
        category: "energeticos",
    },
    {
        id: "en-6",
        name: "Energético Red Bull Energy Drink",
        volume: "250ml",
        price: 9.49,
        category: "energeticos",
    },
    {
        id: "en-7",
        name: "Energético Red Bull Tropical Edition",
        volume: "250ml",
        price: 11.49,
        category: "energeticos",
    },

    // === XAROPES E OUTROS ===
    {
        id: "xr-1",
        name: "Xarope Formula (Todos os Sabores)",
        volume: "750ml",
        price: 45.00,
        category: "xaropes",
    },
    {
        id: "xr-2",
        name: "Xarope Monin (Todos os Sabores)",
        volume: "700ml",
        price: 11.90,
        category: "xaropes",
    }
];

// Wholesale vs Retail calculation helpers
function getBoxSize(item) {
    if (item.boxSize) return item.boxSize;
    if (item.category === 'energeticos' || item.category === 'xaropes') return 12;
    if (item.category === 'cachaca-conhaque' && item.volume && item.volume.includes('Lata')) return 24;
    if (item.category === 'licores' || item.id === 'wh-11' || item.id === 'wh-4') return 6;
    return 12;
}

function getBoxUnitPrice(item) {
    const discount = item.boxDiscount || 0.08; // 8% OFF na caixa fechada
    return Math.round((item.price * (1 - discount)) * 100) / 100;
}

function getBoxTotalPrice(item) {
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

// Google Sheets Live Data Source ID
const MONTE_CRISTO_SHEET_ID = '1VNZ0aC7kO7nodGcG0m5-rs33FdxzvmOyqprZNQgP3yQ';
const MONTE_CRISTO_SHEET_URL = `https://docs.google.com/spreadsheets/d/${MONTE_CRISTO_SHEET_ID}/gviz/tq?tqx=out:csv`;

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

function parseAndApplyCsvPrices(csvText) {
    if (!csvText || typeof csvText !== 'string') return;
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length <= 1) return;

    const header = lines[0];
    const delimiter = header.includes(';') ? ';' : ',';
    const headerCols = header.split(delimiter).map(c => c.trim().replace(/^"|"$/g, '').toUpperCase());

    const idIdx = headerCols.findIndex(c => c === 'ID' || c.includes('ID') || c === 'SKU');
    const priceIdx = headerCols.findIndex(c => c.includes('PRECO') || c.includes('VALOR') || c.includes('VAREJO'));
    const statusIdx = headerCols.findIndex(c => c.includes('STATUS') || c.includes('ESTOQUE') || c.includes('DISPONIVEL'));

    let updatedCount = 0;
    const remoteOverrides = {};

    for (let i = 1; i < lines.length; i++) {
        const rawLine = lines[i];
        let cols = [];
        if (delimiter === ';') {
            cols = rawLine.split(';').map(c => c.trim().replace(/^"|"$/g, ''));
        } else {
            cols = rawLine.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || rawLine.split(',');
            cols = cols.map(c => c.trim().replace(/^"|"$/g, ''));
        }

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
    const urlsToTry = customUrl 
        ? [customUrl] 
        : [
            `https://docs.google.com/spreadsheets/d/${MONTE_CRISTO_SHEET_ID}/gviz/tq?tqx=out:csv`,
            `https://docs.google.com/spreadsheets/d/${MONTE_CRISTO_SHEET_ID}/export?format=csv&gid=0`
          ];

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

    // 2. Consulta em segundo plano no Google Sheets (Stale-While-Revalidate)
    for (const targetUrl of urlsToTry) {
        try {
            const response = await fetch(targetUrl);
            if (response.ok) {
                const csvText = await response.text();
                if (csvText && (csvText.includes('ID') || csvText.includes('wh-') || csvText.includes('vk-') || csvText.includes('PRODUTO'))) {
                    parseAndApplyCsvPrices(csvText);
                    applyPriceOverrides();
                    renderProducts();
                    updateCartUI();
                    break;
                }
            }
        } catch(err) {
            // Tentará próxima URL
        }
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

// Official Monte Cristo WhatsApp (Ivan default)
const CLIENT_WHATSAPP = '5554999692859'; 

// Init App
document.addEventListener('DOMContentLoaded', () => {
    applyPriceOverrides();
    renderProducts();
    updateSimulationBanner();
    setupEventListeners();
    setupCartDrawerListeners();
    setupOniraCta();
    updateCartUI();
    syncPricesFromGoogleSheet();
});


// Real-time synchronization across multiple tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'monte_cristo_price_overrides') {
        applyPriceOverrides();
        renderProducts();
        updateSimulationBanner();
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
        const matchesCategory = (activeCategory === 'all') || (activeCategory === 'com-foto') || (item.category === activeCategory);
        const matchesPhoto = (activeCategory !== 'com-foto') || hasPhoto(item);
        const matchesSearch = item.name.toLowerCase().includes(searchQuery) || item.volume.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesPhoto && matchesSearch;
    })
        /* Foto na frente. A vitrine abre pelo que tem imagem de verdade; o que
           ainda usa a garrafa vetorial vem depois, na ordem original do
           catálogo. Ordenacao estavel, entao dentro de cada grupo nada muda. */
        .sort((a, b) => (hasPhoto(b) ? 1 : 0) - (hasPhoto(a) ? 1 : 0));

    const countEl = document.getElementById('results-count');
    if (countEl) {
        const comFoto = filtered.filter(hasPhoto).length;
        const base = filtered.length === 1 ? '1 rótulo' : `${filtered.length} rótulos`;
        countEl.textContent = comFoto && comFoto < filtered.length
            ? `${base} · ${comFoto} com foto`
            : base;
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
        grid.innerHTML = filtered.map(item => {
            const bSize = getBoxSize(item);
            const bUnitPrice = getBoxUnitPrice(item);
            const bTotalPrice = getBoxTotalPrice(item);
            const currentUnit = cardUnits[item.id] || 'unit';
            const isBox = currentUnit === 'box';
            const isAvailable = item.active !== false;

            return `
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
            `;
        }).join('');
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

Solicitação de Reserva Comercial · Atacado & Varejo

`;

    cart.forEach(item => {
        if (item.unitType === 'box') {
            msg += `*${item.quantity}x* Caixa Fechada (${item.boxSize} un) · ${item.name} (${item.volume})
`;
            msg += `+ R$ ${formatMoney(item.unitPrice)}/un (Preço Atacado)
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
    msg += `*Itens: R$ ${formatMoney(subtotalVal)}*
`;
    msg += `Entrega: Em até 48h (raio 200km)
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
_Enviado pelo site da Monte Cristo Bebidas_`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${CLIENT_WHATSAPP}?text=${encoded}`;
    window.open(url, '_blank');
};

/* Convite da Onira (Floating Proposal Widget):
   Comportamento inteligente: esmaece ao rolar para baixo e esconde automaticamente quando o carrinho estiver aberto. */
function setupOniraCta() {
    const cta = document.getElementById('onira-cta');
    const fechar = document.getElementById('onira-cta-close');
    if (!cta) return;

    if (fechar) {
        fechar.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            cta.style.display = 'none';
            sessionStorage.setItem('monte_cristo_cta_dispensado', 'true');
        });
    }

    if (sessionStorage.getItem('monte_cristo_cta_dispensado') === 'true') {
        return;
    }

    let mostrado = false;
    let lastScrollY = window.scrollY;
    let scrollTimer = null;

    function mostrarCTA() {
        if (!mostrado) {
            mostrado = true;
            cta.style.display = 'flex';
            if (window.lucide) lucide.createIcons();
        }
    }

    function handleSmartScroll() {
        if (window.scrollY > 50 && !mostrado) {
            mostrarCTA();
        }

        if (!mostrado) return;

        const cartDrawer = document.getElementById('cart-drawer');
        const isCartOpen = cartDrawer && (cartDrawer.classList.contains('active') || cartDrawer.classList.contains('open'));

        // Se o carrinho estiver aberto, esconde o widget para nao sobrepor botoes
        if (isCartOpen) {
            cta.style.opacity = '0';
            cta.style.pointerEvents = 'none';
            cta.style.transform = 'translateY(20px) scale(0.9)';
            return;
        }

        // Se estiver rolando para baixo, esmaece suavemente para nao atrapalhar
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
            cta.style.opacity = '0.35';
            cta.style.transform = 'translateY(8px) scale(0.95)';
        } else {
            cta.style.opacity = '1';
            cta.style.pointerEvents = 'auto';
            cta.style.transform = 'translateY(0) scale(1)';
        }
        lastScrollY = currentScrollY;

        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            if (!isCartOpen) {
                cta.style.opacity = '1';
                cta.style.pointerEvents = 'auto';
                cta.style.transform = 'translateY(0) scale(1)';
            }
        }, 600);
    }

    window.addEventListener('scroll', handleSmartScroll, { passive: true });
    setTimeout(mostrarCTA, 1200);
}

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
