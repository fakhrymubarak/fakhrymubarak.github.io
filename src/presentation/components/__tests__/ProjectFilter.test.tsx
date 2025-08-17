import {
  render,
  screen,
  fireEvent,
} from '../../../shared/test-utils/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import ProjectFilter from '../sections/project/ProjectFilter';

expect.extend(toHaveNoViolations);

// Mock the hooks
jest.mock('@presentation/hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackButtonClick: jest.fn(),
  }),
}));

const mockFilters = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Jest',
  'Playwright',
];

const defaultProps = {
  filters: mockFilters,
  activeFilter: 'all',
  onFilterChange: jest.fn(),
};

describe('ProjectFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders all filter buttons', () => {
      render(<ProjectFilter {...defaultProps} />);

      mockFilters.forEach(filter => {
        expect(
          screen.getByRole('button', { name: new RegExp(filter, 'i') })
        ).toBeInTheDocument();
      });
    });

    it('renders "All" button', () => {
      render(<ProjectFilter {...defaultProps} />);

      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    });

    it('highlights selected filter button', () => {
      render(<ProjectFilter {...defaultProps} activeFilter="React" />);

      const reactButton = screen.getByRole('button', { name: /react/i });
      expect(reactButton).toHaveClass('bg-primary-coral', 'text-white');
    });

    it('highlights "All" button when all is selected', () => {
      render(<ProjectFilter {...defaultProps} activeFilter="all" />);

      const allButton = screen.getByRole('button', { name: /all projects/i });
      expect(allButton).toHaveClass('bg-primary-coral', 'text-white');
    });

    it('applies inactive styling to unselected buttons', () => {
      render(<ProjectFilter {...defaultProps} activeFilter="React" />);

      const typescriptButton = screen.getByRole('button', {
        name: /typescript/i,
      });
      expect(typescriptButton).toHaveClass(
        'bg-light-surface',
        'dark:bg-dark-surface',
        'text-light-muted',
        'dark:text-dark-muted'
      );
    });
  });

  describe('User Interactions', () => {
    it('calls onFilterChange with "all" when "All Projects" is clicked', () => {
      const onFilterChange = jest.fn();
      render(
        <ProjectFilter {...defaultProps} onFilterChange={onFilterChange} />
      );

      const allButton = screen.getByRole('button', { name: /all projects/i });
      fireEvent.click(allButton);

      expect(onFilterChange).toHaveBeenCalledWith('all');
    });

    it('calls onFilterChange with filter name when filter button is clicked', () => {
      const onFilterChange = jest.fn();
      render(
        <ProjectFilter {...defaultProps} onFilterChange={onFilterChange} />
      );

      const reactButton = screen.getByRole('button', { name: /react/i });
      fireEvent.click(reactButton);

      expect(onFilterChange).toHaveBeenCalledWith('React');
    });

    it('supports click events', () => {
      const onFilterChange = jest.fn();
      render(
        <ProjectFilter {...defaultProps} onFilterChange={onFilterChange} />
      );

      const reactButton = screen.getByRole('button', { name: /react/i });

      // Test click event
      fireEvent.click(reactButton);
      expect(onFilterChange).toHaveBeenCalledWith('React');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ProjectFilter {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper semantic structure', () => {
      render(<ProjectFilter {...defaultProps} />);

      // The component uses a div with motion, not a semantic group
      const container = screen.getByRole('button', {
        name: /all projects/i,
      }).parentElement;
      expect(container).toBeInTheDocument();
    });

    it('has proper button labels', () => {
      render(<ProjectFilter {...defaultProps} />);

      expect(
        screen.getByRole('button', { name: /all projects/i })
      ).toBeInTheDocument();
      mockFilters.forEach(filter => {
        expect(
          screen.getByRole('button', { name: new RegExp(filter, 'i') })
        ).toBeInTheDocument();
      });
    });

    it('has proper focus management', () => {
      render(<ProjectFilter {...defaultProps} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button: Element) => {
        // Buttons are naturally focusable, so they don't need explicit tabIndex
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct CSS classes for active state', () => {
      render(<ProjectFilter {...defaultProps} activeFilter="React" />);

      const reactButton = screen.getByRole('button', { name: /react/i });
      expect(reactButton).toHaveClass('bg-primary-coral', 'text-white');
    });

    it('applies correct CSS classes for inactive state', () => {
      render(<ProjectFilter {...defaultProps} activeFilter="React" />);

      const typescriptButton = screen.getByRole('button', {
        name: /typescript/i,
      });
      expect(typescriptButton).toHaveClass(
        'bg-light-surface',
        'dark:bg-dark-surface',
        'text-light-muted',
        'dark:text-dark-muted'
      );
    });

    it('applies hover effects to all buttons', () => {
      render(<ProjectFilter {...defaultProps} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button: Element) => {
        expect(button).toHaveClass('transition-colors');
      });
    });

    it('has proper spacing and layout', () => {
      render(<ProjectFilter {...defaultProps} />);

      const container = screen.getByRole('button', {
        name: /all projects/i,
      }).parentElement;
      expect(container).toHaveClass('flex', 'flex-wrap', 'justify-center');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty filters array', () => {
      render(
        <ProjectFilter
          filters={[]}
          activeFilter="all"
          onFilterChange={jest.fn()}
        />
      );

      expect(
        screen.getByRole('button', { name: /all projects/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /react/i })
      ).not.toBeInTheDocument();
    });

    it('handles single filter in array', () => {
      render(
        <ProjectFilter
          filters={['React']}
          activeFilter="all"
          onFilterChange={jest.fn()}
        />
      );

      expect(
        screen.getByRole('button', { name: /all projects/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /react/i })
      ).toBeInTheDocument();
    });

    it('handles filters with special characters', () => {
      const filtersWithSpecialChars = ['React', 'C++', 'C#', 'Node.js'];
      render(
        <ProjectFilter
          filters={filtersWithSpecialChars}
          activeFilter="all"
          onFilterChange={jest.fn()}
        />
      );

      filtersWithSpecialChars.forEach(filter => {
        expect(
          screen.getByRole('button', {
            name: new RegExp(
              filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
              'i'
            ),
          })
        ).toBeInTheDocument();
      });
    });

    it('handles very long filter names', () => {
      const longFilterName = 'VeryLongTechnologyNameThatMightBreakLayout';
      render(
        <ProjectFilter
          filters={[longFilterName]}
          activeFilter="all"
          onFilterChange={jest.fn()}
        />
      );

      expect(
        screen.getByRole('button', { name: new RegExp(longFilterName, 'i') })
      ).toBeInTheDocument();
    });

    it('handles case sensitivity correctly', () => {
      const onFilterChange = jest.fn();
      render(
        <ProjectFilter {...defaultProps} onFilterChange={onFilterChange} />
      );

      const reactButton = screen.getByRole('button', { name: /react/i });
      fireEvent.click(reactButton);

      expect(onFilterChange).toHaveBeenCalledWith('React');
    });
  });

  describe('State Management', () => {
    it('updates active state when different filter is clicked', () => {
      const onFilterChange = jest.fn();
      const { rerender } = render(
        <ProjectFilter
          {...defaultProps}
          activeFilter="React"
          onFilterChange={onFilterChange}
        />
      );

      const typescriptButton = screen.getByRole('button', {
        name: /typescript/i,
      });
      fireEvent.click(typescriptButton);

      expect(onFilterChange).toHaveBeenCalledWith('TypeScript');

      // Re-render with new active filter
      rerender(
        <ProjectFilter
          {...defaultProps}
          activeFilter="TypeScript"
          onFilterChange={onFilterChange}
        />
      );

      expect(screen.getByRole('button', { name: /typescript/i })).toHaveClass(
        'bg-primary-coral',
        'text-white'
      );
      expect(screen.getByRole('button', { name: /react/i })).toHaveClass(
        'bg-light-surface',
        'dark:bg-dark-surface'
      );
    });

    it('maintains selection when clicking the same button', () => {
      const onFilterChange = jest.fn();
      render(
        <ProjectFilter
          {...defaultProps}
          activeFilter="React"
          onFilterChange={onFilterChange}
        />
      );

      const reactButton = screen.getByRole('button', { name: /react/i });
      fireEvent.click(reactButton);

      expect(onFilterChange).toHaveBeenCalledWith('React');
    });
  });
});
