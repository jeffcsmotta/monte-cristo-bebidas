import json

with open('dados/base_products_data.js', 'r', encoding='utf-8') as f:
    base_products_js = f.read()

with open('app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

# Locate from line 1 to '// Wholesale vs Retail calculation helpers'
marker = '// Wholesale vs Retail calculation helpers'
idx = app_js.find(marker)
if idx == -1:
    raise Exception("Marker not found in app.js")

header = """/* ==========================================================================
   MONTE CRISTO BEBIDAS — APLICAÇÃO JS & CATÁLOGO COMPLETO OFICIAL 2026
   Tabela Vigente até 30/09/2026 • Canal de Distribuição Serra Gaúcha
   ========================================================================== */

"""

part2 = app_js[idx:]

# Update getBoxSize and getBoxUnitPrice in part2
old_box_funcs = """// Wholesale vs Retail calculation helpers
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
}"""

new_box_funcs = """// Wholesale vs Retail calculation helpers (Tabela Oficial Monte Cristo 2026)
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
    const discount = item.boxDiscount || 0.08; // 8% OFF na caixa fechada padrão
    return Math.round((item.price * (1 - discount)) * 100) / 100;
}

function getBoxTotalPrice(item) {
    if (item.boxTotal && item.boxTotal > 0) {
        return Math.round(item.boxTotal * 100) / 100;
    }
    const size = getBoxSize(item);
    const uPrice = getBoxUnitPrice(item);
    return Math.round(size * uPrice * 100) / 100;
}"""

if old_box_funcs in part2:
    part2 = part2.replace(old_box_funcs, new_box_funcs)
else:
    print("Warning: old_box_funcs exact match not found, keeping original or checking whitespace")

# WhatsApp Config & Rebuild logic injection
whatsapp_and_rebuild_code = """
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
"""

# Replace in part2 where PRODUCTS_DATA exposure happens
part2 = part2.replace("// Official Monte Cristo WhatsApp (Ivan default)\nconst CLIENT_WHATSAPP = '5554999692859';", whatsapp_and_rebuild_code)

# Replace DOMContentLoaded in part2 to call rebuildProductsData() first
part2 = part2.replace("""document.addEventListener('DOMContentLoaded', () => {
    applyPriceOverrides();""", """document.addEventListener('DOMContentLoaded', () => {
    rebuildProductsData();
    applyPriceOverrides();""")

# Replace storage listener in part2
old_storage = """window.addEventListener('storage', (e) => {
    if (e.key === 'monte_cristo_price_overrides') {
        applyPriceOverrides();
        renderProducts();
        updateSimulationBanner();
    }
});"""

new_storage = """window.addEventListener('storage', (e) => {
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
});"""

part2 = part2.replace(old_storage, new_storage)

# Replace url generation in sendWhatsAppOrder
old_wa_url = "const url = `https://wa.me/${CLIENT_WHATSAPP}?text=${encoded}`;"
new_wa_url = """const targetNumber = window.getActiveWhatsAppData ? window.getActiveWhatsAppData().number : CLIENT_WHATSAPP;
    const url = `https://wa.me/${targetNumber}?text=${encoded}`;"""
part2 = part2.replace(old_wa_url, new_wa_url)

full_new_app_js = header + base_products_js + "\n\n" + part2

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(full_new_app_js)

print("Updated app.js successfully!")
