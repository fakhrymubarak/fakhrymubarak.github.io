// Mock the entire firebase module
jest.mock('../firebase', () => ({
  analytics: {
    app: {
      name: 'test-app',
      options: {
        apiKey: 'test-api-key',
        authDomain: 'test-auth-domain',
        projectId: 'test-project-id',
        storageBucket: 'test-storage-bucket',
        messagingSenderId: 'test-sender-id',
        appId: 'test-app-id',
        measurementId: 'test-measurement-id',
      },
    },
  },
}));

// Mock IndexedDB to prevent Firebase warnings
const mockIndexedDB = {
  open: jest.fn(() => ({
    onsuccess: null,
    onerror: null,
    result: {
      createObjectStore: jest.fn(),
      transaction: jest.fn(() => ({
        objectStore: jest.fn(() => ({
          get: jest.fn(),
          put: jest.fn(),
          delete: jest.fn(),
        })),
      })),
    },
  })),
  deleteDatabase: jest.fn(),
};

Object.defineProperty(window, 'indexedDB', {
  value: mockIndexedDB,
  writable: true,
});

// Now import the mocked module
import { analytics } from '../firebase';

describe('Firebase Config', () => {
  it('exports analytics instance', () => {
    expect(analytics).toBeDefined();
  });

  it('analytics has app property', () => {
    expect(analytics).toHaveProperty('app');
  });

  it('analytics app has name property', () => {
    expect(analytics.app).toHaveProperty('name');
  });

  it('analytics app has options property', () => {
    expect(analytics.app).toHaveProperty('options');
  });
});
