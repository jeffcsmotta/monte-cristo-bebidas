/* ==========================================================================
   MONTE CRISTO BEBIDAS — ILUSTRAÇÕES VETORIAIS DE GARRAFA
   --------------------------------------------------------------------------
   Cada produto do catálogo tem um desenho SVG próprio, gerado em runtime a
   partir de um "spec" (formato da garrafa + cor do vidro + cor do líquido +
   cor do rótulo + cápsula). Nada de foto de banco de imagem: a garrafa é
   coerente com o rótulo real de cada item da tabela.

   Zero dependência externa — tudo é SVG inline.
   ========================================================================== */

/* --- Formatos de garrafa ------------------------------------------------- */
/* neckW  = largura do gargalo   | neckTop = topo do gargalo
   shY    = onde começa o ombro  | shH     = altura do ombro
   bodyW  = largura do corpo     | bottom  = base | r = raio da base
   sh     = perfil do ombro: square | round | slope                           */
const BOTTLE_SHAPES = {
    square: { neckW: 17, neckTop: 30, shY: 62, shH: 16, bodyW: 54, bottom: 176, r: 4, sh: 'square' },
    tall:   { neckW: 14, neckTop: 22, shY: 66, shH: 14, bodyW: 44, bottom: 176, r: 4, sh: 'round' },
    round:  { neckW: 15, neckTop: 26, shY: 68, shH: 20, bodyW: 50, bottom: 176, r: 7, sh: 'round' },
    beer:   { neckW: 12, neckTop: 18, shY: 82, shH: 16, bodyW: 40, bottom: 176, r: 4, sh: 'round' },
    champ:  { neckW: 14, neckTop: 16, shY: 64, shH: 30, bodyW: 46, bottom: 176, r: 5, sh: 'slope' },
    squat:  { neckW: 17, neckTop: 44, shY: 82, shH: 14, bodyW: 56, bottom: 176, r: 10, sh: 'round' },
    slim:   { neckW: 12, neckTop: 26, shY: 70, shH: 10, bodyW: 36, bottom: 176, r: 3, sh: 'square' },
    /* PET de 2L: gargalo curto, tampa de rosca larga, corpo cheio e canelado */
    pet:    { neckW: 16, neckTop: 36, shY: 62, shH: 20, bodyW: 54, bottom: 176, r: 14, sh: 'round', capH: 11, capExtra: 8, ribs: true },
    can:    { can: true }
};

/* Escala vertical por volume — uma lata de 250ml não pode ter o mesmo
   tamanho de uma garrafa de 1L no card. */
function volumeScale(volume) {
    const v = String(volume || '').toLowerCase().replace(',', '.');
    let ml;
    if (v.indexOf('l') > -1 && v.indexOf('ml') === -1) ml = parseFloat(v) * 1000;
    else ml = parseFloat(v);
    if (!ml || isNaN(ml)) return 1;
    if (ml <= 300) return 0.80;
    if (ml <= 500) return 0.86;
    if (ml <= 760) return 0.93;
    if (ml < 1000) return 0.97;
    if (ml <= 1000) return 1.00;
    return 1.04;
}

/* Vidro transparente padrão (vodka, gin, cachaça prata...) */
const GLASS_CLEAR = '#E7F1F6';
const GLASS_BROWN = '#7A4A1A';
const GLASS_GREEN = '#2F5C3E';

