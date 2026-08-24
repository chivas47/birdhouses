/* Service worker: keeps the app usable without internet.
   Map pictures are cached as they are looked at, so places you
   have already visited still show up when you are offline. */
var VERSION = 'v1';
var SHELL = 'birdhouses-shell-' + VERSION;
var TILES = 'birdhouses-tiles-' + VERSION;
var TILE_LIMIT = 400;

var SHELL_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/app.css',
  './assets/js/i18n.js',
  './assets/js/store.js',
  './assets/js/photos.js',
  './assets/js/map.js',
  './assets/js/app.js',
  './assets/icons/icon.svg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(SHELL).then(function (c) {
      return Promise.all(SHELL_FILES.map(function (f) {
        return c.add(f).catch(function () { /* one missing file must not fail the install */ });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== SHELL && k !== TILES) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

function trimCache(name, max) {
  caches.open(name).then(function (c) {
    c.keys().then(function (keys) {
      if (keys.length <= max) return;
      for (var i = 0; i < keys.length - max; i++) c.delete(keys[i]);
    });
  });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  /* map tiles — show the cached one first, refresh in the background */
  if (/tile\.openstreetmap\.org|server\.arcgisonline\.com/.test(url.hostname)) {
    e.respondWith(
      caches.open(TILES).then(function (c) {
        return c.match(req).then(function (hit) {
          var net = fetch(req).then(function (res) {
            if (res && (res.ok || res.type === 'opaque')) {
              c.put(req, res.clone());
              trimCache(TILES, TILE_LIMIT);
            }
            return res;
          }).catch(function () { return hit; });
          /* must always hand back a Response, even with no cache and no network */
          return hit || net.then(function (res) {
            return res || new Response('', { status: 504, statusText: 'no map picture' });
          });
        });
      })
    );
    return;
  }

  if (url.origin !== location.origin) return;

  /* the page itself: try the network so updates arrive, fall back to the cache */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(SHELL).then(function (c) { c.put('./index.html', copy); });
        return res;
      }).catch(function () {
        return caches.match('./index.html').then(function (r) { return r || caches.match('./'); });
      })
    );
    return;
  }

  /* everything else: cache first */
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(SHELL).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () {
        return new Response('', { status: 504, statusText: 'offline' });
      });
    })
  );
});
