import React, { useEffect, useState } from 'react';
import type { Locale } from '@domain/models/i18n.ts';
import { LanguageContext } from '@/application';

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: Locale;
}

const isLocale = (value: string | null): value is Locale =>
  value === 'id' || value === 'en';

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLanguage,
}) => {
  const [language, setLanguage] = useState<Locale>(() => {
    if (initialLanguage) {
      return initialLanguage;
    }
    const saved = localStorage.getItem('language');
    if (isLocale(saved)) {
      return saved;
    }
    return 'id';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'id' ? 'en' : 'id'));
  };

  const value = { language, setLanguage, toggleLanguage };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
