export type Locale = 'id' | 'en';

export interface LanguageContextType {
  language: Locale;
  setLanguage: (language: Locale) => void;
  toggleLanguage: () => void;
}
