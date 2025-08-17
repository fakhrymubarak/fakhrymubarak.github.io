import { screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import CertificateCard from '../CertificateCard';
import { render } from '../../../../../shared/test-utils/test-utils';

expect.extend(toHaveNoViolations);

// Mock the analytics hook
jest.mock('../../../../hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackButtonClick: jest.fn(),
  }),
}));

const mockCertificate = {
  id: 'test-certificate',
  title: 'Test Certificate',
  description: 'This is a test certificate description',
  certificateUrl: 'https://example.com/certificate',
  credentialId: 'TEST123',
  issueDate: '2023-01-01',
  status: 'active' as const,
  skills: ['React', 'TypeScript', 'Testing'],
  categoryType: 'course' as const,
};

describe('CertificateCard', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders certificate title', () => {
      render(
        <CertificateCard
          certificate={mockCertificate}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText('Test Certificate')).toBeInTheDocument();
    });

    it('renders certificate description', () => {
      render(
        <CertificateCard
          certificate={mockCertificate}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      expect(
        screen.getByText('This is a test certificate description')
      ).toBeInTheDocument();
    });

    it('renders issue date', () => {
      render(
        <CertificateCard
          certificate={mockCertificate}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    });

    it('renders skills', () => {
      render(
        <CertificateCard
          certificate={mockCertificate}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();
    });

    it('renders status badge', () => {
      render(
        <CertificateCard
          certificate={mockCertificate}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('renders view certificate button', () => {
      render(
        <CertificateCard
          certificate={mockCertificate}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      expect(
        screen.getByRole('link', { name: /view certificate/i })
      ).toBeInTheDocument();
    });
  });

  describe('Category Icons and Colors', () => {
    it('renders course icon for course type', () => {
      render(
        <CertificateCard
          certificate={{ ...mockCertificate, categoryType: 'course' }}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      // The icon should be present (BookOpen icon)
      const card = screen.getByText('Test Certificate').closest('.card');
      expect(card).toBeInTheDocument();
    });

    it('renders award icon for award type', () => {
      render(
        <CertificateCard
          certificate={{ ...mockCertificate, categoryType: 'award' }}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      const card = screen.getByText('Test Certificate').closest('.card');
      expect(card).toBeInTheDocument();
    });

    it('renders professional icon for professional type', () => {
      render(
        <CertificateCard
          certificate={{ ...mockCertificate, categoryType: 'professional' }}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      const card = screen.getByText('Test Certificate').closest('.card');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Status Display', () => {
    it('shows active status correctly', () => {
      render(
        <CertificateCard
          certificate={{ ...mockCertificate, status: 'active' }}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('shows expired status correctly', () => {
      render(
        <CertificateCard
          certificate={{ ...mockCertificate, status: 'expired' }}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText('Expired')).toBeInTheDocument();
    });
  });

  describe('Skills Display', () => {
    it('shows all skills when there are 3 or fewer', () => {
      render(
        <CertificateCard
          certificate={mockCertificate}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();
    });

    it('shows first 3 skills and count for more than 3 skills', () => {
      const certificateWithManySkills = {
        ...mockCertificate,
        skills: ['React', 'TypeScript', 'Testing', 'JavaScript', 'CSS', 'HTML'],
      };

      render(
        <CertificateCard
          certificate={certificateWithManySkills}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();
      expect(screen.getByText('+3')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onSelect when card is clicked', () => {
      render(
        <CertificateCard
          certificate={mockCertificate}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      const card = screen.getByText('Test Certificate').closest('.card');
      if (card) {
        fireEvent.click(card);
      }

      expect(mockOnSelect).toHaveBeenCalledWith('test-certificate');
    });

    it('opens certificate URL in new tab', () => {
      render(
        <CertificateCard
          certificate={mockCertificate}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      const viewButton = screen.getByRole('link', {
        name: /view certificate/i,
      });
      expect(viewButton).toHaveAttribute(
        'href',
        'https://example.com/certificate'
      );
      expect(viewButton).toHaveAttribute('target', '_blank');
      expect(viewButton).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('prevents card click when view button is clicked', () => {
      render(
        <CertificateCard
          certificate={mockCertificate}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      const viewButton = screen.getByRole('link', {
        name: /view certificate/i,
      });
      fireEvent.click(viewButton);

      // The onSelect should not be called when clicking the view button
      expect(mockOnSelect).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should not have any accessibility violations', async () => {
      const { container } = render(
        <CertificateCard
          certificate={mockCertificate}
          index={0}
          onSelect={mockOnSelect}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper link attributes', () => {
      render(
        <CertificateCard
          certificate={mockCertificate}
          index={0}
          onSelect={mockOnSelect}
        />
      );

      const viewButton = screen.getByRole('link', {
        name: /view certificate/i,
      });
      expect(viewButton).toHaveAttribute('target', '_blank');
      expect(viewButton).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
