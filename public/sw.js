const CACHE_NAME = 'fakhrymubarak.github.io-cache-v2';
const STATIC_CACHE = 'fakhrymubarak.github.io-static-v2';
const DYNAMIC_CACHE = 'fakhrymubarak.github.io-dynamic-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/avatar.webp',
  '/icons/Icon-192.png',
  '/icons/Icon-512.png',
  '/icons/Icon-maskable-192.png',
  '/icons/Icon-maskable-512.png',
];

// Cache strategies
const CACHE_STRATEGIES = {
  STATIC: 'static',
  DYNAMIC: 'dynamic',
  NETWORK_FIRST: 'network-first',
  CACHE_FIRST: 'cache-first',
};

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Cache resources one by one to handle individual failures
        return Promise.allSettled(
          urlsToCache.map(url =>
            cache.add(url).catch(error => {
              console.warn(`Failed to cache ${url}:`, error);
              return null;
            })
          )
        );
      })
      .then(() => {
        console.log('Service Worker installed successfully');
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker installation failed:', error);
      })
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Clean up old JavaScript files from dynamic cache
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return cache.keys().then((requests) => {
          return Promise.all(
            requests.map((request) => {
              // Remove old JS files that might have stale hashes
              if (request.url.includes('.js') && request.url.includes('index-')) {
                console.log('Removing old JS file from cache:', request.url);
                return cache.delete(request);
              }
            })
          );
        });
      }).catch(() => {
        // Dynamic cache might not exist yet, ignore error
        console.log('Dynamic cache not found, skipping cleanup');
      }),
      // Take control of all clients
      self.clients.claim()
    ]).then(() => {
      console.log('Service Worker activated successfully');
    })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Skip data URLs
  if (event.request.url.startsWith('data:')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }

        return fetch(event.request).catch(error => {
          console.warn('Fetch failed for:', event.request.url, error);

          // Handle 404 errors for JavaScript files by redirecting to index.html
          if (event.request.url.includes('.js') && error.name === 'TypeError') {
            console.log('JS file not found, redirecting to index.html:', event.request.url);
            return caches.match('/index.html');
          }

          // Return a fallback response for navigation requests
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
          return null;
        });
      })
  );
});

// Handle background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks here
      console.log('Background sync triggered')
    );
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  // Get the base path from the service worker scope
  const basePath = self.location.pathname.replace('/sw.js', '');

  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: `${basePath}icons/Icon-192.png`,
    badge: `${basePath}icons/Icon-192.png`,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: `${basePath}icons/Icon-192.png`
      },
      {
        action: 'close',
        title: 'Close',
        icon: `${basePath}icons/Icon-192.png`
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Portfolio Update', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow(self.location.origin + self.location.pathname.replace('/sw.js', ''))
    );
  }
}); 