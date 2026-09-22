import json
import re

with open('dados/catalogo_completo_2026.json', 'r', encoding='utf-8') as f:
    new_prods = json.load(f)

with open('app.js', 'r', encoding='utf-8') as f:
    app_content = f.read()

old_matches = re.findall(r'id:\s*["\']([^"\']+)["\'],\s*name:\s*["\']([^"\']+)["\']', app_content)
print(f"Total old items in app.js: {len(old_matches)}")

def clean_key(text):
    return re.sub(r'[^a-z0-9]', '', text.lower())

old_name_to_id = {clean_key(name): pid for pid, name in old_matches}

mapped_count = 0
used_ids = set()

for p in new_prods:
    ck = clean_key(p['name'])
    found_id = None
    if ck in old_name_to_id and old_name_to_id[ck] not in used_ids:
        found_id = old_name_to_id[ck]
    else:
        for ok, oid in old_name_to_id.items():
            if oid not in used_ids and len(ok) > 5 and (ok in ck or ck in ok):
                found_id = oid
                break
    if found_id:
        p['id'] = found_id
        used_ids.add(found_id)
        mapped_count += 1

# Ensure all IDs are unique
seen = set()
for p in new_prods:
    if p['id'] in seen:
        p['id'] = f"{p['id']}-alt"
    seen.add(p['id'])

print(f"Successfully mapped {mapped_count} IDs from existing catalog! Total items: {len(new_prods)}")

with open('dados/catalogo_completo_2026.json', 'w', encoding='utf-8') as f:
    json.dump(new_prods, f, ensure_ascii=False, indent=2)
