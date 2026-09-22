import json
import re
import unicodedata

def normalize_text(text):
    text = unicodedata.normalize('NFKD', text).encode('ASCII', 'ignore').decode('ASCII')
    return text.upper().strip()

def format_title(name):
    # Keep brand names and volumes neat
    name = re.sub(r'\s+', ' ', name).strip()
    words = name.split(' ')
    fixed_words = []
    for w in words:
        w_up = w.upper()
        if w_up in ['ML', 'L', 'LT', 'LATA', 'LATAO', '2L', '1L', '750ML', '960ML', '998ML', '900ML', '910ML', '920ML', '950ML', '965ML', '970ML', '980ML', '700ML', '250ML', 'CNPJ']:
            fixed_words.append(w_up)
        elif w_up in ['DE', 'DO', 'DA', 'DOS', 'DAS', 'E']:
            fixed_words.append(w.lower())
        else:
            fixed_words.append(w.capitalize())
    res = ' '.join(fixed_words)
    # Fix brand casing
    replacements = {
        "Jack Daniels": "Jack Daniel's",
        "Johnnie Walker": "Johnnie Walker",
        "Red Bull": "Red Bull",
        "Grey Goose": "Grey Goose",
        "Jose Cuervo": "Jose Cuervo",
        "Ballantines": "Ballantine's",
        "Jagermeister": "Jägermeister",
        "Licor 43": "Licor 43",
        "Nortena": "Norteña",
        "Cachaca": "Cachaça",
        "Maca": "Maçã",
        "Pessego": "Pêssego",
        "Latao": "Latão",
        "Limon": "Limón",
        "Formula": "Fórmula",
        "Cafe": "Café",
        "Roma": "Romã",
        "Cravo": "Cravo",
        "Gengibre": "Gengibre",
        "Gemgibre": "Gengibre",
        "Crambery": "Cranberry",
        "Stramberry": "Strawberry",
        "Bucco": "Bucco"
    }
    for k, v in replacements.items():
        res = re.sub(r'\b' + re.escape(k) + r'\b', v, res, flags=re.IGNORECASE)
    return res

with open('tabela_extraida.json', 'r', encoding='utf-8') as f:
    rows = json.load(f)

cat_rules = [
    ('APERITIVOS', 'licores', 'Licor & Aperitivo'),
    ('CACHACA', 'cachaca-conhaque', 'Cachaça & Conhaque'),
    ('CERVEJAS IMPORTADAS', 'cachaca-conhaque', 'Cervejas & Outros'),
    ('CONHAQUES', 'cachaca-conhaque', 'Cachaça & Conhaque'),
    ('ENERGETIC', 'energeticos', 'Energéticos'),
    ('GINS', 'gin-tequila', 'Gin, Tequila & Rum'),
    ('LICORES', 'licores', 'Licor & Aperitivo'),
    ('RUNS', 'gin-tequila', 'Gin, Tequila & Rum'),
    ('STEINHAEGER', 'gin-tequila', 'Gin, Tequila & Rum'),
    ('TEQUILA', 'gin-tequila', 'Gin, Tequila & Rum'),
    ('VERMOUTH', 'vermouth-bitter', 'Vermouth & Bitter'),
    ('VODKAS', 'vodka', 'Vodka'),
    ('WHISKYS', 'whisky', 'Whisky'),
    ('XAROPE', 'xaropes', 'Xaropes')
]

current_slug = 'outros'
current_cat_label = 'Outros'

products = []
item_idx = 1

for r in rows:
    col0 = r[0].strip() if len(r) > 0 else ''
    col1 = r[1].strip() if len(r) > 1 else ''
    col2 = r[2].strip() if len(r) > 2 else ''
    col3 = r[3].strip() if len(r) > 3 else ''

    if not col0 or 'TABELA VALIDA' in col0 or col0 == 'PRODUTO':
        continue

    norm0 = normalize_text(col0)
    
    # Check if category header
    matched = False
    if not col1.startswith('R$'):
        for pattern, slug, label in cat_rules:
            if pattern in norm0:
                current_slug = slug
                current_cat_label = label
                matched = True
                break
        if matched:
            continue

    if col1.startswith('R$'):
        price = float(col1.replace('R$', '').strip().replace('.', '').replace(',', '.'))
        qty_box = int(col2) if col2.isdigit() else 1
        box_total = 0.0
        if col3.startswith('R$'):
            box_total = float(col3.replace('R$', '').strip().replace('.', '').replace(',', '.'))

        # Volume extract
        vol_match = re.search(r'(\d+[\.,]?\d*\s*(?:ML|L|LT|LATA|LATÃO))', col0, re.IGNORECASE)
        volume = vol_match.group(1).upper() if vol_match else '1L'

        prefix_map = {
            'whisky': 'wh',
            'vodka': 'vk',
            'gin-tequila': 'gt',
            'licores': 'lc',
            'cachaca-conhaque': 'cc',
            'vermouth-bitter': 'vb',
            'energeticos': 'en',
            'xaropes': 'xr'
        }
        prefix = prefix_map.get(current_slug, 'mc')
        pid = f"{prefix}-{item_idx}"
        item_idx += 1

        formatted_name = format_title(col0)

        products.append({
            'id': pid,
            'name': formatted_name,
            'volume': volume,
            'price': price,
            'category': current_slug,
            'boxQty': qty_box,
            'boxTotal': box_total,
            'active': True
        })

print(f"Total processed products: {len(products)}")
cat_counts = {}
for p in products:
    cat_counts[p['category']] = cat_counts.get(p['category'], 0) + 1
for k, v in sorted(cat_counts.items()):
    print(f"  Category '{k}': {v} items")

with open('dados/catalogo_completo_2026.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Saved to dados/catalogo_completo_2026.json")
