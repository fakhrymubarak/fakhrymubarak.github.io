// Mock Firebase analytics
const mockAnalytics = {
  logEvent: jest.fn(),
  setUserId: jest.fn(),
  setUserProperties: jest.fn(),
};

export const analytics = mockAnalytics;
