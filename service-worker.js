// Arquivo responsável por guardar os arquivos essenciais para abrir o app offline.
const CACHE_NAME = 'lista-de-compras-pwa-v1';
const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Não intercepta envios de formulário, outros domínios ou métodos diferentes de GET.
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    // Tenta buscar a versão atual; se estiver sem conexão, abre a cópia guardada.
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(new URL('./index.html', self.registration.scope), copy));
          }
          return response;
        })
        .catch(async () => {
          return (await caches.match(new URL('./index.html', self.registration.scope)))
            || (await caches.match(new URL('./', self.registration.scope)));
        })
    );
    return;
  }

  // Para arquivos locais, prefere a cópia em cache; guarda respostas novas também.
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
