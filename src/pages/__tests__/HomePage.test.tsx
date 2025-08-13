import { render, screen } from '../../utils/test-utils';
import HomePage from '../HomePage';

// Remove local mocks - use global mocks from test-utils instead

describe('HomePage Component', () => {
  it('renders all main sections', () => {
    render(<HomePage />);

    expect(screen.getByTestId('intro-section')).toBeInTheDocument();
    expect(screen.getByTestId('projects-section')).toBeInTheDocument();
    expect(screen.getByTestId('experience-section')).toBeInTheDocument();
    expect(screen.getByTestId('footer-section')).toBeInTheDocument();
  });

  it('renders with proper layout structure', () => {
    render(<HomePage />);

    // Check for main container
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    // Check for proper section ordering
    const sections = screen.getAllByTestId(/section$/);
    expect(sections).toHaveLength(4);
  });

  it('has proper semantic HTML structure', () => {
    render(<HomePage />);

    // Check for main landmark
    expect(screen.getByRole('main')).toBeInTheDocument();

    // Check for proper heading hierarchy (if any)
    // This will depend on the actual content of the sections
  });

  it('renders without errors', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<HomePage />);

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('has proper accessibility attributes', () => {
    render(<HomePage />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('renders consistently across renders', () => {
    const { rerender } = render(<HomePage />);

    expect(screen.getByTestId('intro-section')).toBeInTheDocument();
    expect(screen.getByTestId('projects-section')).toBeInTheDocument();

    rerender(<HomePage />);

    expect(screen.getByTestId('intro-section')).toBeInTheDocument();
    expect(screen.getByTestId('projects-section')).toBeInTheDocument();
  });
});
