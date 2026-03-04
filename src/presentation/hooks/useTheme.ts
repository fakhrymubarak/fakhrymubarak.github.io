import { useContext } from 'react';
import { ThemeContext } from '@/application';
import type { ThemeContextType } from '@domain/models/theme.ts';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
