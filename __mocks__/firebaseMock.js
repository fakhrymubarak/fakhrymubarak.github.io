// Mock Firebase analytics
const mockAnalytics = {
  logEvent: jest.fn(),
  setUserId: jest.fn(),
  setUserProperties: jest.fn(),
};

// Mock Firebase app
const mockApp = {
  name: 'test-app',
  options: {},
};

// Mock Firebase functions
const mockInitializeApp = jest.fn(() => mockApp);
const mockGetAnalytics = jest.fn(() => mockAnalytics);

// Export all the mocked functions and objects using ES modules
export const analytics = mockAnalytics;
export const initializeApp = mockInitializeApp;
export const getAnalytics = mockGetAnalytics;
