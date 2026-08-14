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

// App State
let cart = JSON.parse(localStorage.getItem('monte_cristo_cart')) || [];
let activeCategory = 'all';
let searchQuery = '';
let orderType = 'entrega'; // 'entrega' or 'retirada'

/* Taxa fixa de entrega em Caxias. Retirada no balcao nao paga.
   Um lugar so: resumo do carrinho, valor do Pix, QR e mensagem do WhatsApp
   leem daqui, entao nao ha como um deles ficar para tras. */
const DELIVERY_FEE = 10.00;
function deliveryFeeFor(tipo) {
    return tipo === 'entrega' ? DELIVERY_FEE : 0;
}
let paymentMethod = 'Pix'; // 'Pix' | 'Cartão' | 'Dinheiro'
let viewMode = 'cards'; // 'cards' or 'table'

// Expose PRODUCTS_DATA globally for external table pages
window.PRODUCTS_DATA = PRODUCTS_DATA;

// Official Monte Cristo WhatsApp (Ivan default)
const CLIENT_WHATSAPP = '5554999692859'; 

// Init App
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
    setupCartDrawerListeners();
    updateCartUI();
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
                            <th>Bebida / Rótulo</th>
                            <th>Categoria</th>
                            <th>Embalagem</th>
                            <th>Preço Tabela PDF</th>
                            <th style="text-align:right;">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filtered.map(item => {
                            const cartItem = cart.find(c => c.id === item.id);
                            const qtyInCart = cartItem ? cartItem.quantity : 0;
                            return `
                                <tr>
                                    <td>
                                        <div class="table-thumb">${productThumb(item, 'table-img')}</div>
                                    </td>
                                    <td>
                                        <div class="table-name">${item.name}</div>
                                    </td>
                                    <td>
                                        <span class="product-category-badge" style="position:static;">${getCategoryName(item.category)}</span>
                                    </td>
                                    <td>
                                        <span class="table-volume">${item.volume}</span>
                                    </td>
                                    <td>
                                        <span class="table-price">R$ ${formatMoney(item.price)}</span>
                                    </td>
                                    <td style="text-align:right;">
                                        ${qtyInCart > 0 ? `
                                            <div class="card-qty-control" style="display:inline-flex;">
                                                <button class="card-qty-btn" onclick="updateQuantity('${item.id}', ${qtyInCart - 1})">-</button>
                                                <span class="card-qty-val">${qtyInCart}</span>
                                                <button class="card-qty-btn" onclick="updateQuantity('${item.id}', ${qtyInCart + 1})">+</button>
                                            </div>
                                        ` : `
                                            <button class="btn-add-card" onclick="addToCart('${item.id}')">
                                                <i data-lucide="plus" style="width:14px; height:14px;"></i> Adicionar
                                            </button>
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
            const cartItem = cart.find(c => c.id === item.id);
            const qtyInCart = cartItem ? cartItem.quantity : 0;

            return `
                <div class="product-card" data-id="${item.id}">
                    <div class="product-image-box">
                        <span class="product-category-badge">${getCategoryName(item.category)}</span>
                        ${productThumb(item)}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${item.name}</h3>
                        <div class="product-volume-strip">
                            <i data-lucide="package" style="width:14px; height:14px; color:var(--teal);"></i>
                            <span>Embalagem: <strong>${item.volume}</strong></span>
                        </div>
                        <div class="product-price-row">
                            <div class="product-price">
                                <span class="price-label">Preço</span>
                                <span class="price-amount">R$ ${formatMoney(item.price)}</span>
                            </div>
                            ${qtyInCart > 0 ? `
                                <div class="card-qty-control">
                                    <button class="card-qty-btn" onclick="updateQuantity('${item.id}', ${qtyInCart - 1})">-</button>
                                    <span class="card-qty-val">${qtyInCart}</span>
                                    <button class="card-qty-btn" onclick="updateQuantity('${item.id}', ${qtyInCart + 1})">+</button>
                                </div>
                            ` : `
                                <button class="btn-add-card" onclick="addToCart('${item.id}')">
                                    <i data-lucide="plus" style="width:15px; height:15px;"></i> Adicionar
                                </button>
                            `}
                        </div>
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

// Cart Functions
function addToCart(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(c => c.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    renderProducts();
    showToast(`✓ ${product.name} adicionado ao pedido!`);
}

function updateQuantity(productId, newQty) {
    if (newQty <= 0) {
        cart = cart.filter(c => c.id !== productId);
    } else {
        const item = cart.find(c => c.id === productId);
        if (item) item.quantity = newQty;
    }

    saveCart();
    updateCartUI();
    renderProducts();
}

function saveCart() {
    localStorage.setItem('monte_cristo_cart', JSON.stringify(cart));
}

/* Esvazia o pedido inteiro. A confirmacao e uma caixa do proprio site, nao o
   confirm() do navegador: precisa dizer quantas bebidas e quanto dinheiro
   estao em jogo antes de apagar. O carrinho vive no localStorage e sobrevive
   a fechar o navegador, entao nao existe desfazer. */
window.clearCart = function() {
    if (cart.length === 0) return;

    const itens = cart.reduce((soma, item) => soma + item.quantity, 0);
    const valor = cart.reduce((soma, item) => soma + (item.price * item.quantity), 0);

    const overlay = document.getElementById('confirm-clear');
    const texto = document.getElementById('confirm-clear-text');

    // Sem a caixa no HTML, ainda assim nao apaga nada em silencio
    if (!overlay || !texto) {
        if (confirm(`Remover ${itens} ${itens === 1 ? 'bebida' : 'bebidas'} do pedido?`)) aplicarLimpeza();
        return;
    }

    texto.innerHTML = itens === 1
        ? `Você vai remover <strong>1 bebida</strong>, no valor de <strong>R$ ${formatMoney(valor)}</strong>.`
        : `Você vai remover <strong>${itens} bebidas</strong>, no valor de <strong>R$ ${formatMoney(valor)}</strong>.`;

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
        if (e.target === overlay) fechar();   // clique no escuro cancela
    }

    sim.onclick = () => { fechar(); aplicarLimpeza(); };
    nao.onclick = fechar;
    document.addEventListener('keydown', aoTeclar);
    overlay.addEventListener('click', aoClicarFora);

    overlay.hidden = false;
    if (window.lucide) lucide.createIcons();
    nao.focus();   // o foco comeca no caminho seguro
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

    // Sem itens não há o que limpar
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
                        <div class="cart-item-unit">R$ ${formatMoney(item.price)} un.</div>
                        <div class="cart-item-price">Total: R$ ${formatMoney(item.price * item.quantity)}</div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="cart-controls">
                            <button type="button" class="cart-qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})" aria-label="Diminuir quantidade">-</button>
                            <span class="cart-qty-num">${item.quantity} un</span>
                            <button type="button" class="cart-qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})" aria-label="Aumentar quantidade">+</button>
                        </div>
                        <button type="button" class="btn-remove-item" onclick="updateQuantity('${item.id}', 0)" aria-label="Remover item">
                            <i data-lucide="trash-2" style="width:16px; height:16px;"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    // Modalidade e valor do Pix acompanham o pedido
    const deliveryFee = deliveryFeeFor(orderType);
    const orderTotal = subtotal + deliveryFee;

    const deliveryFeeEl = document.getElementById('cart-delivery-fee');
    if (deliveryFeeEl) {
        deliveryFeeEl.textContent = deliveryFee > 0
            ? `R$ ${formatMoney(deliveryFee)}`
            : 'Grátis (Balcão)';
    }

    // O total do pedido inclui a entrega; o subtotal segue sendo só as bebidas
    if (cartTotalEl) cartTotalEl.textContent = `R$ ${formatMoney(orderTotal)}`;

    const pixAmount = document.getElementById('pix-locked-amount');
    if (pixAmount) pixAmount.textContent = `R$ ${formatMoney(orderTotal)}`;

    const pixQrImg = document.getElementById('pix-qr-img');
    if (pixQrImg) {
        const qrData = encodeURIComponent(`Chave Pix Monte Cristo: 54999692859 | Valor: R$ ${formatMoney(orderTotal)}`);
        pixQrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${qrData}`;
    }

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

// Alternadores de entrega e pagamento (padrão CLAEM)
function setupCartDrawerListeners() {
    document.querySelectorAll('.del-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.del-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            orderType = btn.dataset.type || 'entrega';

            const addressBox = document.getElementById('address-box');
            const addressInput = document.getElementById('input-address');
            if (addressBox) {
                // Na retirada o nome continua sendo pedido; só o endereço sai de cena.
                addressBox.querySelector('label').textContent = orderType === 'entrega'
                    ? 'Seus Dados para Entrega:'
                    : 'Seus Dados para Retirada:';
            }
            if (addressInput) addressInput.style.display = orderType === 'entrega' ? 'block' : 'none';
            updateCartUI();
        });
    });

    document.querySelectorAll('.pay-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            paymentMethod = btn.dataset.pay || 'Pix';

            const cashBox = document.getElementById('cash-change-box');
            const pixBox = document.getElementById('pix-lock-box');
            if (cashBox) cashBox.style.display = paymentMethod === 'Dinheiro' ? 'block' : 'none';
            if (pixBox) pixBox.style.display = paymentMethod === 'Pix' ? 'block' : 'none';
        });
    });
}

