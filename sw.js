// Service Worker for cache management and automatic updates
// This is a template - the build script will inject the actual version
const APP_VERSION = 'release/v.1.2.2'; // Will be replaced by a build script
const CACHE_NAME = `showcase-${APP_VERSION}-cache`;
const STATIC_CACHE_NAME = `showcase-${APP_VERSION}-static`;

// Files to cache
const urlsToCache = ['/', '/index.html', '/manifest.json'];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        // Return a cached version or fetch from network
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
        // Return offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
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
  );
});

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

