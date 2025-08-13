import React from 'react';
import { renderHook } from '@testing-library/react';
import { useTheme } from '../useTheme';

// Mock the ThemeContext
const mockThemeContext = {
  theme: 'light' as const,
  toggleTheme: jest.fn(),
};

jest.mock('../../contexts/ThemeContext', () => ({
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', { 'data-testid': 'theme-provider' }, children),
  },
}));

describe('useTheme', () => {
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
});
