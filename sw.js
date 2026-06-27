const CACHE_NAME='cdm2026-cache-v15';
const ASSETS=['./','index.html','style.css?v=15','bracket-pro.css?v=15','script.js?v=15','bracket-pro.js?v=15','manifest.json?v=15','icon.svg?v=15','trophy.svg?v=15'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match(e.request).then(c=>c||caches.match('./'))))});