// Copy Pix Key
window.copyPixKey = function() {
    const pixKey = "54999692859"; // Official phone key
    navigator.clipboard.writeText(pixKey).then(() => {
        const btn = document.getElementById('btn-copy-pix-key');
        if (btn) {
            btn.classList.add('copied');
            btn.innerHTML = `<i data-lucide="check"></i> ✓ Chave Pix Copiada!`;
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = `<i data-lucide="copy"></i> Copiar Chave Pix`;
                if (window.lucide) lucide.createIcons();
            }, 2500);
        }
        showToast("✓ Chave Pix copiada com sucesso!");
    });
};

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

    if (orderType === 'entrega' && !address) {
        showToast("⚠️ Por favor, informe o Endereço Completo de Entrega.");
        if (addressInput) addressInput.focus();
        return;
    }

    const cashChangeInput = document.getElementById('cash-change-val');
    const cashChange = cashChangeInput ? cashChangeInput.value.trim() : '';

    let msg = `*NOVO PEDIDO DE BEBIDAS — MONTE CRISTO*\n`;
    msg += `------------------------------------\n`;
    msg += `👤 *Cliente/Estabelecimento:* ${clientName}\n`;
    msg += `📍 *Modalidade:* ${orderType === 'entrega' ? 'Entrega / Delivery' : 'Retirada no Balcão'}\n`;
    if (orderType === 'entrega') {
        msg += `🏠 *Endereço:* ${address}\n`;
    }
    msg += `------------------------------------\n`;
    msg += `🍷 *ITENS DO PEDIDO (Tabela 2026):*\n`;

    cart.forEach(item => {
        msg += `• *${item.quantity}x* ${item.name} (${item.volume}) — R$ ${formatMoney(item.price * item.quantity)}\n`;
    });

    const subtotalVal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryVal = deliveryFeeFor(orderType);
    const totalVal = subtotalVal + deliveryVal;
    msg += `------------------------------------\n`;
    msg += `💰 *Subtotal:* R$ ${formatMoney(subtotalVal)}\n`;
    msg += `🛵 *Entrega:* ${deliveryVal > 0 ? `R$ ${formatMoney(deliveryVal)}` : 'Retirada no balcão'}\n`;
    msg += `💰 *TOTAL:* R$ ${formatMoney(totalVal)}\n`;
    msg += `------------------------------------\n`;
    msg += `💳 *FORMA DE PAGAMENTO:*\n`;
    if (paymentMethod === 'Pix') {
        msg += `⚡ Pix — chave 54999692859 (Monte Cristo), valor R$ ${formatMoney(totalVal)}\n`;
    } else if (paymentMethod === 'Dinheiro') {
        msg += `💵 Dinheiro ${cashChange ? `(troco para ${cashChange})` : '(sem troco)'}\n`;
    } else {
        msg += `💳 Cartão de Crédito/Débito (levar maquininha)\n`;
    }
    msg += `------------------------------------\n`;
    msg += `_Pedido gerado via Catálogo Online Monte Cristo Bebidas_`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${CLIENT_WHATSAPP}?text=${encoded}`;
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
