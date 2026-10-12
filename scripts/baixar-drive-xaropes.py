"""
Processa e baixa os Xaropes Fórmula do Google Drive da Monte Cristo,
converte para WebP 800x800 com fundo branco limpo e salva em assets/produtos/.
"""
import io
import os
import urllib.request
from PIL import Image

ITEMS = [
    {
        "id": "xr-89",
        "file": "xarope-formula-morango-1l.webp",
        "drive_id": "1SGpXJcwDRHhax-gFbPy5Ign8DkO_jrmc",
        "name": "Xarope Fórmula Morango"
    },
    {
        "id": "xr-90",
        "file": "xarope-formula-chocolate-1l.webp",
        "drive_id": "1sO3P52XMA17NPnGZlKQdKfIQJ7Talua-",
        "name": "Xarope Fórmula Chocolate"
    },
    {
        "id": "xr-91",
        "file": "xarope-formula-cranberry-1l.webp",
        "drive_id": "1tIOqNpPh1zwQ8O-OhehGILbDp5DfXK4_",
        "name": "Xarope Fórmula Cranberry"
    },
    {
        "id": "xr-92",
        "file": "xarope-formula-grenadine-1l.webp",
        "drive_id": "1QEyYZNvF3XG5MoPkmDUN7eL7L_sBRiqZ",
        "name": "Xarope Fórmula Grenadine"
    },
    {
        "id": "xr-93",
        "file": "xarope-formula-gengibre-1l.webp",
        "drive_id": "1elejWP9In5h_M46aQ7Tt_LLbHsZeYgI8",
        "name": "Xarope Fórmula Gengibre"
    },
    {
        "id": "xr-94",
        "file": "xarope-formula-maca-verde-1l.webp",
        "drive_id": "18G6wCsjNKG1pKSclAWQ8D_p__vyTiGgE",
        "name": "Xarope Fórmula Maça Verde"
    },
    {
        "id": "xr-95",
        "file": "xarope-formula-pessego-1l.webp",
        "drive_id": "1Fhf8SE9a_1hnaJvJrQK6Ib8Ur6OPzCE8",
        "name": "Xarope Fórmula Pêssego"
    },
    {
        "id": "xr-96",
        "file": "xarope-formula-tangerina-1l.webp",
        "drive_id": "1mQ_cw4tM63eXPJ59ZCZivOcZWkMoFbyQ",
        "name": "Xarope Fórmula Tangerina"
    },
    {
        "id": "xr-97",
        "file": "xarope-formula-limao-siciliano-1l.webp",
        "drive_id": "12BlZpZmRUZEeUUtvG8SEfBMkmYCik_N-",
        "name": "Xarope Fórmula Limão Siciliano"
    }
]

def process_item(item):
    url = f"https://lh3.googleusercontent.com/d/{item['drive_id']}"
    print(f"Baixando {item['name']} ({item['file']})...")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()

    img = Image.open(io.BytesIO(data))
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # Bounding box transparente
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    target_size = 800
    padding = 40
    avail_w = target_size - (padding * 2)
    avail_h = target_size - (padding * 2)

    w, h = img.size
    ratio = min(avail_w / w, avail_h / h)
    new_w = max(1, int(w * ratio))
    new_h = max(1, int(h * ratio))

    resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Cria fundo branco 800x800
    canvas = Image.new("RGB", (target_size, target_size), (255, 255, 255))
    offset_x = (target_size - new_w) // 2
    offset_y = (target_size - new_h) // 2

    canvas.paste(resized, (offset_x, offset_y), mask=resized.split()[3])

    out_path = os.path.join("assets", "produtos", item["file"])
    canvas.save(out_path, format="WEBP", quality=90, method=6)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"  -> Salvo com sucesso em {out_path} ({size_kb:.1f} KB)")

def main():
    os.makedirs(os.path.join("assets", "produtos"), exist_ok=True)
    for it in ITEMS:
        try:
            process_item(it)
        except Exception as e:
            print(f"Erro ao processar {it['name']}: {e}")

if __name__ == "__main__":
    main()
