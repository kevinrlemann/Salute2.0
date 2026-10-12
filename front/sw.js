// Service worker mínimo: deixa o app ser instalado na tela inicial. Não guarda cache,
// então os dados e a IA continuam sempre vindo do servidor.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function () { /* sem cache: a rede responde */ });
