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

  it('executes theme toggle calls immediately', () => {
    // Mock the useContext to return the mock context
    jest.spyOn(React, 'useContext').mockReturnValue(mockThemeContext);

    const { result } = renderHook(() => useTheme());

    // Call toggleTheme
    act(() => {
      result.current.toggleTheme();
    });

    // The original toggleTheme should be called immediately
    expect(mockThemeContext.toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('executes multiple theme toggle calls sequentially', () => {
    // Mock the useContext to return the mock context
    jest.spyOn(React, 'useContext').mockReturnValue(mockThemeContext);

    const { result } = renderHook(() => useTheme());

    // Call toggleTheme
    act(() => {
      result.current.toggleTheme();
      result.current.toggleTheme();
    });

    // Should be called twice
    expect(mockThemeContext.toggleTheme).toHaveBeenCalledTimes(2);
  });
});
