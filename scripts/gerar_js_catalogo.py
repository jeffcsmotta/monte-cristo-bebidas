import json

with open('dados/catalogo_completo_2026.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

js_lines = ["const BASE_PRODUCTS_DATA = ["]

for p in products:
    js_lines.append("    {")
    js_lines.append(f'        id: "{p["id"]}",')
    js_lines.append(f'        name: "{p["name"]}",')
    js_lines.append(f'        volume: "{p["volume"]}",')
    js_lines.append(f'        price: {p["price"]:.2f},')
    js_lines.append(f'        category: "{p["category"]}",')
    js_lines.append(f'        boxQty: {p["boxQty"]},')
    js_lines.append(f'        boxTotal: {p["boxTotal"]:.2f},')
    js_lines.append(f'        active: {str(p.get("active", True)).lower()}')
    js_lines.append("    },")

js_lines.append("];")
js_lines.append("")
js_lines.append("// PRODUCTS_DATA dinâmico que integra itens base + itens customizados via Admin")
js_lines.append("let PRODUCTS_DATA = [...BASE_PRODUCTS_DATA];")

output_js = "\n".join(js_lines)
with open('dados/base_products_data.js', 'w', encoding='utf-8') as f:
    f.write(output_js)

print("Generated dados/base_products_data.js with", len(products), "products.")
