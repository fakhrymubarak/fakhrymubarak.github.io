import { screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import CertificateFilter from '../CertificateFilter';
import { render } from '../../../../utils/test-utils';

expect.extend(toHaveNoViolations);

describe('CertificateFilter', () => {
  const mockSkillFilters = ['React', 'TypeScript', 'JavaScript', 'CSS'];
  const mockStatusFilters = ['active', 'expired'];
  const mockTypeFilters = ['course', 'award', 'professional'];
  const mockOnSkillFilterChange = jest.fn();
  const mockOnStatusFilterChange = jest.fn();
  const mockOnTypeFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders all filter sections with headers', () => {
      render(
        <CertificateFilter
          skillFilters={mockSkillFilters}
          statusFilters={mockStatusFilters}
          typeFilters={mockTypeFilters}
          activeSkillFilter="all"
          activeStatusFilter="all"
          activeTypeFilter="all"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );

      // Check section headers
      expect(screen.getByText('Filter by Skills')).toBeInTheDocument();
      expect(screen.getByText('Filter by Status')).toBeInTheDocument();
      expect(screen.getByText('Filter by Type')).toBeInTheDocument();

      // Check "All" buttons
      expect(
        screen.getByRole('button', { name: /all skills/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /all status/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /all types/i })
      ).toBeInTheDocument();

      // Check skill filter buttons
      expect(
        screen.getByRole('button', { name: /react/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /typescript/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /javascript/i })
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /css/i })).toBeInTheDocument();

      // Check status filter buttons
      expect(
        screen.getByRole('button', { name: /active/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /expired/i })
      ).toBeInTheDocument();

      // Check type filter buttons
      expect(
        screen.getByRole('button', { name: /course/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /award/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /professional/i })
      ).toBeInTheDocument();
    });

    it('renders correct number of filter buttons', () => {
      render(
        <CertificateFilter
          skillFilters={mockSkillFilters}
          statusFilters={mockStatusFilters}
          typeFilters={mockTypeFilters}
          activeSkillFilter="all"
          activeStatusFilter="all"
          activeTypeFilter="all"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );

      const buttons = screen.getAllByRole('button');
      // 3 "All" buttons + 4 skill buttons + 2 status buttons + 3 type buttons = 12 total
      expect(buttons).toHaveLength(12);
    });
  });

  describe('Active Filter Styling', () => {
    it('applies active styling to "All Skills" when activeSkillFilter is "all"', () => {
      render(
        <CertificateFilter
          skillFilters={mockSkillFilters}
          statusFilters={mockStatusFilters}
          typeFilters={mockTypeFilters}
          activeSkillFilter="all"
          activeStatusFilter="all"
          activeTypeFilter="all"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );

      const allSkillsButton = screen.getByRole('button', {
        name: /all skills/i,
      });
      expect(allSkillsButton).toHaveClass('bg-primary-coral', 'text-white');
    });

    it('applies active styling to specific skill filter when activeSkillFilter matches', () => {
      render(
        <CertificateFilter
          skillFilters={mockSkillFilters}
          statusFilters={mockStatusFilters}
          typeFilters={mockTypeFilters}
          activeSkillFilter="React"
          activeStatusFilter="all"
          activeTypeFilter="all"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );

      const reactButton = screen.getByRole('button', { name: /react/i });
      expect(reactButton).toHaveClass('bg-primary-coral', 'text-white');
    });

    it('applies active styling to status filter when activeStatusFilter matches', () => {
      render(
        <CertificateFilter
          skillFilters={mockSkillFilters}
          statusFilters={mockStatusFilters}
          typeFilters={mockTypeFilters}
          activeSkillFilter="all"
          activeStatusFilter="active"
          activeTypeFilter="all"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );

      const activeButton = screen.getByRole('button', { name: /active/i });
      expect(activeButton).toHaveClass('bg-primary-coral', 'text-white');
    });

    it('applies active styling to type filter when activeTypeFilter matches', () => {
      render(
        <CertificateFilter
          skillFilters={mockSkillFilters}
          statusFilters={mockStatusFilters}
          typeFilters={mockTypeFilters}
          activeSkillFilter="all"
          activeStatusFilter="all"
          activeTypeFilter="course"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );

      const courseButton = screen.getByRole('button', { name: /course/i });
      expect(courseButton).toHaveClass('bg-primary-coral', 'text-white');
    });
  });

  describe('Filter Interaction', () => {
    it('calls onSkillFilterChange with "all" when "All Skills" is clicked', () => {
      render(
        <CertificateFilter
          skillFilters={mockSkillFilters}
          statusFilters={mockStatusFilters}
          typeFilters={mockTypeFilters}
          activeSkillFilter="React"
          activeStatusFilter="all"
          activeTypeFilter="all"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );

      const allSkillsButton = screen.getByRole('button', {
        name: /all skills/i,
      });
      fireEvent.click(allSkillsButton);

      expect(mockOnSkillFilterChange).toHaveBeenCalledWith('all');
    });

    it('calls onStatusFilterChange with "all" when "All Status" is clicked', () => {
      render(
        <CertificateFilter
          skillFilters={mockSkillFilters}
          statusFilters={mockStatusFilters}
          typeFilters={mockTypeFilters}
          activeSkillFilter="all"
          activeStatusFilter="active"
          activeTypeFilter="all"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );

      const allStatusButton = screen.getByRole('button', {
        name: /all status/i,
      });
      fireEvent.click(allStatusButton);

      expect(mockOnStatusFilterChange).toHaveBeenCalledWith('all');
    });

    it('calls onTypeFilterChange with "all" when "All Types" is clicked', () => {
      render(
        <CertificateFilter
          skillFilters={mockSkillFilters}
          statusFilters={mockStatusFilters}
          typeFilters={mockTypeFilters}
          activeSkillFilter="all"
          activeStatusFilter="all"
          activeTypeFilter="course"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );

      const allTypesButton = screen.getByRole('button', { name: /all types/i });
      fireEvent.click(allTypesButton);

      expect(mockOnTypeFilterChange).toHaveBeenCalledWith('all');
    });

    it('calls appropriate filter change functions when filter buttons are clicked', () => {
      render(
        <CertificateFilter
          skillFilters={mockSkillFilters}
          statusFilters={mockStatusFilters}
          typeFilters={mockTypeFilters}
          activeSkillFilter="all"
          activeStatusFilter="all"
          activeTypeFilter="all"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );

      const typescriptButton = screen.getByRole('button', {
        name: /typescript/i,
      });
      const activeButton = screen.getByRole('button', { name: /active/i });
      const awardButton = screen.getByRole('button', { name: /award/i });

      fireEvent.click(typescriptButton);
      fireEvent.click(activeButton);
      fireEvent.click(awardButton);

      expect(mockOnSkillFilterChange).toHaveBeenCalledWith('TypeScript');
      expect(mockOnStatusFilterChange).toHaveBeenCalledWith('active');
      expect(mockOnTypeFilterChange).toHaveBeenCalledWith('award');
    });
  });

  describe('Empty Filters', () => {
    it('renders only "All" buttons when no filters are provided', () => {
      render(
        <CertificateFilter
          skillFilters={[]}
          statusFilters={[]}
          typeFilters={[]}
          activeSkillFilter="all"
          activeStatusFilter="all"
          activeTypeFilter="all"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );

      expect(
        screen.getByRole('button', { name: /all skills/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /all status/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /all types/i })
      ).toBeInTheDocument();
      expect(screen.getAllByRole('button')).toHaveLength(3);
    });
  });

  describe('Accessibility', () => {
    it('should not have any accessibility violations', async () => {
      const { container } = render(
        <CertificateFilter
          skillFilters={mockSkillFilters}
          statusFilters={mockStatusFilters}
          typeFilters={mockTypeFilters}
          activeSkillFilter="all"
          activeStatusFilter="all"
          activeTypeFilter="all"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper button roles', () => {
      render(
        <CertificateFilter
          skillFilters={mockSkillFilters}
          statusFilters={mockStatusFilters}
          typeFilters={mockTypeFilters}
          activeSkillFilter="all"
          activeStatusFilter="all"
          activeTypeFilter="all"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeInTheDocument();
      });
    });

    it('has proper section headers', () => {
      render(
        <CertificateFilter
          skillFilters={mockSkillFilters}
          statusFilters={mockStatusFilters}
          typeFilters={mockTypeFilters}
          activeSkillFilter="all"
          activeStatusFilter="all"
          activeTypeFilter="all"
          onSkillFilterChange={mockOnSkillFilterChange}
          onStatusFilterChange={mockOnStatusFilterChange}
          onTypeFilterChange={mockOnTypeFilterChange}
        />
      );

      expect(screen.getByText('Filter by Skills')).toBeInTheDocument();
      expect(screen.getByText('Filter by Status')).toBeInTheDocument();
      expect(screen.getByText('Filter by Type')).toBeInTheDocument();
    });
  });
});