/* --- Mapa produto -> aparência da garrafa -------------------------------- */
const BOTTLE_MAP = {
    /* WHISKY */
    'wh-1':  { shape: 'square', liquid: '#B4232A', label: '#1A1D22', cap: '#1A1D22', tag: 'FIREBIRD' },
    'wh-2':  { shape: 'round',  liquid: '#B57A28', label: '#C9A227', cap: '#14161A', tag: "BALLANTINE'S" },
    'wh-3':  { shape: 'square', liquid: '#8A5A22', label: '#23262B', cap: '#23262B', tag: 'BLACK STONE' },
    'wh-4':  { shape: 'round',  liquid: '#B27B2A', label: '#1D3A6E', cap: '#C9A227', tag: 'CHIVAS 12' },
    'wh-5':  { shape: 'square', liquid: '#A9B23C', label: '#2E7D3A', cap: '#1A1D22', tag: 'JD APPLE' },
    'wh-6':  { shape: 'square', liquid: '#5A2A44', label: '#4A2B57', cap: '#1A1D22', tag: 'BLACKBERRI' },
    'wh-7':  { shape: 'square', liquid: '#A82A22', label: '#B4232A', cap: '#1A1D22', tag: 'JD FIRE' },
    'wh-8':  { shape: 'square', liquid: '#A6641F', label: '#14161A', cap: '#14161A', tag: 'OLD Nº 7' },
    'wh-9':  { shape: 'square', liquid: '#C9962B', label: '#C9962B', cap: '#1A1D22', tag: 'JD HONEY' },
    'wh-10': { shape: 'square', liquid: '#A6641F', label: '#B23A2B', cap: '#14161A', tag: 'JIM BEAM' },
    'wh-11': { shape: 'round',  liquid: '#7A4A1A', label: '#16181C', cap: '#C9A227', tag: 'J.W. BLACK' },
    'wh-12': { shape: 'round',  liquid: '#B5711F', label: '#C8102E', cap: '#14161A', tag: 'J.W. RED' },
    'wh-13': { shape: 'round',  liquid: '#A0691F', label: '#7A2E2E', cap: '#7A2E2E', tag: 'NATU NOBILIS' },
    'wh-14': { shape: 'round',  liquid: '#B5711F', label: '#2E6B3E', cap: '#2E6B3E', tag: 'PASSPORT' },
    'wh-15': { shape: 'round',  liquid: '#A6641F', label: '#B9C4C9', cap: '#8A2226', tag: 'WHITE HORSE' },

    /* VODKA */
    'vk-1': { shape: 'round', liquid: GLASS_CLEAR, label: '#1C4E76', cap: '#1C4E76', tag: 'ABSOLUT' },
    'vk-2': { shape: 'tall',  liquid: GLASS_CLEAR, label: '#1B2C55', cap: '#C9A227', tag: 'CÎROC' },
    'vk-3': { shape: 'tall',  liquid: GLASS_CLEAR, label: '#6E86A8', cap: '#1D3A6E', tag: 'GREY GOOSE' },
    'vk-4': { shape: 'tall',  liquid: GLASS_CLEAR, label: '#2E7D5B', cap: '#2E7D5B', tag: 'NATASHA' },
    'vk-5': { shape: 'tall',  liquid: GLASS_CLEAR, label: '#1C4E76', cap: '#1C4E76', tag: 'ORLOFF' },
    'vk-6': { shape: 'tall',  liquid: GLASS_CLEAR, label: '#7A2E5A', cap: '#7A2E5A', tag: 'RAJSKA' },
    'vk-7': { shape: 'tall',  liquid: '#BBD46A',   label: '#4E8B34', cap: '#4E8B34', tag: 'RAJSKA APPLE' },
    'vk-8': { shape: 'tall',  liquid: '#C4485F',   label: '#A2263B', cap: '#A2263B', tag: 'RED FRUITS' },
    'vk-9': { shape: 'tall',  liquid: GLASS_CLEAR, label: '#C8102E', cap: '#14161A', tag: 'SMIRNOFF' },

    /* GIN, TEQUILA & RUM */
    'gn-1': { shape: 'round', glass: '#3B7A4E', liquid: '#3B7A4E', label: '#E0A33A', cap: '#16612F', tag: "GORDON'S" },
    'gn-2': { shape: 'tall',  liquid: GLASS_CLEAR, label: '#2E7D8F', cap: '#2E7D8F', tag: "ROCK'S" },
    'gn-3': { shape: 'tall',  liquid: '#D46A7A',   label: '#C4485F', cap: '#C4485F', tag: 'STRAWBERRY' },
    'gn-4': { shape: 'tall',  liquid: GLASS_CLEAR, label: '#2F6E8F', cap: '#2F6E8F', tag: 'SEAGERS' },
    'gn-5': { shape: 'squat', glass: '#1F6B49', liquid: '#1F6B49', label: '#C9A227', cap: '#C9A227', tag: 'TANQUERAY' },
    'gn-6': { shape: 'round', liquid: '#C08A2E',   label: '#A2233A', cap: '#A2233A', tag: 'CUERVO REP.' },
    'gn-7': { shape: 'round', liquid: GLASS_CLEAR, label: '#A2233A', cap: '#A2233A', tag: 'CUERVO SILVER' },
    'rm-1': { shape: 'round', liquid: '#BBD46A',   label: '#4E8B34', cap: '#14161A', tag: 'BIG APPLE' },
    'rm-2': { shape: 'round', liquid: GLASS_CLEAR, label: '#14161A', cap: '#14161A', tag: 'CARTA BLANCA' },
    'rm-3': { shape: 'round', liquid: '#B5711F',   label: '#A2233A', cap: '#14161A', tag: 'BACARDI GOLD' },
    'rm-4': { shape: 'round', liquid: '#D8E07A',   label: '#B7C43A', cap: '#14161A', tag: 'BACARDI LIMÓN' },
    'rm-5': { shape: 'squat', glass: '#FBFCFD', liquid: '#FFFFFF', label: '#14161A', cap: '#14161A', tag: 'MALIBU' },
    'rm-6': { shape: 'round', liquid: GLASS_CLEAR, label: '#2E6B8F', cap: '#2E6B8F', tag: 'MONTILLA' },
    'rm-7': { shape: 'round', liquid: '#C08A2E',   label: '#A06A22', cap: '#A06A22', tag: 'MONTILLA OURO' },
    'rm-8': { shape: 'slim',  glass: '#7E9A82', liquid: '#7E9A82', label: '#EDE7D4', cap: '#2E6B4E', tag: 'STEINHÄGER' },

    /* LICORES & APERITIVOS */
    'lc-1': { shape: 'round', liquid: '#E2611F', label: '#F4F6F2', cap: '#E2611F', tag: 'APEROL' },
    'lc-2': { shape: 'squat', liquid: '#E0B94E', label: '#C9962B', cap: '#8A6A1E', tag: 'LICOR 43' },
    'lc-3': { shape: 'squat', liquid: '#5A3A2A', label: '#5A3A2A', cap: '#3A2418', tag: '43 CHOCOLATE' },
    'lc-4': { shape: 'round', liquid: '#D8B98C', label: '#C9962B', cap: '#7A4B2A', tag: 'AMARULA' },
    'lc-5': { shape: 'squat', liquid: '#8A4A22', label: '#A2233A', cap: '#A2233A', tag: 'AMARETTO' },
    'lc-6': { shape: 'round', liquid: '#C99A5E', label: '#7A4B2A', cap: '#7A4B2A', tag: 'DON LUIZ' },
    'lc-7': { shape: 'square', glass: '#8A5A2A', liquid: '#8A5A2A', label: '#E08A2E', cap: '#E08A2E', tag: 'COINTREAU' },
    'lc-8': { shape: 'squat', glass: '#14351F', liquid: '#14351F', label: '#E08A2E', cap: '#E08A2E', tag: 'JÄGERMEISTER' },
    'lc-9': { shape: 'round', liquid: '#C4485F', label: '#A2233A', cap: '#A2233A', tag: 'STOCK' },

    /* CACHAÇA, CONHAQUE, CERVEJA & ESPUMANTE */
    'cc-1': { shape: 'slim',  liquid: GLASS_CLEAR, label: '#2E7D3A', cap: '#2E7D3A', tag: 'CACHAÇA 51' },
    'cc-2': { shape: 'slim',  liquid: GLASS_CLEAR, label: '#C9962B', cap: '#C9962B', tag: 'V. BARREIRO' },
    'cc-3': { shape: 'slim',  liquid: '#C99A3E',   label: '#2E6B3E', cap: '#2E6B3E', tag: 'YPIÓCA OURO' },
    'cc-4': { shape: 'slim',  liquid: GLASS_CLEAR, label: '#2E6B3E', cap: '#2E6B3E', tag: 'YPIÓCA PRATA' },
    'cc-5': { shape: 'round', liquid: '#D8B98C',   label: '#7A4B2A', cap: '#7A4B2A', tag: 'CASA BUCCO' },
    'cc-6': { shape: 'round', liquid: '#8A5A22',   label: '#7A2E2E', cap: '#7A2E2E', tag: 'DOMECQ' },
    'cc-7': { shape: 'round', liquid: '#7A4A1A',   label: '#A2233A', cap: '#A2233A', tag: 'DREHER' },
    'cc-8': { shape: 'round', liquid: '#8A5A22',   label: '#2E4E7A', cap: '#2E4E7A', tag: 'PRESIDENTE' },
    'cv-1': { shape: 'beer', glass: GLASS_BROWN, liquid: '#B5771F', label: '#A2233A', cap: '#A2233A', tag: 'NORTEÑA' },
    'cv-2': { shape: 'can',  label: '#A2233A', cap: '#B8C0C8', tag: 'NORTEÑA' },
    'cv-3': { shape: 'beer', glass: GLASS_BROWN, liquid: '#B5771F', label: '#C9962B', cap: '#C9962B', tag: 'PATRICIA' },
    'cv-4': { shape: 'can',  label: '#C9962B', cap: '#B8C0C8', tag: 'PATRICIA' },
    'cv-5': { shape: 'beer', glass: GLASS_BROWN, liquid: '#B5771F', label: '#A2233A', cap: '#1D3A6E', tag: 'PILSEN' },
    'cv-6': { shape: 'beer', glass: GLASS_GREEN, liquid: '#4E7A4A', label: '#F0EFE6', cap: '#1D6E3A', tag: 'ZILLERTAL' },
    'cv-7': { shape: 'can',  label: '#1D6E3A', cap: '#B8C0C8', tag: 'ZILLERTAL' },
    'es-1': { shape: 'champ', glass: '#2E4A3A', liquid: '#3D5C46', label: '#1D3A6E', cap: '#C9A227', tag: 'SALTON BRUT' },
    'es-2': { shape: 'champ', glass: '#2E4A3A', liquid: '#3D5C46', label: '#A34B7E', cap: '#B8C0C8', tag: 'SALTON SERIES' },

    /* VERMOUTH & BITTER */
    'vb-1': { shape: 'round', liquid: '#6A3A1F',   label: '#C9962B', cap: '#7A4B2A', tag: 'BRASILBERG' },
    'vb-2': { shape: 'round', liquid: '#B4232A',   label: '#F4F6F2', cap: '#B4232A', tag: 'CAMPARI' },
    'vb-3': { shape: 'round', liquid: '#E6D9A8',   label: '#C8102E', cap: '#C8102E', tag: 'M. BIANCO' },
    'vb-4': { shape: 'round', liquid: GLASS_CLEAR, label: '#C8102E', cap: '#C8102E', tag: 'M. EXTRA DRY' },
    'vb-5': { shape: 'round', liquid: '#D08A9A',   label: '#C8102E', cap: '#C8102E', tag: 'M. ROSATO' },
    'vb-6': { shape: 'round', liquid: '#7A2233',   label: '#C8102E', cap: '#C8102E', tag: 'M. ROSSO' },

    /* ENERGÉTICOS */
    'en-1': { shape: 'pet', liquid: '#E2B24E', label: '#C9962B', cap: '#1D3A6E', tag: 'BALY' },
    'en-2': { shape: 'pet', liquid: '#E08A2E', label: '#E08A2E', cap: '#1D3A6E', tag: 'BALY TROPICAL' },
    'en-3': { shape: 'pet', liquid: '#9CC44E', label: '#4E8B34', cap: '#1D3A6E', tag: 'BALY MAÇÃ' },
    'en-4': { shape: 'pet', liquid: '#D8566A', label: '#C4485F', cap: '#1D3A6E', tag: 'BALY MELANCIA' },
    'en-5': { shape: 'pet', liquid: '#E08A9A', label: '#D06A7A', cap: '#1D3A6E', tag: 'BALY MOR/PÊS' },
    'en-6': { shape: 'can', label: '#1D3A6E', cap: '#B8C0C8', tag: 'RED BULL' },
    'en-7': { shape: 'can', label: '#E0A02E', cap: '#B8C0C8', tag: 'RB TROPICAL' },

    /* XAROPES */
    'xr-1': { shape: 'slim',   liquid: '#C4485F', label: '#A2233A', cap: '#A2233A', tag: 'FÓRMULA' },
    'xr-2': { shape: 'square', liquid: '#E08A2E', label: '#F4F6F2', cap: '#7A4B2A', tag: 'MONIN' }
};

