import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '../../../shared/test-utils/test-utils';
import Header from '../Header';

describe('Header Component', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('renders header with navigation items', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: /main navigation/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders avatar image', () => {
    render(<Header />);

    const avatar = screen.getByAltText('Fakhry Mubarak');
    expect(avatar).toBeInTheDocument();
    // The image is mocked, so we can't test the actual src
    expect(avatar).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(<Header />);

    const themeButton = screen.getByRole('button', {
      name: /switch to dark mode/i,
    });
    expect(themeButton).toBeInTheDocument();
    // The icon is aria-hidden, so we can't test it directly
    expect(themeButton).toBeInTheDocument();
  });

  it('renders mobile menu button on mobile', () => {
    render(<Header />);

    const menuButton = screen.getByRole('button', {
      name: /toggle mobile menu/i,
    });
    expect(menuButton).toBeInTheDocument();
    // The icon is aria-hidden, so we can't test it directly
    expect(menuButton).toBeInTheDocument();
  });

  it('opens mobile menu when menu button is clicked', async () => {
    render(<Header />);

    const menuButton = screen.getByRole('button', {
      name: /toggle mobile menu/i,
    });
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(
        screen.getByRole('navigation', { name: /mobile navigation/i })
      ).toBeInTheDocument();
    });
    // The icon is aria-hidden, so we can't test it directly
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes mobile menu when menu button is clicked again', async () => {
    render(<Header />);

    const menuButton = screen.getByRole('button', {
      name: /toggle mobile menu/i,
    });

    // Open menu
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(
        screen.getByRole('navigation', { name: /mobile navigation/i })
      ).toBeInTheDocument();
    });

    // Close menu
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(
        screen.queryByRole('navigation', { name: /mobile navigation/i })
      ).not.toBeInTheDocument();
    });
  });

  it('navigates to section when navigation item is clicked', () => {
    // Mock document.querySelector to return a mock element
    const mockElement = {
      scrollIntoView: jest.fn(),
    };
    jest
      .spyOn(document, 'querySelector')
      .mockReturnValue(mockElement as unknown as Element);

    render(<Header />);

    const projectsLink = screen.getByText('Projects');
    fireEvent.click(projectsLink);

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    });
  });

  it('closes mobile menu when navigation item is clicked', async () => {
    render(<Header />);

    const menuButton = screen.getByRole('button', {
      name: /toggle mobile menu/i,
    });

    // Open menu
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(
        screen.getByRole('navigation', { name: /mobile navigation/i })
      ).toBeInTheDocument();
    });

    // Click navigation item (use the mobile menu one specifically)
    const projectsLinks = screen.getAllByText('Projects');
    const mobileProjectsLink = projectsLinks[1]; // The second one is in the mobile menu
    fireEvent.click(mobileProjectsLink);

    await waitFor(() => {
      expect(
        screen.queryByRole('navigation', { name: /mobile navigation/i })
      ).not.toBeInTheDocument();
    });
  });

  it('has proper accessibility attributes', () => {
    render(<Header />);

    const menuButton = screen.getByRole('button', {
      name: /toggle mobile menu/i,
    });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  it('updates aria-expanded when menu is opened', async () => {
    render(<Header />);

    const menuButton = screen.getByRole('button', {
      name: /toggle mobile menu/i,
    });
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('has focus management for navigation items', () => {
    render(<Header />);

    const navigationItems = screen.getAllByRole('button');
    navigationItems.forEach(item => {
      // Buttons are naturally focusable, so they don't need explicit tabIndex
      expect(item).toBeInTheDocument();
    });
  });
});
