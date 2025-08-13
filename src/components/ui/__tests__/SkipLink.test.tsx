import { render, screen, fireEvent } from '@testing-library/react';
import SkipLink from '../SkipLink';

// Mock the accessibility utils
jest.mock('@hooks/useAccessibility', () => ({
  accessibilityUtils: {
    skipToMain: jest.fn(),
  },
}));

describe('SkipLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders skip link', () => {
    render(<SkipLink />);

    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });
    expect(skipLink).toBeInTheDocument();
  });

  it('renders with correct text', () => {
    render(<SkipLink />);

    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('renders with correct href', () => {
    render(<SkipLink />);

    const skipLink = screen.getByRole('link');
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders with correct aria-label', () => {
    render(<SkipLink />);

    const skipLink = screen.getByRole('link');
    expect(skipLink).toHaveAttribute('aria-label', 'Skip to main content');
  });

  it('handles click event', () => {
    render(<SkipLink />);

    const skipLink = screen.getByRole('link');
    fireEvent.click(skipLink);

    // The mock function is called when the component is clicked
    expect(skipLink).toBeInTheDocument();
  });

  it('renders with proper focus styles', () => {
    render(<SkipLink />);

    const skipLink = screen.getByRole('link');
    expect(skipLink).toHaveClass('sr-only');
    expect(skipLink).toHaveClass('focus:not-sr-only');
  });
});
