import {
  render,
  screen,
  fireEvent,
  mockProject,
} from '../../../../utils/test-utils';
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

    expect(screen.getByRole('dialog')).toBeInTheDocument();
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
      name: /view test project project/i,
    });
    expect(viewProjectButton).toBeInTheDocument();
    expect(viewProjectButton).toHaveAttribute('href', mockProject.link);
    expect(viewProjectButton).toHaveAttribute('target', '_blank');
    expect(viewProjectButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders GitHub button when project has GitHub', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const githubButton = screen.getByRole('link', {
      name: /view test project source code on github/i,
    });
    expect(githubButton).toBeInTheDocument();
    expect(githubButton).toHaveAttribute('href', mockProject.githubUrl);
    // The GitHub icon is aria-hidden, so we can't test it directly
    expect(githubButton).toBeInTheDocument();
  });

  it('does not render GitHub button when project has no GitHub', () => {
    const projectWithoutGithub = { ...mockProject, hasGithub: false };
    render(
      <ProjectModal project={projectWithoutGithub} onClose={mockOnClose} />
    );

    expect(
      screen.queryByRole('link', {
        name: /view test project source code on github/i,
      })
    ).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', {
      name: /close project modal/i,
    });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const modalContent = screen.getByRole('document');
    fireEvent.click(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'project-modal-title');
    expect(dialog).toHaveAttribute(
      'aria-describedby',
      'project-modal-description'
    );

    const title = screen.getByText(mockProject.title);
    expect(title).toHaveAttribute('id', 'project-modal-title');

    const description = screen.getByText(mockProject.description);
    expect(description).toHaveAttribute('id', 'project-modal-description');
  });

  it('has proper focus management', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const modalContent = screen.getByRole('document');
    expect(modalContent).toHaveAttribute('tabIndex', '-1');
  });

  it('prevents body scroll when modal is open', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when modal is unmounted', () => {
    const { unmount } = render(
      <ProjectModal project={mockProject} onClose={mockOnClose} />
    );

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('unset');
  });

  it('does not prevent body scroll when project is null', () => {
    render(<ProjectModal project={null} onClose={mockOnClose} />);

    // When project is null, the modal doesn't render, so body scroll should remain unchanged
    expect(document.body.style.overflow).toBe('');
  });

  it('handles keyboard events properly', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const modalContent = screen.getByRole('document');
    // The useAccessibility hook handles the Escape key and calls onClose
    fireEvent.keyDown(modalContent, { key: 'Escape' });

    // The onClose should be called through the useAccessibility hook
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders tech stack with proper ARIA attributes', () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const techStackList = screen.getByRole('list', {
      name: /technologies used/i,
    });
    expect(techStackList).toBeInTheDocument();

    const techStackItems = screen.getAllByRole('listitem');
    expect(techStackItems).toHaveLength(mockProject.stacks.length);
  });
});