/* --- Utilidades ---------------------------------------------------------- */

/* Escolhe texto claro ou escuro conforme a luminância do rótulo */
function labelTextColor(hex) {
    const c = hex.replace('#', '');
    const r = parseInt(c.substr(0, 2), 16) / 255;
    const g = parseInt(c.substr(2, 2), 16) / 255;
    const b = parseInt(c.substr(4, 2), 16) / 255;
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return lum > 0.55 ? '#0F172A' : '#FFFFFF';
}

/* Maior corpo de fonte que faz o texto caber na largura útil do rótulo.
   Considera o letter-spacing fixo de 0.4 unidades entre caracteres. */
function fitFontSize(lines, avail, cap) {
    let fs = cap;
    lines.forEach(l => {
        const n = l.length;
        if (!n) return;
        const max = (avail - (n - 1) * 0.4) / (n * 0.60);
        if (max < fs) fs = max;
    });
    return Math.max(4.2, fs);
}

/* Quebra equilibrada do nome da marca em duas linhas */
function splitTag(tag) {
    const words = tag.split(' ');
    let best = null;
    for (let i = 1; i < words.length; i++) {
        const a = words.slice(0, i).join(' ');
        const b = words.slice(i).join(' ');
        const score = Math.abs(a.length - b.length);
        if (!best || score < best.score) best = { score: score, lines: [a, b] };
    }
    return best ? best.lines : [tag];
}

