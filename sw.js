const CACHE_NAME='cdm2026-cache-v16-vertical';
const ASSETS=['./','index.html','style.css?v=16','bracket-pro.css?v=16','script.js?v=16','bracket-pro.js?v=16','manifest.json?v=16','icon.svg?v=16','trophy.svg?v=16'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match(e.request).then(c=>c||caches.match('./'))))});
