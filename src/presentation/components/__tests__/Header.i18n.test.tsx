import { render, screen, act } from '@testing-library/react';
import Header from '../Header';
import { LanguageProvider } from '@application/store/LanguageContext.tsx';
import { ThemeProvider } from '@application/store/ThemeContext.tsx';

const mockTrackButtonClick = jest.fn();

jest.mock('@/presentation', () => {
  const actual = jest.requireActual('@/presentation');
  return {
    ...actual,
    useAnalytics: () => ({ trackButtonClick: mockTrackButtonClick }),
  };
});

const renderHeader = (lang: 'id' | 'en') =>
  render(
    <LanguageProvider initialLanguage={lang}>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </LanguageProvider>
  );

describe('Header i18n', () => {
  beforeEach(() => {
    localStorage.clear();
    mockTrackButtonClick.mockClear();
  });

  it('shows Indonesian nav labels under id', () => {
    renderHeader('id');
    expect(screen.getAllByText('Beranda').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Proyek').length).toBeGreaterThan(0);
  });

  it('language toggle switches nav labels to English', () => {
    renderHeader('id');
    act(() => screen.getByTestId('language-toggle').click());
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
  });

  it('nav analytics keys are stable across locales', () => {
    // Test Indonesian locale
    let result = renderHeader('id');
    act(() => {
      screen.getAllByText('Beranda')[0].click();
    });
    expect(mockTrackButtonClick).toHaveBeenCalledWith('nav_home', 'header');

    // Clear for next render
    result.unmount();
    mockTrackButtonClick.mockClear();

    // Test English locale
    result = renderHeader('en');
    act(() => {
      screen.getAllByText('Home')[0].click();
    });
    expect(mockTrackButtonClick).toHaveBeenCalledWith('nav_home', 'header');
  });
});
