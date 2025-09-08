const CACHE_NAME = "sempdec-cache-v1";

const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/sw.js",

  "/assets/favicon.ico",
  "/assets/logo.png",

  "/funcao/cadastro/acaocafa.html",
  "/funcao/cadastro/base64.js",
  "/funcao/cadastro/fichacafa.css",
  "/funcao/cadastro/fichacafa.html",
  "/funcao/cadastro/gerarPDF.js",
  "/funcao/cadastro/recibo.js",
  "/funcao/mural/escalas.html",
  "/funcao/relatorio/acaorec.html",
  "/funcao/relatorio/ficharec.html",

  "/js/firebase-config.js",

  "/cadastro.html",
  "/login.html"
];

// Instala o service worker e adiciona arquivos ao cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Ativa o service worker e limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepta requisições e responde do cache ou da rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});