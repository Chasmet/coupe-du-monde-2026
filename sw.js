const CACHE_NAME = 'cdm2026-cache-v14-bracket';
const ASSETS = ['./','index.html','style.css?v=13','bracket-pro.css?v=13','script.js?v=13','bracket-pro.js?v=13','manifest.json?v=13','icon.svg?v=13'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).then(response => {
    const clone = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached || caches.match('./'))));
});
