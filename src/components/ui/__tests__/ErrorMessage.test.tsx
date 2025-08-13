import { render, screen, fireEvent } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error message with default props', () => {
    render(<ErrorMessage message="Test error message" />);

    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders with different types', () => {
    const { rerender } = render(
      <ErrorMessage message="Test error" type="error" />
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();

    rerender(<ErrorMessage message="Test warning" type="warning" />);
    expect(screen.getByText('Test warning')).toBeInTheDocument();

    rerender(<ErrorMessage message="Test info" type="info" />);
    expect(screen.getByText('Test info')).toBeInTheDocument();
  });

  it('renders with retry button when onRetry is provided', () => {
    const handleRetry = jest.fn();

    render(<ErrorMessage message="Test error message" onRetry={handleRetry} />);

    const retryButton = screen.getByRole('button', { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
  });

  it('handles retry button click', () => {
    const handleRetry = jest.fn();

    render(<ErrorMessage message="Test error message" onRetry={handleRetry} />);

    const retryButton = screen.getByRole('button', { name: /retry/i });
    fireEvent.click(retryButton);

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('renders with custom className', () => {
    const { container } = render(
      <ErrorMessage
        message="Test error message"
        className="custom-error-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-error-class');
  });

  it('renders without retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Test error message" />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
