const CACHE_NAME = 'monte-cristo-cache-v13-20261013';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css?v=20261013_v13',
  './app.js?v=20261013_v13',
  './bottles.js?v=20261013_v13',
  './images.js?v=20261013_v13',
  './manifest.json',
  './assets/favicon.svg',
  './assets/simbolo-monte.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First: busca sempre da rede primeiro para refletir alteracoes em tempo real.
// Se estiver offline ou a conexao falhar, recorre ao cache local.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Nunca intercepta chamadas a API KV
  if (event.request.url.includes('/api/')) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache).catch(() => {});
          });
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});