/* Decide entre uma ou duas linhas: fica com a opção que permite a maior fonte */
function layoutTag(tag, avail) {
    const one = { lines: [tag], fs: fitFontSize([tag], avail, 9.5) };
    if (tag.indexOf(' ') === -1) return one;
    const l2 = splitTag(tag);
    const two = { lines: l2, fs: fitFontSize(l2, avail, 8.2) };
    return two.fs > one.fs + 0.6 ? two : one;
}

/* Silhueta da garrafa como path SVG */
function bottleSilhouette(s) {
    const cx = 45;
    const nl = cx - s.neckW / 2, nr = cx + s.neckW / 2;
    const bl = cx - s.bodyW / 2, br = cx + s.bodyW / 2;
    const y1 = s.shY, y2 = s.shY + s.shH, yb = s.bottom, r = s.r;

    let cLeft, cRight;
    if (s.sh === 'square') {
        cLeft = `C ${nl},${y1 + s.shH * 0.45} ${bl},${y2 - s.shH * 0.88} ${bl},${y2}`;
        cRight = `C ${br},${y2 - s.shH * 0.88} ${nr},${y1 + s.shH * 0.45} ${nr},${y1}`;
    } else if (s.sh === 'slope') {
        cLeft = `C ${nl - 1},${y1 + s.shH * 0.5} ${bl},${y2 - s.shH * 0.4} ${bl},${y2}`;
        cRight = `C ${br},${y2 - s.shH * 0.4} ${nr + 1},${y1 + s.shH * 0.5} ${nr},${y1}`;
    } else {
        cLeft = `C ${nl},${y1 + s.shH * 0.72} ${bl},${y2 - s.shH * 0.72} ${bl},${y2}`;
        cRight = `C ${br},${y2 - s.shH * 0.72} ${nr},${y1 + s.shH * 0.72} ${nr},${y1}`;
    }

    return [
        `M ${nl},${s.neckTop}`,
        `L ${nl},${y1}`,
        cLeft,
        `L ${bl},${yb - r}`,
        `Q ${bl},${yb} ${bl + r},${yb}`,
        `L ${br - r},${yb}`,
        `Q ${br},${yb} ${br},${yb - r}`,
        `L ${br},${y2}`,
        cRight,
        `L ${nr},${s.neckTop}`,
        'Z'
    ].join(' ');
}

