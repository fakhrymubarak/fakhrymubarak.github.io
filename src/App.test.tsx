import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the lazy-loaded components
jest.mock('./pages/HomePage', () => {
  return function MockHomePage() {
    return <div data-testid="home-page">Home Page</div>;
  };
});

// Mock the Layout component
jest.mock('./components/Layout', () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="layout">{children}</div>;
  };
});

// Mock the LoadingSpinner component
jest.mock('./components/ui/LoadingSpinner', () => {
  return function MockLoadingSpinner() {
    return <div data-testid="loading-spinner">Loading...</div>;
  };
});

// Mock the ThemeContext and ThemeProvider
jest.mock('./contexts/ThemeContext', () => ({
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="theme-provider">{children}</div>
    ),
  },
}));

jest.mock('./contexts/ThemeContext.tsx', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

describe('App', () => {
  const renderApp = () => {
    return render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </BrowserRouter>
    );
  };

  it('renders without crashing', async () => {
    renderApp();
    await waitFor(() => {
      expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    });
  });

  it('renders the layout component', async () => {
    renderApp();
    await waitFor(() => {
      expect(screen.getByTestId('layout')).toBeInTheDocument();
    });
  });

  it('renders the home page on root route', async () => {
    renderApp();
    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
  });

  it('has proper routing structure', async () => {
    renderApp();
    // Check that the app structure is correct
    await waitFor(() => {
      expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
      expect(screen.getByTestId('layout')).toBeInTheDocument();
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
  });
});
