import { useContext } from 'react';
import { LanguageContext } from '@/application';
import type { LanguageContextType } from '@domain/models/i18n.ts';

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};
