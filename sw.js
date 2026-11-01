/* CCB - VRB – deixa o app instalável e abre a última versão.
   Sempre tenta buscar da internet primeiro; só usa a cópia guardada se estiver sem sinal.
   Os dados da planilha (script.google.com) nunca são guardados aqui. */
const CACHE = 'ccb-vrb-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copia = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copia));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
