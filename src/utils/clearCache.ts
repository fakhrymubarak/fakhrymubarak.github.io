// Cache clearing utility for handling 404 errors

// Extend Window interface to include our global function
declare global {
  interface Window {
    clearCacheAndReload: () => Promise<void>;
  }
}

export const clearServiceWorkerCache = async (): Promise<void> => {
  if ('serviceWorker' in navigator && 'caches' in window) {
    try {
      // Unregister the current service worker
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      console.log('Service Worker unregistered');

      // Clear all caches
      const cacheNames = await window.caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => {
          console.log('Deleting cache:', cacheName);
          return window.caches.delete(cacheName);
        })
      );
      console.log('All caches cleared');

      // Reload the page to register a fresh service worker
      window.location.reload();
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }
};

export const handle404Error = (): void => {
  // Check if we're getting 404 errors for JS files
  const observer = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      if (entry.entryType === 'resource' && entry.name.includes('.js')) {
        // Type assertion for PerformanceResourceTiming
        const resourceEntry = entry as unknown as {
          transferSize: number;
          decodedBodySize: number;
        };
        if (
          resourceEntry.transferSize === 0 &&
          resourceEntry.decodedBodySize === 0
        ) {
          console.warn('Detected potential 404 for JS file:', entry.name);
          // Show a notification to the user
          showCacheClearNotification();
        }
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
};

const showCacheClearNotification = (): void => {
  // Create a notification banner
  const banner = document.createElement('div');
  banner.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ff6b6b;
    color: white;
    padding: 12px;
    text-align: center;
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  banner.innerHTML = `
    <span>⚠️ Page resources not loading properly. 
    <button onclick="window.clearCacheAndReload()" style="
      background: white;
      color: #ff6b6b;
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 8px;
    ">Clear Cache & Reload</button>
    <button onclick="this.parentElement.remove()" style="
      background: transparent;
      color: white;
      border: 1px solid white;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 8px;
    ">Dismiss</button>
    </span>
  `;

  document.body.appendChild(banner);

  // Add global function
  window.clearCacheAndReload = clearServiceWorkerCache;
};

// Auto-detect and handle 404 errors on page load
if (typeof window !== 'undefined') {
  // Wait for page to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handle404Error);
  } else {
    handle404Error();
  }
}
