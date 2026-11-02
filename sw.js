const C='focus-v2',F=['./','index.html','manifest.json','icon-180.png','icon-512.png'];
// reload:true bypasses the HTTP cache so a fresh install never caches stale files
addEventListener('install',e=>{skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))))});
addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>clients.claim())));
// network-first, cache only as the offline fallback. no-cache skips GitHub Pages' 10 min max-age
addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r.url,{cache:'no-cache'}).then(res=>{
    if(res.ok){const c=res.clone();caches.open(C).then(x=>x.put(r,c))}
    return res;
  }).catch(()=>caches.match(r,{ignoreSearch:true})));
});
addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window'}).then(l=>l[0]?l[0].focus():clients.openWindow('./')));
});
