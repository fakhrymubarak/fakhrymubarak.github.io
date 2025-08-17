import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../useTheme';

// Mock the ThemeContext
const mockThemeContext = {
  theme: 'light' as const,
  toggleTheme: jest.fn(),
};

jest.mock('@application/store/ThemeContext', () => ({
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', { 'data-testid': 'theme-provider' }, children),
  },
}));

// Mock setTimeout and clearTimeout
jest.useFakeTimers();

describe('useTheme', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('throws error when used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });

  it('returns theme context when used within ThemeProvider', () => {
    // Mock the useContext to return the mock context
    jest.spyOn(React, 'useContext').mockReturnValue(mockThemeContext);

    const { result } = renderHook(() => useTheme());

    expect(result.current).toBeDefined();
    expect(typeof result.current.theme).toBe('string');
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('provides theme state', () => {
    // Mock the useContext to return the mock context
    jest.spyOn(React, 'useContext').mockReturnValue(mockThemeContext);

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBeDefined();
  });

  it('provides toggleTheme function', () => {
    // Mock the useContext to return the mock context
    jest.spyOn(React, 'useContext').mockReturnValue(mockThemeContext);

    const { result } = renderHook(() => useTheme());

    expect(result.current.toggleTheme).toBeDefined();
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('debounces theme toggle calls', () => {
    // Mock the useContext to return the mock context
    jest.spyOn(React, 'useContext').mockReturnValue(mockThemeContext);

    const { result } = renderHook(() => useTheme());

    // Call toggleTheme multiple times rapidly
    act(() => {
      result.current.toggleTheme();
      result.current.toggleTheme();
      result.current.toggleTheme();
    });

    // The original toggleTheme should not be called immediately
    expect(mockThemeContext.toggleTheme).not.toHaveBeenCalled();

    // Fast-forward time to trigger the debounced call
    act(() => {
      jest.advanceTimersByTime(150);
    });

    // The original toggleTheme should be called only once
    expect(mockThemeContext.toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('cancels previous debounced calls when new calls are made', () => {
    // Mock the useContext to return the mock context
    jest.spyOn(React, 'useContext').mockReturnValue(mockThemeContext);

    const { result } = renderHook(() => useTheme());

    // Call toggleTheme
    act(() => {
      result.current.toggleTheme();
    });

    // Wait a bit but not enough to trigger the call
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Call toggleTheme again (should cancel the previous call)
    act(() => {
      result.current.toggleTheme();
    });

    // Wait for the debounce delay
    act(() => {
      jest.advanceTimersByTime(150);
    });

    // Should only be called once (the second call)
    expect(mockThemeContext.toggleTheme).toHaveBeenCalledTimes(1);
  });
});
