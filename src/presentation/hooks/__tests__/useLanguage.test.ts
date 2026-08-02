import { renderHook } from '@testing-library/react';
import React from 'react';
import { useLanguage } from '../useLanguage';
import { LanguageProvider } from '@application/store/LanguageContext.tsx';

describe('useLanguage', () => {
  beforeEach(() => localStorage.clear());

  it('throws when used outside a LanguageProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useLanguage())).toThrow(
      'useLanguage must be used within a LanguageProvider'
    );
    spy.mockRestore();
  });

  it('returns the context inside a provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(
        LanguageProvider,
        { initialLanguage: 'id' },
        children
      );
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.language).toBe('id');
    expect(typeof result.current.toggleLanguage).toBe('function');
    expect(typeof result.current.setLanguage).toBe('function');
  });
});
