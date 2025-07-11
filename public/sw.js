self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('game-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/main.js',
        '/img/lina_avatar.webp',
        '/img/amina_avatar.webp',
        '/chapters/arc1/chapter1.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});