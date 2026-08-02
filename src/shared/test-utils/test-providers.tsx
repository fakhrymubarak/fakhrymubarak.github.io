import React from 'react';
import { ThemeProvider } from '../../application/store/ThemeContext.tsx';
import { LanguageProvider } from '../../application/store/LanguageContext.tsx';

// Custom render function that includes providers.
// Default the language to English so existing string assertions keep passing;
// i18n-specific tests wrap with their own LanguageProvider initialLanguage.
export const AllTheProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <LanguageProvider initialLanguage="en">
      <ThemeProvider>{children}</ThemeProvider>
    </LanguageProvider>
  );
};
