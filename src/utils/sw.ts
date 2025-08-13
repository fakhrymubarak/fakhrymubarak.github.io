// Service Worker registration utility

interface ServiceWorkerRegistrationWithSync extends ServiceWorkerRegistration {
  sync: {
    register(tag: string): Promise<void>;
  };
}

interface ServiceWorkerRegistrationPrototype {
  sync?: {
    register(tag: string): Promise<void>;
  };
}

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      console.log('Registering Service Worker...');
      // Use the same base path as Vite config for production
      const basePath = '/';
      const registration = await navigator.serviceWorker.register(
        `${basePath}sw.js`,
        {
          scope: basePath,
          updateViaCache: 'none',
        }
      );
      console.log('Service Worker registered successfully:', registration);

      // Check for updates
      registration.addEventListener('updatefound', () => {
        console.log('Service Worker update found');
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            console.log('Service Worker state changed:', newWorker.state);
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              // New content is available, show update notification
              showUpdateNotification(registration);
            }
          });
        }
      });

      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service Worker controller changed');
      });

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      // Don't throw the error, just log it
      return null;
    }
  } else {
    console.log('Service Worker not supported in this browser');
    return null;
  }
};

const showUpdateNotification = (_registration: ServiceWorkerRegistration) => {
  // You can implement a custom update notification here
  console.log('New version available!');

  // Example: Show a notification to the user
  if ('Notification' in window && Notification.permission === 'granted') {
    const basePath = '/';
    new Notification('Portfolio Update', {
      body: 'A new version is available. Refresh to update.',
      icon: `${basePath}icons/Icon-192.png`,
    });
  }
};

export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      console.log('Service Worker unregistered successfully');
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
    }
  }
};

// Request notification permission
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

// Background sync registration
export const registerBackgroundSync = async (tag: string) => {
  const swPrototype = window.ServiceWorkerRegistration
    .prototype as ServiceWorkerRegistrationPrototype;
  if ('serviceWorker' in navigator && 'sync' in swPrototype) {
    try {
      const registration = (await navigator.serviceWorker
        .ready) as ServiceWorkerRegistrationWithSync;
      await registration.sync.register(tag);
      console.log('Background sync registered:', tag);
    } catch (error) {
      console.error('Background sync registration failed:', error);
    }
  }
};
