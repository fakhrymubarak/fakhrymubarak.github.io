import { renderHook } from '@testing-library/react';
import React from 'react';
import { useTranslations } from '../useTranslations';
import { LanguageProvider } from '@application/store/LanguageContext.tsx';

const wrapperFor =
  (lang: 'id' | 'en') =>
  ({ children }: { children: React.ReactNode }) =>
    React.createElement(LanguageProvider, { initialLanguage: lang }, children);

describe('useTranslations', () => {
  beforeEach(() => localStorage.clear());

  it('returns Indonesian strings under id', () => {
    const { result } = renderHook(() => useTranslations(), {
      wrapper: wrapperFor('id'),
    });
    expect(result.current.nav.projects).toBe('Proyek');
  });

  it('returns English strings under en', () => {
    const { result } = renderHook(() => useTranslations(), {
      wrapper: wrapperFor('en'),
    });
    expect(result.current.nav.projects).toBe('Projects');
  });
});