/* --- Gerador principal --------------------------------------------------- */
function bottleSVG(item) {
    const spec = BOTTLE_MAP[item.id] || { shape: 'round', liquid: GLASS_CLEAR, label: '#0E4663', cap: '#0E4663', tag: 'MONTE CRISTO' };
    const uid = 'b-' + item.id;
    const labelColor = spec.label || '#0E4663';
    const capColor = spec.cap || labelColor;
    const txt = labelTextColor(labelColor);
    const tag = spec.tag || '';

    const k = volumeScale(item.volume);
    const parts = [];
    parts.push(`<svg class="product-img bottle-svg" viewBox="0 0 90 200" role="img" aria-label="${(item.name || '').replace(/"/g, '&quot;')}">`);

    /* Sombra no chão — acompanha a largura da embalagem */
    parts.push(`<ellipse cx="45" cy="185" rx="${27 * k}" ry="${5 * k}" fill="#0E4663" opacity="0.10"/>`);

    /* Tudo escala a partir da base, para que o pacote maior pareça maior */
    parts.push(`<g transform="translate(45,182) scale(${k.toFixed(3)}) translate(-45,-182)">`);

    if (spec.shape === 'can') {
        /* ---- Lata de alumínio ---- */
        const x = 22, w = 46, top = 52, bot = 176, h = bot - top;
        const bandY = top + 18, bandH = h - 34;
        parts.push(`<defs><clipPath id="${uid}"><rect x="${x}" y="${top}" width="${w}" height="${h}" rx="9"/></clipPath></defs>`);
        parts.push(`<g clip-path="url(#${uid})">`);
        parts.push(`<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#DCE3E8"/>`);
        parts.push(`<rect x="${x}" y="${bandY}" width="${w}" height="${bandH}" fill="${labelColor}"/>`);
        parts.push(`<rect x="${x}" y="${bandY - 2.5}" width="${w}" height="2.5" fill="#FFFFFF" opacity="0.7"/>`);
        parts.push(`<rect x="${x}" y="${bandY + bandH}" width="${w}" height="2.5" fill="#FFFFFF" opacity="0.7"/>`);
        parts.push(`<rect x="${x + 4}" y="${top}" width="6" height="${h}" fill="#FFFFFF" opacity="0.32"/>`);
        parts.push(`<rect x="${x + w - 9}" y="${top}" width="9" height="${h}" fill="#0F172A" opacity="0.10"/>`);
        parts.push(`</g>`);
        /* Gargalo estreitado e tampa de alumínio */
        parts.push(`<path d="M ${x + 3},${top + 6} Q ${x + 3},${top - 4} ${x + 9},${top - 6} L ${x + w - 9},${top - 6} Q ${x + w - 3},${top - 4} ${x + w - 3},${top + 6} Z" fill="#C7D0D8"/>`);
        parts.push(`<ellipse cx="45" cy="${top - 6}" rx="${(w - 12) / 2}" ry="3.2" fill="#E8EDF1" stroke="#94A3B8" stroke-width="0.8"/>`);
        parts.push(`<ellipse cx="45" cy="${top - 6}" rx="${(w - 22) / 2}" ry="1.6" fill="#B8C0C8"/>`);
        parts.push(`<rect x="${x}" y="${top}" width="${w}" height="${h}" rx="9" fill="none" stroke="#0F172A" stroke-opacity="0.28" stroke-width="1.2"/>`);
        /* Texto */
        const t = layoutTag(tag, w - 7);
        parts.push(renderTag(t.lines, t.fs, bandY + bandH / 2, txt));
        parts.push('</g></svg>');
        return parts.join('');
    }

    /* ---- Garrafa ---- */
    const s = BOTTLE_SHAPES[spec.shape] || BOTTLE_SHAPES.round;
    const d = bottleSilhouette(s);
    const glass = spec.glass || GLASS_CLEAR;
    const liquid = spec.liquid || glass;

    const bodyTop = s.shY + s.shH;
    const bodyH = s.bottom - bodyTop;
    const labelH = Math.max(34, Math.min(58, bodyH * 0.46));
    const labelY = bodyTop + bodyH * 0.22;
    const liquidTop = s.shY - 4;

    parts.push(`<defs><clipPath id="${uid}"><path d="${d}"/></clipPath></defs>`);
    parts.push(`<g clip-path="url(#${uid})">`);
    parts.push(`<rect x="0" y="0" width="90" height="200" fill="${glass}"/>`);
    parts.push(`<rect x="0" y="${liquidTop}" width="90" height="${200 - liquidTop}" fill="${liquid}"/>`);
    /* Rótulo */
    parts.push(`<rect x="0" y="${labelY}" width="90" height="${labelH}" fill="${labelColor}"/>`);
    parts.push(`<rect x="0" y="${labelY - 2.5}" width="90" height="2.5" fill="#FFFFFF" opacity="0.65"/>`);
    parts.push(`<rect x="0" y="${labelY + labelH}" width="90" height="2.5" fill="#FFFFFF" opacity="0.65"/>`);
    /* Canelado do PET */
    if (s.ribs) {
        for (let i = 0; i < 3; i++) {
            parts.push(`<rect x="0" y="${labelY + labelH + 10 + i * 9}" width="90" height="3" fill="#FFFFFF" opacity="0.22"/>`);
        }
    }
    /* Volume e sombreado do vidro */
    parts.push(`<rect x="${45 - s.bodyW / 2 + 4}" y="0" width="6" height="200" fill="#FFFFFF" opacity="0.30"/>`);
    parts.push(`<rect x="${45 + s.bodyW / 2 - 9}" y="0" width="9" height="200" fill="#0F172A" opacity="0.12"/>`);
    parts.push(`</g>`);

    /* Contorno */
    parts.push(`<path d="${d}" fill="none" stroke="#0F172A" stroke-opacity="0.30" stroke-width="1.2" stroke-linejoin="round"/>`);

    /* Cápsula / lacre do gargalo */
    const capH = s.capH || 15;
    const capW = s.neckW + (s.capExtra || 5);
    parts.push(`<rect x="${45 - s.neckW / 2}" y="${s.neckTop}" width="${s.neckW}" height="${(s.shY - s.neckTop) * 0.42}" fill="${capColor}" opacity="0.9"/>`);
    parts.push(`<rect x="${45 - capW / 2}" y="${s.neckTop - capH + 4}" width="${capW}" height="${capH}" rx="2" fill="${capColor}"/>`);
    parts.push(`<rect x="${45 - capW / 2}" y="${s.neckTop - capH + 4}" width="${capW}" height="${capH}" rx="2" fill="none" stroke="#0F172A" stroke-opacity="0.25" stroke-width="1"/>`);

    /* Nome da marca no rótulo */
    const t = layoutTag(tag, s.bodyW - 7);
    parts.push(renderTag(t.lines, t.fs, labelY + labelH / 2, txt));

    parts.push('</g></svg>');
    return parts.join('');
}

function renderTag(lines, fs, cy, color) {
    const lh = fs * 1.25;
    const startY = cy - ((lines.length - 1) * lh) / 2 + fs * 0.34;
    return lines.map((l, i) =>
        `<text x="45" y="${startY + i * lh}" text-anchor="middle" font-family="'Outfit','Plus Jakarta Sans',system-ui,sans-serif" font-weight="800" font-size="${fs}" letter-spacing="0.4" fill="${color}">${l}</text>`
    ).join('');
}

window.bottleSVG = bottleSVG;
window.BOTTLE_MAP = BOTTLE_MAP;
