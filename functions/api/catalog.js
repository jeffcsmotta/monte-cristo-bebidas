/**
 * Cloudflare Pages Function: /api/catalog
 * Fonte única da verdade do catálogo Monte Cristo.
 *
 * - GET  -> devolve { version, updatedAt, updatedBy, count, items, history }
 * - POST -> recebe { items, author } e grava nova versão no KV.
 *
 * Reusa o binding MONTECRISTO_AUTH (KV) com chaves próprias:
 *   catalog:current -> { version, updatedAt, updatedBy, items }
 *   catalog:history -> [{ version, updatedAt, updatedBy, count }] (últimos 30)
 */

const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store, no-cache, must-revalidate'
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: HEADERS });
}

function kvOf(context) {
  return context.env.MONTECRISTO_AUTH || null;
}

export async function onRequestGet(context) {
  const kv = kvOf(context);
  if (!kv) {
    return json({ exists: false, reason: 'KV indisponível neste ambiente.' }, 200);
  }
  let current = null;
  let history = [];
  try {
    const raw = await kv.get('catalog:current');
    if (raw) current = JSON.parse(raw);
  } catch (e) {}
  try {
    const rawH = await kv.get('catalog:history');
    if (rawH) history = JSON.parse(rawH) || [];
  } catch (e) {}

  if (!current || !Array.isArray(current.items)) {
    return json({ exists: false, history }, 200);
  }
  return json({
    exists: true,
    version: current.version,
    updatedAt: current.updatedAt,
    updatedBy: current.updatedBy,
    count: current.items.length,
    items: current.items,
    history: Array.isArray(history) ? history.slice(0, 10) : []
  });
}

function sanitizeItems(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 2000) return null;
  const out = [];
  const seen = new Set();
  for (const p of items) {
    if (!p || typeof p.id !== 'string' || !p.id.trim()) return null;
    if (typeof p.name !== 'string' || !p.name.trim()) return null;
    const price = Number(p.price);
    if (!isFinite(price) || price <= 0) return null;
    const id = p.id.trim();
    if (seen.has(id)) return null;
    seen.add(id);
    out.push({
      id,
      name: p.name.trim(),
      volume: String(p.volume || '1L'),
      price: Math.round(price * 100) / 100,
      category: String(p.category || 'outros').trim() || 'outros',
      boxQty: Number.isFinite(Number(p.boxQty)) && Number(p.boxQty) > 0 ? Math.round(Number(p.boxQty)) : 6,
      boxTotal: Number.isFinite(Number(p.boxTotal)) && Number(p.boxTotal) > 0
        ? Math.round(Number(p.boxTotal) * 100) / 100
        : undefined,
      active: p.active !== false,
      ...(typeof p.image === 'string' && p.image ? { image: p.image.slice(0, 200000) } : {})
    });
  }
  // Preenche boxTotal quando ausente (mesma regra do consolidar: 8% off)
  for (const p of out) {
    if (p.boxTotal === undefined) {
      p.boxTotal = Math.round(p.price * p.boxQty * 0.92 * 100) / 100;
    }
  }
  return out;
}

export async function onRequestPost(context) {
  let body;
  try {
    body = await context.request.json();
  } catch (e) {
    return json({ error: 'Corpo da requisição inválido.' }, 400);
  }

  const author = (body.author || '').toString().trim().slice(0, 60) || 'admin';
  const items = sanitizeItems(body.items);
  if (!items) {
    return json({ error: 'Lista de produtos inválida (id, name e price são obrigatórios).' }, 400);
  }

  const kv = kvOf(context);
  if (!kv) {
    return json({ error: 'KV indisponível — configure o binding MONTECRISTO_AUTH no Pages.' }, 500);
  }

  let version = 1;
  try {
    const raw = await kv.get('catalog:current');
    if (raw) {
      const cur = JSON.parse(raw);
      if (cur && Number.isFinite(Number(cur.version))) version = Number(cur.version) + 1;
    }
  } catch (e) {}

  const record = {
    version,
    updatedAt: new Date().toISOString(),
    updatedBy: author,
    items
  };

  await kv.put('catalog:current', JSON.stringify(record));

  let history = [];
  try {
    const rawH = await kv.get('catalog:history');
    if (rawH) history = JSON.parse(rawH) || [];
  } catch (e) {}
  history.unshift({
    version,
    updatedAt: record.updatedAt,
    updatedBy: author,
    count: items.length
  });
  history = history.slice(0, 30);
  await kv.put('catalog:history', JSON.stringify(history));

  return json({
    success: true,
    version,
    updatedAt: record.updatedAt,
    updatedBy: author,
    count: items.length
  });
}
