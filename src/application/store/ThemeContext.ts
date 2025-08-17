import { createContext } from 'react';
import type { ThemeContextType } from '@domain/models/theme.ts';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
