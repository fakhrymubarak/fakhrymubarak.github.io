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

describe('useAnalytics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns analytics functions', () => {
    const { result } = renderHook(() => useAnalytics());

    expect(result.current.trackEvent).toBeDefined();
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

  it('trackButtonClick calls trackEvent with button_click', () => {
    const { result } = renderHook(() => useAnalytics());
    const { logEvent } = require('firebase/analytics');

    act(() => {
      result.current.trackButtonClick('test-button', 'header');
    });

    expect(logEvent).toHaveBeenCalledWith(expect.any(Object), 'button_click', {
      button_name: 'test-button',
      location: 'header',
    });
  });

  it('trackProjectView calls trackEvent with project_view', () => {
    const { result } = renderHook(() => useAnalytics());
    const { logEvent } = require('firebase/analytics');

    act(() => {
      result.current.trackProjectView('test-project');
    });

    expect(logEvent).toHaveBeenCalledWith(expect.any(Object), 'project_view', {
      project_name: 'test-project',
    });
  });

  it('trackContactClick calls trackEvent with contact_click', () => {
    const { result } = renderHook(() => useAnalytics());
    const { logEvent } = require('firebase/analytics');

    act(() => {
      result.current.trackContactClick('email');
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
