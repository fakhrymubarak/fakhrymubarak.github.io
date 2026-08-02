import React, { useContext } from 'react';
import { render, screen, act } from '@testing-library/react';
import { LanguageProvider } from '../LanguageContext.tsx';
import { LanguageContext } from '../LanguageContext.ts';

const Probe: React.FC = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) return null;
  return (
    <div>
      <span data-testid="lang">{ctx.language}</span>
      <button onClick={ctx.toggleLanguage}>toggle</button>
      <button onClick={() => ctx.setLanguage('en')}>set-en</button>
    </div>
  );
};

describe('LanguageProvider', () => {
  beforeEach(() => localStorage.clear());

  it('defaults to Indonesian when nothing is stored', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang').textContent).toBe('id');
    expect(document.documentElement.lang).toBe('id');
  });

  it('reads a stored language', () => {
    localStorage.setItem('language', 'en');
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang').textContent).toBe('en');
  });

  it('honors initialLanguage over storage default', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang').textContent).toBe('en');
  });

  it('toggleLanguage flips and persists', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    act(() => screen.getByText('toggle').click());
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(localStorage.getItem('language')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('setLanguage sets explicitly', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    act(() => screen.getByText('set-en').click());
    expect(screen.getByTestId('lang').textContent).toBe('en');
  });
});
