import { screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import CertificateModal from '../CertificateModal';
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
  description:
    'This is a test certificate description with detailed information about the certification.',
  certificateUrl: 'https://example.com/certificate',
  credentialId: 'TEST123456',
  issueDate: '2023-01-15',
  status: 'active' as const,
  skills: ['React', 'TypeScript', 'Testing', 'JavaScript'],
  categoryType: 'course' as const,
};

describe('CertificateModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders certificate title', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      expect(screen.getByText('Test Certificate')).toBeInTheDocument();
    });

    it('renders certificate description', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      expect(
        screen.getByText(
          'This is a test certificate description with detailed information about the certification.'
        )
      ).toBeInTheDocument();
    });

    it('renders credential ID', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      expect(screen.getByText('TEST123456')).toBeInTheDocument();
    });

    it('renders issue date', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      expect(screen.getByText('2023-01-15')).toBeInTheDocument();
    });

    it('renders all skills', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });

    it('renders status badge', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('renders view certificate button', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      expect(
        screen.getByRole('link', { name: /view test certificate certificate/i })
      ).toBeInTheDocument();
    });

    it('renders close button', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      expect(
        screen.getByRole('button', { name: /close certificate modal/i })
      ).toBeInTheDocument();
    });
  });

  describe('Status Display', () => {
    it('shows active status correctly', () => {
      render(
        <CertificateModal
          certificate={{ ...mockCertificate, status: 'active' }}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('shows expired status correctly', () => {
      render(
        <CertificateModal
          certificate={{ ...mockCertificate, status: 'expired' }}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Expired')).toBeInTheDocument();
    });
  });

  describe('Modal Interaction', () => {
    it('calls onClose when close button is clicked', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      const closeButton = screen.getByRole('button', {
        name: /close certificate modal/i,
      });
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onClose when backdrop is clicked', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      const backdrop = screen.getByRole('dialog');
      fireEvent.click(backdrop);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('does not call onClose when modal content is clicked', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      const modalContent = screen
        .getByText('Test Certificate')
        .closest('[role="document"]');
      if (modalContent) {
        fireEvent.click(modalContent);
      }

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('External Link', () => {
    it('opens certificate URL in new tab', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      const viewButton = screen.getByRole('link', {
        name: /view test certificate certificate/i,
      });
      expect(viewButton).toHaveAttribute(
        'href',
        'https://example.com/certificate'
      );
      expect(viewButton).toHaveAttribute('target', '_blank');
      expect(viewButton).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Section Headers', () => {
    it('renders all section headers', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Skills & Technologies')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should not have any accessibility violations', async () => {
      const { container } = render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper modal role', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has proper button labels', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      expect(
        screen.getByRole('button', { name: /close certificate modal/i })
      ).toBeInTheDocument();
    });

    it('has proper link attributes', () => {
      render(
        <CertificateModal certificate={mockCertificate} onClose={mockOnClose} />
      );

      const viewButton = screen.getByRole('link', {
        name: /view test certificate certificate/i,
      });
      expect(viewButton).toHaveAttribute('target', '_blank');
      expect(viewButton).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
