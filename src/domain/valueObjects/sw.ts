// Service Worker for cache management and automatic updates
// This is a template - the build script will inject the actual version
const APP_VERSION = '{{APP_VERSION}}'; // Will be replaced by a build script
const CACHE_NAME = `showcase-${APP_VERSION}-cache`;
const STATIC_CACHE_NAME = `showcase-${APP_VERSION}-static`;

// Files to cache
const urlsToCache = ['/', '/index.html', '/manifest.json'];

// Install event - cache static assets
self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event: any) => {
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
self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames: string[]) => {
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
self.addEventListener('message', (event: any) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    (self as any).skipWaiting();
  }
});

// Service Worker registration utility
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      console.log('Registering Service Worker...');
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });

      console.log('Service Worker registered successfully:', registration);

      // Check for updates and auto-update
      registration.addEventListener('updatefound', () => {
        console.log('Service Worker update found');
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              // Auto-update without notification
              console.log('Auto-updating to new version...');
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        }
      });

      // Listen for service worker updates and auto-reload
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service Worker controller changed, reloading...');
        window.location.reload();
      });

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

export const initServiceWorker = () => {
  registerServiceWorker();
};
