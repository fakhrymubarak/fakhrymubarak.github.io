import { useContext, useCallback, useRef } from 'react';
import { ThemeContext } from '@/application';
import type { ThemeContextType } from '@domain/models/theme.ts';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const debouncedToggleTheme = useCallback(() => {
    // Clear any existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Debounce the theme toggle by 150ms
    debounceTimeoutRef.current = setTimeout(() => {
      context.toggleTheme();
    }, 150);
  }, [context]);

  return {
    ...context,
    toggleTheme: debouncedToggleTheme,
  };
};
