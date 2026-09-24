const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36';
(async () => {
  const url = 'https://shopee.com.br/api/v4/search/search_items?by=relevancy&keyword=xarope%20formula%20grenadine&limit=10&newest=0&order=desc&page_type=search&version=2';
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  console.log('status ' + r.status);
  const j = await r.json().catch(() => null);
  if (!j || !j.items) {
    console.log('sem itens: ' + JSON.stringify(j).slice(0, 200));
    return;
  }
  j.items.forEach((it) => {
    const b = it.item_basic || {};
    console.log(`- ${b.name} | img: ${b.image} | shop: ${b.shopid} item: ${b.itemid}`);
  });
})();
