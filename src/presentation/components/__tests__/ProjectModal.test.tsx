import {
  render,
  screen,
  fireEvent,
} from '../../../shared/test-utils/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import ProjectModal from '../sections/project/ProjectModal';
import { Project } from '@/domain';

expect.extend(toHaveNoViolations);

// Mock the hooks
jest.mock('@presentation/hooks/useAnalytics', () => ({
  useAnalytics: jest.fn(() => ({
    trackButtonClick: jest.fn(),
  })),
}));

jest.mock('@presentation/hooks/useAccessibility', () => ({
  useAccessibility: () => ({
    containerRef: { current: null },
    handleKeyDown: jest.fn(),
  }),
  accessibilityUtils: {
    announce: jest.fn(),
  },
}));

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'This is a test project description',
  image: '/test-image.jpg',
  logo: '/test-logo.png',
  link: 'https://test-project.com',
  githubUrl: 'https://github.com/test/project',
  hasGithub: true,
  period: '2023 - 2024',
  stacks: ['React', 'TypeScript', 'Tailwind CSS'],
};

const defaultProps = {
  project: mockProject,
  onClose: jest.fn(),
};

describe('ProjectModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock document.body.style
    Object.defineProperty(document.body, 'style', {
      value: {
        overflow: '',
      },
      writable: true,
    });
  });

  afterEach(() => {
    // Clean up body style
    document.body.style.overflow = '';
  });

  describe('Rendering', () => {
    it('renders modal with project information when project is provided', () => {
      render(<ProjectModal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(
        screen.getByText('This is a test project description')
      ).toBeInTheDocument();
      expect(screen.getByText('2023 - 2024')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
    });

    it('renders project image with correct alt text', () => {
      render(<ProjectModal {...defaultProps} />);

      const image = screen.getByAltText(
        'Screenshot of Test Project application'
      );
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/test-image.jpg');
    });

    it('renders project logo with correct alt text', () => {
      render(<ProjectModal {...defaultProps} />);

      const logo = screen.getByAltText('Test Project logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/test-logo.png');
    });

    it('renders View Project button with correct link', () => {
      render(<ProjectModal {...defaultProps} />);

      const viewButton = screen.getByRole('link', {
        name: /view test project project/i,
      });
      expect(viewButton).toBeInTheDocument();
      expect(viewButton).toHaveAttribute('href', 'https://test-project.com');
      expect(viewButton).toHaveAttribute('target', '_blank');
      expect(viewButton).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders GitHub button when project has GitHub URL', () => {
      render(<ProjectModal {...defaultProps} />);

      const githubButton = screen.getByRole('link', {
        name: /view test project source code on github/i,
      });
      expect(githubButton).toBeInTheDocument();
      expect(githubButton).toHaveAttribute(
        'href',
        'https://github.com/test/project'
      );
      expect(githubButton).toHaveAttribute('target', '_blank');
      expect(githubButton).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('does not render GitHub button when project has no GitHub URL', () => {
      const projectWithoutGithub = {
        ...mockProject,
        hasGithub: false,
        githubUrl: undefined,
      };

      render(
        <ProjectModal project={projectWithoutGithub} onClose={jest.fn()} />
      );

      expect(
        screen.queryByRole('link', {
          name: /view test project source code on github/i,
        })
      ).not.toBeInTheDocument();
    });

    it('does not render when project is null', () => {
      const { container } = render(
        <ProjectModal project={null} onClose={jest.fn()} />
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe('User Interactions', () => {
    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn();
      render(<ProjectModal project={mockProject} onClose={onClose} />);

      const closeButton = screen.getByRole('button', {
        name: /close project modal/i,
      });
      fireEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking outside the modal', () => {
      const onClose = jest.fn();
      render(<ProjectModal project={mockProject} onClose={onClose} />);

      const backdrop = screen.getByRole('dialog');
      fireEvent.click(backdrop);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when clicking inside the modal content', () => {
      const onClose = jest.fn();
      render(<ProjectModal project={mockProject} onClose={onClose} />);

      const modalContent = screen.getByRole('document');
      fireEvent.click(modalContent);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('tracks button clicks when View Project is clicked', () => {
      const { useAnalytics } = jest.requireMock(
        '@presentation/hooks/useAnalytics'
      );
      const mockTrackButtonClick = jest.fn();
      useAnalytics.mockReturnValue({ trackButtonClick: mockTrackButtonClick });

      render(<ProjectModal {...defaultProps} />);

      const viewButton = screen.getByRole('link', {
        name: /view test project project/i,
      });
      fireEvent.click(viewButton);

      expect(mockTrackButtonClick).toHaveBeenCalledWith(
        'view_project_from_modal',
        'project_Test Project'
      );
    });

    it('tracks button clicks when GitHub button is clicked', () => {
      const { useAnalytics } = jest.requireMock(
        '@presentation/hooks/useAnalytics'
      );
      const mockTrackButtonClick = jest.fn();
      useAnalytics.mockReturnValue({ trackButtonClick: mockTrackButtonClick });

      render(<ProjectModal {...defaultProps} />);

      const githubButton = screen.getByRole('link', {
        name: /view test project source code on github/i,
      });
      fireEvent.click(githubButton);

      expect(mockTrackButtonClick).toHaveBeenCalledWith(
        'view_github',
        'project_Test Project'
      );
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ProjectModal {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper ARIA attributes', () => {
      render(<ProjectModal {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'project-modal-title');
      expect(dialog).toHaveAttribute(
        'aria-describedby',
        'project-modal-description'
      );

      const title = screen.getByText('Test Project');
      expect(title).toHaveAttribute('id', 'project-modal-title');

      const description = screen.getByText(
        'This is a test project description'
      );
      expect(description).toHaveAttribute('id', 'project-modal-description');
    });

    it('has proper focus management', () => {
      render(<ProjectModal {...defaultProps} />);

      const modalContent = screen.getByRole('document');
      expect(modalContent).toHaveAttribute('tabIndex', '-1');
    });

    it('announces modal opening to screen readers', () => {
      const { accessibilityUtils } = jest.requireMock(
        '@presentation/hooks/useAccessibility'
      );
      render(<ProjectModal {...defaultProps} />);

      expect(accessibilityUtils.announce).toHaveBeenCalledWith(
        'Project modal opened: Test Project'
      );
    });

    it('announces modal closing to screen readers', () => {
      const { accessibilityUtils } = jest.requireMock(
        '@presentation/hooks/useAccessibility'
      );
      const onClose = jest.fn();
      render(<ProjectModal project={mockProject} onClose={onClose} />);

      const closeButton = screen.getByRole('button', {
        name: /close project modal/i,
      });
      fireEvent.click(closeButton);

      expect(accessibilityUtils.announce).toHaveBeenCalledWith(
        'Project modal closed'
      );
    });
  });

  describe('Body Scroll Management', () => {
    it('disables body scroll when modal opens', () => {
      render(<ProjectModal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when modal unmounts', () => {
      const { unmount } = render(<ProjectModal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      expect(document.body.style.overflow).toBe('unset');
    });

    it('does not disable body scroll when project is null', () => {
      render(<ProjectModal project={null} onClose={jest.fn()} />);

      // When project is null, the modal doesn't render, so body scroll should remain unchanged
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Tech Stack Display', () => {
    it('renders all tech stack items with proper styling', () => {
      render(<ProjectModal {...defaultProps} />);

      const techStackContainer = screen.getByRole('list', {
        name: /technologies used/i,
      });
      expect(techStackContainer).toBeInTheDocument();

      mockProject.stacks.forEach(stack => {
        const stackItem = screen.getByText(stack);
        expect(stackItem).toBeInTheDocument();
        expect(stackItem).toHaveClass(
          'px-3',
          'py-1',
          'bg-primary-coral/10',
          'text-primary-coral'
        );
      });
    });

    it('has proper list semantics for tech stack', () => {
      render(<ProjectModal {...defaultProps} />);

      const techStackContainer = screen.getByRole('list', {
        name: /technologies used/i,
      });
      const stackItems = screen.getAllByRole('listitem');

      expect(techStackContainer).toBeInTheDocument();
      expect(stackItems).toHaveLength(mockProject.stacks.length);
    });
  });
});
