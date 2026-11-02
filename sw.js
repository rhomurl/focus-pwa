const C='focus-v1',F=['./','index.html','manifest.json','icon-180.png'];
addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
