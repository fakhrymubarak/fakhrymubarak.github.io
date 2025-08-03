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
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
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

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

const showUpdateNotification = (_registration: ServiceWorkerRegistration) => {
  // You can implement a custom update notification here
  console.log('New version available!');

  // Example: Show a notification to the user
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Portfolio Update', {
      body: 'A new version is available. Refresh to update.',
      icon: '/favicon-32x32.png',
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
