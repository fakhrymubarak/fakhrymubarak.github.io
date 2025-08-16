import { renderHook, act } from '@testing-library/react';
import { useAnalytics } from '../useAnalytics';

// Mock firebase/analytics
jest.mock('firebase/analytics', () => ({
  logEvent: jest.fn(),
}));

// Mock firebase config
jest.mock('../../config/firebase', () => ({
  analytics: {
    app: { name: 'test-app' },
  },
}));

// Mock requestIdleCallback and setTimeout
const mockRequestIdleCallback = jest.fn();
const mockSetTimeout = jest.fn();

// Store original functions
const originalSetTimeout = global.setTimeout;
const originalRequestIdleCallback = (global as any).requestIdleCallback;

describe('useAnalytics', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock requestIdleCallback
    if ('requestIdleCallback' in global) {
      (global as any).requestIdleCallback = mockRequestIdleCallback;
    } else {
      Object.defineProperty(global, 'requestIdleCallback', {
        value: mockRequestIdleCallback,
        writable: true,
      });
    }

    // Mock setTimeout
    global.setTimeout = mockSetTimeout;

    // Setup mock implementations
    mockRequestIdleCallback.mockImplementation((callback) => {
      // Execute callback immediately for testing
      originalSetTimeout(callback, 0);
      return 1;
    });

    mockSetTimeout.mockImplementation((callback, delay) => {
      originalSetTimeout(callback, delay);
      return 1;
    });
  });

  afterEach(() => {
    // Restore original functions
    global.setTimeout = originalSetTimeout;
    if (originalRequestIdleCallback) {
      (global as any).requestIdleCallback = originalRequestIdleCallback;
    } else {
      delete (global as any).requestIdleCallback;
    }
  });

  it('returns analytics functions', () => {
    const { result } = renderHook(() => useAnalytics());

    expect(result.current.trackEvent).toBeDefined();
    expect(result.current.trackEventIdle).toBeDefined();
    expect(result.current.trackPageView).toBeDefined();
    expect(result.current.trackButtonClick).toBeDefined();
    expect(result.current.trackProjectView).toBeDefined();
    expect(result.current.trackContactClick).toBeDefined();
  });

  it('trackEvent calls logEvent with correct parameters', () => {
    const { result } = renderHook(() => useAnalytics());
    const { logEvent } = require('firebase/analytics');

    act(() => {
      result.current.trackEvent('test_event', { param1: 'value1' });
    });

    expect(logEvent).toHaveBeenCalledWith(expect.any(Object), 'test_event', {
      param1: 'value1',
    });
  });

  it('trackEventIdle uses requestIdleCallback when available', () => {
    const { result } = renderHook(() => useAnalytics());
    const { logEvent } = require('firebase/analytics');

    act(() => {
      result.current.trackEventIdle('test_event', { param1: 'value1' });
    });

    expect(mockRequestIdleCallback).toHaveBeenCalledWith(
      expect.any(Function),
      { timeout: 2000 }
    );

    // Simulate the idle callback execution
    act(() => {
      const callback = mockRequestIdleCallback.mock.calls[0][0];
      callback();
    });

    expect(logEvent).toHaveBeenCalledWith(expect.any(Object), 'test_event', {
      param1: 'value1',
    });
  });

  it('trackEventIdle falls back to setTimeout when requestIdleCallback is not available', () => {
    // Store original requestIdleCallback
    const originalRequestIdleCallback = (global as any).requestIdleCallback;

    // Remove requestIdleCallback from global scope
    delete (global as any).requestIdleCallback;

    const { result } = renderHook(() => useAnalytics());
    const { logEvent } = require('firebase/analytics');

    act(() => {
      result.current.trackEventIdle('test_event', { param1: 'value1' });
    });

    expect(mockSetTimeout).toHaveBeenCalledWith(expect.any(Function), 0);

    // Simulate the setTimeout callback execution
    act(() => {
      const callback = mockSetTimeout.mock.calls[0][0];
      callback();
    });

    expect(logEvent).toHaveBeenCalledWith(expect.any(Object), 'test_event', {
      param1: 'value1',
    });

    // Restore original requestIdleCallback
    if (originalRequestIdleCallback) {
      (global as any).requestIdleCallback = originalRequestIdleCallback;
    }
  });

  it('trackPageView calls trackEvent with page_view', () => {
    const { result } = renderHook(() => useAnalytics());
    const { logEvent } = require('firebase/analytics');

    act(() => {
      result.current.trackPageView('/test-page');
    });

    expect(logEvent).toHaveBeenCalledWith(expect.any(Object), 'page_view', {
      page_name: '/test-page',
    });
  });

  it('trackButtonClick uses trackEventIdle for performance', () => {
    const { result } = renderHook(() => useAnalytics());
    const { logEvent } = require('firebase/analytics');

    act(() => {
      result.current.trackButtonClick('test-button', 'header');
    });

    expect(mockRequestIdleCallback).toHaveBeenCalledWith(
      expect.any(Function),
      { timeout: 2000 }
    );

    // Simulate the idle callback execution
    act(() => {
      const callback = mockRequestIdleCallback.mock.calls[0][0];
      callback();
    });

    expect(logEvent).toHaveBeenCalledWith(expect.any(Object), 'button_click', {
      button_name: 'test-button',
      location: 'header',
    });
  });

  it('trackProjectView uses trackEventIdle for performance', () => {
    const { result } = renderHook(() => useAnalytics());
    const { logEvent } = require('firebase/analytics');

    act(() => {
      result.current.trackProjectView('test-project');
    });

    expect(mockRequestIdleCallback).toHaveBeenCalledWith(
      expect.any(Function),
      { timeout: 2000 }
    );

    // Simulate the idle callback execution
    act(() => {
      const callback = mockRequestIdleCallback.mock.calls[0][0];
      callback();
    });

    expect(logEvent).toHaveBeenCalledWith(expect.any(Object), 'project_view', {
      project_name: 'test-project',
    });
  });

  it('trackContactClick uses trackEventIdle for performance', () => {
    const { result } = renderHook(() => useAnalytics());
    const { logEvent } = require('firebase/analytics');

    act(() => {
      result.current.trackContactClick('email');
    });

    expect(mockRequestIdleCallback).toHaveBeenCalledWith(
      expect.any(Function),
      { timeout: 2000 }
    );

    // Simulate the idle callback execution
    act(() => {
      const callback = mockRequestIdleCallback.mock.calls[0][0];
      callback();
    });

    expect(logEvent).toHaveBeenCalledWith(expect.any(Object), 'contact_click', {
      contact_method: 'email',
    });
  });

  it('handles analytics when analytics is not available', () => {
    // Mock analytics to be null
    jest.doMock('../../config/firebase', () => ({
      analytics: null,
    }));

    const { result } = renderHook(() => useAnalytics());

    // Should not throw error
    expect(() => {
      act(() => {
        result.current.trackEvent('test_event');
      });
    }).not.toThrow();
  });
});
