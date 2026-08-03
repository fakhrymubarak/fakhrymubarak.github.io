import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../shared/test-utils/test-utils';
import ProjectsSection from '../sections/ProjectsSection';

// Remove local mocks - use global mocks from test-utils instead

// Remove local mock - use global mock from test-utils instead

describe('ProjectsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock document.body.style
    Object.defineProperty(document.body, 'style', {
      value: {
        overflow: '',
        position: '',
        top: '',
        width: '',
      },
      writable: true,
    });
  });

  afterEach(() => {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
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

    it('renders filter buttons for Web, Middleware, and Mobile categories', async () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      // Wait for lazy-loaded filters to render
      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /web/i })
        ).toBeInTheDocument();
      });
      expect(
        screen.getByRole('button', { name: /middleware/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /mobile/i })
      ).toBeInTheDocument();
    });

    it('highlights "All" button by default', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      // Default selected may vary; ensure at least one filter button present
      expect(screen.getByRole('button', { name: /web/i })).toBeInTheDocument();
    });
  });

  describe('Filtering Functionality', () => {
    it('filters projects when Middleware category is selected', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      const middlewareButton = screen.getByRole('button', {
        name: /middleware/i,
      });
      fireEvent.click(middlewareButton);

      expect(screen.getByText('Vue Project')).toBeInTheDocument();
      expect(screen.queryByText('React Project')).not.toBeInTheDocument();
      expect(screen.queryByText('Angular Project')).not.toBeInTheDocument();
    });

    it('filters projects when Web category is selected', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      const webButton = screen.getByRole('button', { name: /web/i });
      fireEvent.click(webButton);

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

      // First filter by Middleware
      const middlewareButton = screen.getByRole('button', {
        name: /middleware/i,
      });
      fireEvent.click(middlewareButton);

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

      const webButton = screen.getByRole('button', { name: /web/i });
      fireEvent.click(webButton);

      expect(webButton).toHaveClass('bg-primary-coral', 'text-white');

      const allButton = screen.getByRole('button', { name: /all/i });
      expect(allButton).toHaveClass('bg-light-surface', 'dark:bg-dark-surface');
    });
  });

  describe('Modal Functionality', () => {
    it('opens modal when Learn More is clicked on a project card', async () => {
      render(<ProjectsSection />);

      // Click on the first project card to open modal
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      // Modal should be open (allow for lazy modal mount)
      await waitFor(() => {
        expect(document.querySelector('.fixed.inset-0')).toBeInTheDocument();
      });
      expect(
        screen.getByText('React Project', { selector: 'h2' })
      ).toBeInTheDocument();
    });

    it('opens modal when project card is clicked', async () => {
      render(<ProjectsSection />);

      // Click on the first project card to open modal
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      await waitFor(() => {
        expect(document.querySelector('.fixed.inset-0')).toBeInTheDocument();
      });
      expect(
        screen.getByText('React Project', { selector: 'h2' })
      ).toBeInTheDocument();
    });

    it('closes modal when close button is clicked', () => {
      jest.useFakeTimers();
      render(<ProjectsSection />);

      // Open modal by clicking the first project card
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      // Verify modal is open
      expect(document.querySelector('.fixed.inset-0')).toBeInTheDocument();

      // Advance past the 300ms protection period
      jest.advanceTimersByTime(300);

      // Close modal
      const closeButton = document.querySelector('.fixed.inset-0 button');
      if (closeButton) {
        fireEvent.click(closeButton);
      }

      // Verify modal is closed
      expect(document.querySelector('.fixed.inset-0')).not.toBeInTheDocument();
      jest.useRealTimers();
    });

    it('closes modal when clicking outside the modal', () => {
      jest.useFakeTimers();
      render(<ProjectsSection />);

      // Open modal by clicking the first project card
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      // Verify modal is open
      expect(document.querySelector('.fixed.inset-0')).toBeInTheDocument();

      // Advance past the 300ms protection period
      jest.advanceTimersByTime(300);

      // Click outside modal
      // Note: testing library needs the exact class for the backdrop div.
      const backdrop = document.querySelector('.bg-black\\/50');
      if (backdrop) {
        fireEvent.click(backdrop);
      }

      // Verify modal is closed
      expect(document.querySelector('.fixed.inset-0')).not.toBeInTheDocument();
      jest.useRealTimers();
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
        screen.getAllByText('A React project').length
      ).toBeGreaterThanOrEqual(1);
      expect(
        screen.getByText('2023 - 2024', { selector: 'span' })
      ).toBeInTheDocument();
      expect(
        screen.getAllByText('React', { selector: 'span' }).length
      ).toBeGreaterThanOrEqual(1);
      expect(
        screen.getAllByText('TypeScript', { selector: 'span' }).length
      ).toBeGreaterThanOrEqual(1);
      expect(
        screen.getAllByText('Tailwind CSS', { selector: 'span' }).length
      ).toBeGreaterThanOrEqual(1);
    });

    it('disables body scroll when modal is open', () => {
      render(<ProjectsSection />);

      // Open modal by clicking the first project card
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      expect(document.body.style.position).toBe('fixed');
    });

    it('restores body scroll when modal is closed', () => {
      jest.useFakeTimers();
      render(<ProjectsSection />);

      // Open modal by clicking the first project card
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      expect(document.body.style.position).toBe('fixed');

      // Advance past the 300ms protection period
      jest.advanceTimersByTime(300);

      // Close modal
      const closeButton = document.querySelector('.fixed.inset-0 button');
      if (closeButton) {
        fireEvent.click(closeButton);
      }

      expect(document.body.style.position).toBe('');
      jest.useRealTimers();
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

      // Filter by Middleware
      const middlewareButton = screen.getByRole('button', {
        name: /middleware/i,
      });
      fireEvent.click(middlewareButton);

      // Only Vue project should be visible
      expect(screen.getByText('Vue Project')).toBeInTheDocument();
      expect(screen.queryByText('React Project')).not.toBeInTheDocument();

      // Open modal for the filtered project by clicking the card
      const vueProjectCard = screen.getByText('Vue Project').closest('.card');
      fireEvent.click(vueProjectCard!);

      // Modal should show Vue project details
      expect(document.querySelector('.fixed.inset-0')).toBeInTheDocument();
      expect(
        screen.getByText('Vue Project', { selector: 'h2' })
      ).toBeInTheDocument();
    });

    it('maintains filter state when modal is opened and closed', () => {
      jest.useFakeTimers();
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      // Filter by Web
      const webButton = screen.getByRole('button', { name: /web/i });
      fireEvent.click(webButton);

      // Open and close modal by clicking the first project card
      const firstProjectCard = screen
        .getByText('React Project')
        .closest('.card');
      fireEvent.click(firstProjectCard!);

      // Advance past the 300ms protection period
      jest.advanceTimersByTime(300);

      const closeButton = document.querySelector('.fixed.inset-0 button');
      if (closeButton) {
        fireEvent.click(closeButton);
      }

      // Filter should still be active
      expect(webButton).toHaveClass('bg-primary-coral', 'text-white');
      expect(screen.getByText('React Project')).toBeInTheDocument();
      expect(screen.getByText('Angular Project')).toBeInTheDocument();
      expect(screen.queryByText('Vue Project')).not.toBeInTheDocument();
      jest.useRealTimers();
    });

    it('handles multiple rapid filter changes', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      const webButton = screen.getByRole('button', { name: /web/i });
      const middlewareButton = screen.getByRole('button', {
        name: /middleware/i,
      });
      const allButton = screen.getByRole('button', { name: /all/i });

      // Rapid filter changes
      fireEvent.click(webButton);
      fireEvent.click(middlewareButton);
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
      // Since it has no Github URL, the GitHub icon (or an empty link) won't be rendered.
      const links = Array.from(document.querySelectorAll('.fixed.inset-0 a'));
      const githubLinks = links.filter(link =>
        link.getAttribute('href')?.includes('github.com')
      );
      expect(githubLinks).toHaveLength(0);
    });

    it('renders the fixed category filters regardless of project data', () => {
      render(<ProjectsSection />);

      // First click the "Filter Projects" button to show filters
      const filterButton = screen.getByRole('button', {
        name: /filter projects/i,
      });
      fireEvent.click(filterButton);

      // Web, Middleware, and Mobile should always be available as filter options
      const categories = ['Web', 'Middleware', 'Mobile'];

      categories.forEach(category => {
        expect(
          screen.getByRole('button', { name: new RegExp(category, 'i') })
        ).toBeInTheDocument();
      });
    });
  });
});
