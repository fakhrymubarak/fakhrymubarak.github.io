import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../Layout';

// Mock the Header component
jest.mock('../Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Header</header>;
  };
});

// Mock the useAnalytics hook
jest.mock('../../hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackPageView: jest.fn(),
  }),
}));

describe('Layout', () => {
  const renderWithRouter = (ui: React.ReactNode, initialEntries = ['/']) =>
    render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>);

  it('renders header and main content', () => {
    renderWithRouter(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('renders children in main element', () => {
    renderWithRouter(
      <Layout>
        <div data-testid="test-child">Test Child</div>
      </Layout>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('has proper app container structure', () => {
    renderWithRouter(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const appContainer = screen.getByText('Content').closest('.app');
    expect(appContainer).toBeInTheDocument();
  });

  it('renders multiple children correctly', () => {
    renderWithRouter(
      <Layout>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </Layout>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });
});
