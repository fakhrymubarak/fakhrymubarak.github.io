import {
  render,
  screen,
  fireEvent,
  mockProject,
} from '../../../../../shared/test-utils/test-utils';
import ProjectModal from '../ProjectModal';

describe('ProjectModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    // Mock document.body.style
    Object.defineProperty(document.body, 'style', {
      value: {
        overflow: '',
      },
      writable: true,
    });
  });

  it('renders nothing when project is null', () => {
    const { container } = render(
      <ProjectModal project={null} onClose={mockOnClose} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders modal with project details when project is provided', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    // Instead of role="dialog", we check if the modal content exists in the document
    expect(document.querySelector('.fixed.inset-0')).toBeInTheDocument();
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    expect(screen.getByText(mockProject.period)).toBeInTheDocument();
  });

  it('renders project image and logo', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const projectImage = screen.getByAltText(
      `Screenshot of ${mockProject.title} application`
    );
    const projectLogo = screen.getByAltText(`${mockProject.title} logo`);

    expect(projectImage).toBeInTheDocument();
    expect(projectImage).toHaveAttribute('src', mockProject.image);
    expect(projectLogo).toBeInTheDocument();
    expect(projectLogo).toHaveAttribute('src', mockProject.logo);
  });

  it('renders tech stack items', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    mockProject.stacks.forEach(stack => {
      expect(screen.getByText(stack)).toBeInTheDocument();
    });
  });

  it('renders view project button with correct link', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const viewProjectButton = screen.getByRole('link', {
      name: /view project/i,
    });
    expect(viewProjectButton).toBeInTheDocument();
    expect(viewProjectButton).toHaveAttribute('href', mockProject.link);
    expect(viewProjectButton).toHaveAttribute('target', '_blank');
    expect(viewProjectButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders GitHub button when project has GitHub', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const githubButton = screen.getByRole('link', {
      name: '', // The GitHub link has no text, only an icon
    });
    expect(githubButton).toBeInTheDocument();
    expect(githubButton).toHaveAttribute('href', mockProject.githubUrl);
  });

  it('does not render GitHub button when project has no GitHub', () => {
    const projectWithoutGithub = {
      ...mockProject,
      hasGithub: false,
      githubUrl: undefined,
    };
    render(
      <ProjectModal project={projectWithoutGithub} onClose={mockOnClose} />
    );

    // Filter links by href to ensure the GitHub link is not present
    const links = screen.getAllByRole('link');
    const githubLinks = links.filter(
      link => link.getAttribute('href') === mockProject.githubUrl
    );
    expect(githubLinks).toHaveLength(0);
  });

  it('calls onClose when close button is clicked', () => {
    jest.useFakeTimers();
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    // Advance past the 300ms protection period
    jest.advanceTimersByTime(300);

    const closeButton = document.querySelector('button');
    if (closeButton) {
      fireEvent.click(closeButton);
    }

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('calls onClose when backdrop is clicked', () => {
    jest.useFakeTimers();
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    // Advance past the 300ms protection period
    jest.advanceTimersByTime(300);

    const backdrop = document.querySelector('.fixed.inset-0');
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('does not call onClose when modal content is clicked', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const modalContent = document.querySelector('.bg-light-surface');
    if (modalContent) {
      fireEvent.click(modalContent);
    }

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
