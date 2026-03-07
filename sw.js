// Service Worker for cache management and automatic updates
// This is a template - the build script will inject the actual version
const APP_VERSION = 'release/v1.4.1'; // Will be replaced by a build script
const CACHE_NAME = `showcase-${APP_VERSION}-cache`;
const STATIC_CACHE_NAME = `showcase-${APP_VERSION}-static`;

// Files to cache
const urlsToCache = ['/', '/index.html', '/manifest.json'];

// Install event - cache static assets and activate immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  // Force new service worker to activate immediately (don't wait for tabs to close)
  self.skipWaiting();
});

// Fetch event - network-first for navigation, cache-first for static assets
self.addEventListener('fetch', (event) => {
  // Navigation requests (HTML pages) — always try network first
  // This is critical for Safari which may otherwise serve stale index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // Update the cache with the fresh response
          const responseClone = networkResponse.clone();
          caches.open(STATIC_CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback — serve cached index.html
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Static assets (JS, CSS, images) — cache-first for performance
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        return (
          response ||
          fetch(event.request).then(fetchResponse => {
            // Cache successful responses for static assets
            if (
              event.request.method === 'GET' &&
              (event.request.url.includes('.js') ||
                event.request.url.includes('.css') ||
                event.request.url.includes('.webp') ||
                event.request.url.includes('.png'))
            ) {
              return caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
              });
            }
            return fetchResponse;
          })
        );
      })
      .catch(() => {
        return undefined;
      })
  );
});

// Activate event - clean up old caches and claim all clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Delete old caches that don't match current version
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Claim all open clients so the new SW takes effect immediately
        // Without this, Safari may continue using the old SW until the page is fully reloaded
        return self.clients.claim();
      })
  );
});

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

