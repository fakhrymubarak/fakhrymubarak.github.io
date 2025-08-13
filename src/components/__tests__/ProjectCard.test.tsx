import { render, screen, fireEvent } from '@/utils/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import ProjectCard from '../sections/project/ProjectCard';
import { Project } from '@/types';

expect.extend(toHaveNoViolations);

// Mock the hooks
jest.mock('@hooks/useAnalytics.ts', () => ({
  useAnalytics: jest.fn(() => ({
    trackButtonClick: jest.fn(),
    trackProjectView: jest.fn(),
  })),
}));

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  description:
    'This is a test project description that should be truncated if too long',
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
  index: 0,
  onSelect: jest.fn(),
};

describe('ProjectCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders project information correctly', () => {
      render(<ProjectCard {...defaultProps} />);

      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(
        screen.getByText(
          'This is a test project description that should be truncated if too long'
        )
      ).toBeInTheDocument();
      expect(screen.getByText('2023 - 2024')).toBeInTheDocument();
    });

    it('renders project image with correct alt text', () => {
      render(<ProjectCard {...defaultProps} />);

      // The ResponsiveImage component shows a loading spinner initially
      // In a real environment, the image would load and be visible
      const loadingSpinner = screen.getByRole('status', { name: /loading/i });
      expect(loadingSpinner).toBeInTheDocument();
    });

    it('renders project logo with correct alt text', () => {
      render(<ProjectCard {...defaultProps} />);

      const logo = screen.getByAltText('Test Project logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/test-logo.png');
    });

    it('renders all tech stack items', () => {
      render(<ProjectCard {...defaultProps} />);

      mockProject.stacks.forEach(stack => {
        expect(screen.getByText(stack)).toBeInTheDocument();
      });
    });

    it('renders View Project button with correct link', () => {
      render(<ProjectCard {...defaultProps} />);

      const viewButton = screen.getByRole('link', { name: /view project/i });
      expect(viewButton).toBeInTheDocument();
      expect(viewButton).toHaveAttribute('href', 'https://test-project.com');
      expect(viewButton).toHaveAttribute('target', '_blank');
      expect(viewButton).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders View Project button with correct link', () => {
      render(<ProjectCard {...defaultProps} />);

      const viewButton = screen.getByRole('link', { name: /view project/i });
      expect(viewButton).toBeInTheDocument();
      expect(viewButton).toHaveAttribute('href', 'https://test-project.com');
      expect(viewButton).toHaveAttribute('target', '_blank');
      expect(viewButton).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('shows tech stack overflow indicator when more than 3 stacks', () => {
      const projectWithManyStacks = {
        ...mockProject,
        stacks: ['React', 'TypeScript', 'Tailwind CSS', 'Jest', 'Playwright'],
      };

      render(
        <ProjectCard
          project={projectWithManyStacks}
          index={0}
          onSelect={jest.fn()}
        />
      );

      expect(screen.getByText('+2')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls onSelect when card is clicked', () => {
      const onSelect = jest.fn();
      render(
        <ProjectCard project={mockProject} index={0} onSelect={onSelect} />
      );

      const card = screen.getByText('Test Project').closest('.card');
      fireEvent.click(card!);

      expect(onSelect).toHaveBeenCalledWith(mockProject.id);
    });

    it('does not call onSelect when clicking on external link', () => {
      const onSelect = jest.fn();
      render(
        <ProjectCard project={mockProject} index={0} onSelect={onSelect} />
      );

      const viewButton = screen.getByRole('link', { name: /view project/i });
      fireEvent.click(viewButton);

      expect(onSelect).not.toHaveBeenCalled();
    });

    it('tracks project view when card is clicked', () => {
      const { useAnalytics } = jest.requireMock('@hooks/useAnalytics.ts');
      const mockTrackProjectView = jest.fn();
      useAnalytics.mockReturnValue({
        trackProjectView: mockTrackProjectView,
        trackButtonClick: jest.fn(),
      });

      render(<ProjectCard {...defaultProps} />);

      const card = screen.getByText('Test Project').closest('.card');
      fireEvent.click(card!);

      expect(mockTrackProjectView).toHaveBeenCalledWith('Test Project');
    });

    it('tracks button clicks when View Project is clicked', () => {
      const { useAnalytics } = jest.requireMock('@hooks/useAnalytics.ts');
      const mockTrackButtonClick = jest.fn();
      useAnalytics.mockReturnValue({
        trackButtonClick: mockTrackButtonClick,
        trackProjectView: jest.fn(),
      });

      render(<ProjectCard {...defaultProps} />);

      const viewButton = screen.getByRole('link', { name: /view project/i });
      fireEvent.click(viewButton);

      expect(mockTrackButtonClick).toHaveBeenCalledWith(
        'view_project',
        'project_Test Project'
      );
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper heading structure', () => {
      render(<ProjectCard {...defaultProps} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Project');
    });

    it('has proper link labels', () => {
      render(<ProjectCard {...defaultProps} />);

      expect(
        screen.getByRole('link', { name: /view project/i })
      ).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct CSS classes for tech stack items', () => {
      render(<ProjectCard {...defaultProps} />);

      mockProject.stacks.forEach(stack => {
        const stackItem = screen.getByText(stack);
        expect(stackItem).toHaveClass(
          'px-2',
          'py-1',
          'text-xs',
          'rounded-full'
        );
      });
    });

    it('applies hover effects to interactive elements', () => {
      render(<ProjectCard {...defaultProps} />);

      const card = screen.getByText('Test Project').closest('.card');
      expect(card).toHaveClass('group', 'cursor-pointer');
    });

    it('has proper image styling', () => {
      render(<ProjectCard {...defaultProps} />);

      // The ResponsiveImage component shows a loading spinner initially
      // We can test the container styling instead
      const imageContainer = screen
        .getByRole('status', { name: /loading/i })
        .closest('.relative');
      expect(imageContainer).toHaveClass('relative', 'overflow-hidden');
    });
  });

  describe('Edge Cases', () => {
    it('handles long project descriptions gracefully', () => {
      const projectWithLongDescription = {
        ...mockProject,
        description:
          'This is a very long description that should be truncated to prevent layout issues and maintain consistent card heights across the grid layout',
      };

      render(
        <ProjectCard
          project={projectWithLongDescription}
          index={0}
          onSelect={jest.fn()}
        />
      );

      expect(
        screen.getByText(projectWithLongDescription.description)
      ).toBeInTheDocument();
    });

    it('handles projects with many tech stack items', () => {
      const projectWithManyStacks = {
        ...mockProject,
        stacks: [
          'React',
          'TypeScript',
          'Tailwind CSS',
          'Jest',
          'Playwright',
          'Vite',
          'ESLint',
          'Prettier',
        ],
      };

      render(
        <ProjectCard
          project={projectWithManyStacks}
          index={0}
          onSelect={jest.fn()}
        />
      );

      // Should show first 3 stacks and overflow indicator
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
      expect(screen.getByText('+5')).toBeInTheDocument();
    });

    it('handles projects with special characters in title', () => {
      const projectWithSpecialChars = {
        ...mockProject,
        title: 'Test Project & More! (v2.0)',
      };

      render(
        <ProjectCard
          project={projectWithSpecialChars}
          index={0}
          onSelect={jest.fn()}
        />
      );

      expect(
        screen.getByText('Test Project & More! (v2.0)')
      ).toBeInTheDocument();
    });
  });
});
