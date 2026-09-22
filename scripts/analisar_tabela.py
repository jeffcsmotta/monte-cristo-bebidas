import json
import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract items from app.js
pattern = re.compile(r'id:\s*["\']([^"\']+)["\'],\s*name:\s*["\']([^"\']+)["\'],\s*volume:\s*["\']([^"\']+)["\'],\s*price:\s*([0-9.]+),\s*category:\s*["\']([^"\']+)["\']')
matches = pattern.findall(content)
print(f"app.js parsed {len(matches)} items via regex.")

with open('itens_processados.json', 'r', encoding='utf-8') as f:
    docx_items = json.load(f)

print(f"docx has {len(docx_items)} items.")

# Print categories count in docx
cats = {}
for it in docx_items:
    c = it['category']
    cats[c] = cats.get(c, 0) + 1
print("Categories distribution in docx:")
for k, v in sorted(cats.items()):
    print(f"  {k}: {v}")
