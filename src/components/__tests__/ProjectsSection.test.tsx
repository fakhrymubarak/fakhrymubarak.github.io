import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/utils/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import ProjectsSection from '../sections/ProjectsSection';

expect.extend(toHaveNoViolations);

// Remove local mocks - use global mocks from test-utils instead

// Remove local mock - use global mock from test-utils instead

describe('ProjectsSection', () => {
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
    document.body.style.overflow = '';
  });

  describe('Rendering', () => {
    it('renders section with proper heading', () => {
      render(<ProjectsSection />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        /projects/i
      );
    });

    it('renders all projects initially', () => {
      render(<ProjectsSection />);

      expect(screen.getByText('React Project')).toBeInTheDocument();
      expect(screen.getByText('Vue Project')).toBeInTheDocument();
      expect(screen.getByText('Angular Project')).toBeInTheDocument();
    });

    it('renders filter buttons for all unique stacks', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      // Should render "All" button plus unique stacks
      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /react/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /typescript/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /tailwind css/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /vue\.js/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /javascript/i })
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /vite/i })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /angular/i })
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /jest/i })).toBeInTheDocument();
    });

    it('highlights "All" button by default', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      const allButton = screen.getByRole('button', { name: /all/i });
      expect(allButton).toHaveClass('bg-primary-coral', 'text-white');
    });
  });

  describe('Filtering Functionality', () => {
    it('filters projects when React stack is selected', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      const reactButton = screen.getByRole('button', { name: /react/i });
      fireEvent.click(reactButton);

      expect(screen.getByText('React Project')).toBeInTheDocument();
      expect(screen.queryByText('Vue Project')).not.toBeInTheDocument();
      expect(screen.queryByText('Angular Project')).not.toBeInTheDocument();
    });

    it('filters projects when TypeScript stack is selected', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      const typescriptButton = screen.getByRole('button', {
        name: /typescript/i,
      });
      fireEvent.click(typescriptButton);

      expect(screen.getByText('React Project')).toBeInTheDocument();
      expect(screen.getByText('Angular Project')).toBeInTheDocument();
      expect(screen.queryByText('Vue Project')).not.toBeInTheDocument();
    });

    it('shows all projects when "All" is selected', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      // First filter by React
      const reactButton = screen.getByRole('button', { name: /react/i });
      fireEvent.click(reactButton);

      // Then select "All"
      const allButton = screen.getByRole('button', { name: /all/i });
      fireEvent.click(allButton);

      expect(screen.getByText('React Project')).toBeInTheDocument();
      expect(screen.getByText('Vue Project')).toBeInTheDocument();
      expect(screen.getByText('Angular Project')).toBeInTheDocument();
    });

    it('updates filter button states when filtering', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      const reactButton = screen.getByRole('button', { name: /react/i });
      fireEvent.click(reactButton);

      expect(reactButton).toHaveClass('bg-primary-coral', 'text-white');

      const allButton = screen.getByRole('button', { name: /all/i });
      expect(allButton).toHaveClass('bg-light-surface', 'dark:bg-dark-surface');
    });
  });

  describe('Modal Functionality', () => {
    it('opens modal when Learn More is clicked on a project card', () => {
      render(<ProjectsSection />);

      // Click on the first project card to open modal
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      // Modal should be open
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(
        screen.getByText('React Project', { selector: 'h2' })
      ).toBeInTheDocument();
    });

    it('opens modal when project card is clicked', () => {
      render(<ProjectsSection />);

      // Click on the first project card to open modal
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      // Modal should be open
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(
        screen.getByText('React Project', { selector: 'h2' })
      ).toBeInTheDocument();
    });

    it('closes modal when close button is clicked', () => {
      render(<ProjectsSection />);

      // Open modal by clicking the first project card
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      // Verify modal is open
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Close modal
      const closeButton = screen.getByRole('button', {
        name: /close project modal/i,
      });
      fireEvent.click(closeButton);

      // Verify modal is closed
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes modal when clicking outside the modal', () => {
      render(<ProjectsSection />);

      // Open modal by clicking the first project card
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      // Verify modal is open
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Click outside modal
      const backdrop = screen.getByRole('dialog');
      fireEvent.click(backdrop);

      // Verify modal is closed
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('shows correct project information in modal', () => {
      render(<ProjectsSection />);

      // Open modal for React Project by clicking the card
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      // Verify modal content
      expect(
        screen.getByText('React Project', { selector: 'h2' })
      ).toBeInTheDocument();
      expect(
        screen.getByText('A React project', {
          selector: '#project-modal-description',
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText('2023 - 2024', { selector: 'span' })
      ).toBeInTheDocument();
      expect(
        screen.getByText('React', { selector: '[role="listitem"]' })
      ).toBeInTheDocument();
      expect(
        screen.getByText('TypeScript', { selector: '[role="listitem"]' })
      ).toBeInTheDocument();
      expect(
        screen.getByText('Tailwind CSS', { selector: '[role="listitem"]' })
      ).toBeInTheDocument();
    });

    it('disables body scroll when modal is open', () => {
      render(<ProjectsSection />);

      // Open modal by clicking the first project card
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when modal is closed', () => {
      render(<ProjectsSection />);

      // Open modal by clicking the first project card
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      expect(document.body.style.overflow).toBe('hidden');

      // Close modal
      const closeButton = screen.getByRole('button', {
        name: /close project modal/i,
      });
      fireEvent.click(closeButton);

      expect(document.body.style.overflow).toBe('unset');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ProjectsSection />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper semantic structure', () => {
      render(<ProjectsSection />);

      const section = screen.getByRole('region', { name: /projects/i });
      expect(section).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      render(<ProjectsSection />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent(/projects/i);
    });

    it('announces modal opening to screen readers', () => {
      const { accessibilityUtils } = jest.requireMock(
        '@hooks/useAccessibility.ts'
      );
      render(<ProjectsSection />);

      // Open modal by clicking the first project card
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      expect(accessibilityUtils.announce).toHaveBeenCalledWith(
        'Project modal opened: React Project'
      );
    });
  });

  describe('Integration Scenarios', () => {
    it('filters and opens modal for filtered project', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      // Filter by React
      const reactButton = screen.getByRole('button', { name: /react/i });
      fireEvent.click(reactButton);

      // Only React project should be visible
      expect(screen.getByText('React Project')).toBeInTheDocument();
      expect(screen.queryByText('Vue Project')).not.toBeInTheDocument();

      // Open modal for the filtered project by clicking the card
      const reactProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(reactProjectCard!);

      // Modal should show React project details
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(
        screen.getByText('React Project', { selector: 'h2' })
      ).toBeInTheDocument();
    });

    it('maintains filter state when modal is opened and closed', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      // Filter by TypeScript
      const typescriptButton = screen.getByRole('button', {
        name: /typescript/i,
      });
      fireEvent.click(typescriptButton);

      // Open and close modal by clicking the first project card
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      const closeButton = screen.getByRole('button', {
        name: /close project modal/i,
      });
      fireEvent.click(closeButton);

      // Filter should still be active
      expect(typescriptButton).toHaveClass('bg-primary-coral', 'text-white');
      expect(screen.getByText('React Project')).toBeInTheDocument();
      expect(screen.getByText('Angular Project')).toBeInTheDocument();
      expect(screen.queryByText('Vue Project')).not.toBeInTheDocument();
    });

    it('handles multiple rapid filter changes', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      const reactButton = screen.getByRole('button', { name: /react/i });
      const typescriptButton = screen.getByRole('button', {
        name: /typescript/i,
      });
      const allButton = screen.getByRole('button', { name: /all/i });

      // Rapid filter changes
      fireEvent.click(reactButton);
      fireEvent.click(typescriptButton);
      fireEvent.click(allButton);

      // Should show all projects
      expect(screen.getByText('React Project')).toBeInTheDocument();
      expect(screen.getByText('Vue Project')).toBeInTheDocument();
      expect(screen.getByText('Angular Project')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles projects with no GitHub URL', () => {
      render(<ProjectsSection />);

      // Angular project has no GitHub URL
      const angularProject = screen.getByText('Angular Project');
      expect(angularProject).toBeInTheDocument();

      // Open modal for Angular project by clicking the card
      const angularProjectCard = screen
        .getByText('Angular Project')
        .closest('.card');
      fireEvent.click(angularProjectCard!);

      // Modal should not have GitHub button
      expect(
        screen.queryByRole('link', {
          name: /view angular project source code on github/i,
        })
      ).not.toBeInTheDocument();
    });

    it('handles projects with different stack combinations', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      // All unique stacks should be available as filter options
      const uniqueStacks = [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Vue.js',
        'JavaScript',
        'Vite',
        'Angular',
        'Jest',
      ];

      uniqueStacks.forEach(stack => {
        expect(
          screen.getByRole('button', { name: new RegExp(stack, 'i') })
        ).toBeInTheDocument();
      });
    });
  });
});
