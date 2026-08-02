import { createContext } from 'react';
import type { LanguageContextType } from '@domain/models/i18n.ts';

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
