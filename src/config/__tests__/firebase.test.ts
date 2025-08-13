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
