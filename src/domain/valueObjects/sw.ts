// Service Worker for cache management and automatic updates
// This is a template - the build script will inject the actual version
const APP_VERSION = '{{APP_VERSION}}'; // Will be replaced by a build script
const CACHE_NAME = `showcase-${APP_VERSION}-cache`;
const STATIC_CACHE_NAME = `showcase-${APP_VERSION}-static`;

// Files to cache
const urlsToCache = ['/', '/index.html', '/manifest.json'];

// Install event - cache static assets and activate immediately
self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  // Force new service worker to activate immediately (don't wait for tabs to close)
  (self as any).skipWaiting();
});

// Fetch event - network-first for navigation, cache-first for static assets
self.addEventListener('fetch', (event: any) => {
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
self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames: string[]) => {
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
        return (self as any).clients.claim();
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
// --- Everything below this line is client-side only (stripped from public/sw.js by the build script) ---

// Track the last known version to detect changes
let lastKnownVersion: string | null = null;

/**
 * Fetch /version.json from the network (bypassing cache) and return the version string.
 * Returns null if the fetch fails.
 */
const fetchCurrentVersion = async (): Promise<string | null> => {
  try {
    const response = await fetch(`/version.json?_t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.version || null;
  } catch {
    return null;
  }
};

/**
 * Check if the deployed version has changed since the page was loaded.
 * If it has, reload the page to pick up the new assets.
 */
const checkForVersionUpdate = async () => {
  const currentVersion = await fetchCurrentVersion();
  if (!currentVersion) return;

  if (lastKnownVersion === null) {
    // First check — just store the version
    lastKnownVersion = currentVersion;
    return;
  }

  if (currentVersion !== lastKnownVersion) {
    console.log(
      `Version changed: ${lastKnownVersion} → ${currentVersion}, reloading...`
    );
    lastKnownVersion = currentVersion;
    window.location.reload();
  }
};

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

      // --- Safari bfcache fix ---
      // When Safari restores a page from bfcache (back-forward navigation),
      // no fetch events fire and the SW update cycle is skipped entirely.
      // This listener catches that case and triggers an update check.
      window.addEventListener('pageshow', event => {
        if ((event as PageTransitionEvent).persisted) {
          console.log('Page restored from bfcache, checking for updates...');
          registration.update();
          checkForVersionUpdate();
        }
      });

      // --- Tab focus freshness check ---
      // When the user returns to a tab that has been in the background,
      // check if a new version was deployed while they were away.
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          registration.update();
          checkForVersionUpdate();
        }
      });

      // Initial version capture
      await checkForVersionUpdate();

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
