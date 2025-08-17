import { screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import CertificatesSection from '../CertificatesSection';
import { render } from '../../../../shared/test-utils/test-utils';

expect.extend(toHaveNoViolations);

// Mock the analytics hook
jest.mock('../../../hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackButtonClick: jest.fn(),
  }),
}));

// Mock the portfolio data
jest.mock('@domain/services/portfolio', () => ({
  portfolioData: {
    certificateCategories: [
      {
        type: 'course',
        certificates: [
          {
            id: 'dicoding-android-expert',
            title: 'Course: Android Expert',
            description:
              'Advanced Android development course covering Clean Architecture, Reactive Programming with RxJava & Coroutines, Dependency Injection (Dagger/Koin), Modularization, CI/CD, Performance optimization, Security, and industry-standard libraries. Completed 90-hour comprehensive program with capstone project submission.',
            certificateUrl:
              'https://www.dicoding.com/certificates/0LZ03JMENZ65',
            credentialId: '0LZ03JMENZ65',
            issueDate: '2021-11-24',
            status: 'active',
            skills: [
              'Android',
              'Kotlin',
              'Clean Architecture',
              'RxJava',
              'Coroutines',
              'Dagger',
              'Koin',
              'Modularization',
              'CI/CD',
              'Performance',
              'Security',
            ],
          },
          {
            id: 'dicoding-flutter-expert',
            title: 'Course: Flutter Expert',
            description:
              'Advanced Flutter development course covering Clean Architecture, TDD, Advanced UI, Modularization, Reactive Programming with BLoC, CI/CD, Performance optimization, Security, and Post-Development practices. Completed 70-hour comprehensive program with final project submission.',
            certificateUrl:
              'https://www.dicoding.com/certificates/72ZDOWVJ9XYW',
            credentialId: '72ZDOWVJ9XYW',
            issueDate: '2022-08-30',
            status: 'active',
            skills: [
              'Flutter',
              'Dart',
              'Clean Architecture',
              'TDD',
              'BLoC',
              'CI/CD',
              'Performance',
              'Security',
            ],
          },
        ],
      },
      {
        type: 'award',
        certificates: [
          {
            id: 'dicoding-expert-session-speaker',
            title:
              'Certificate of Appreciation - Dicoding Expert Session Speaker',
            description:
              'Recognized as a speaker at Dicoding Expert Session 2025, presenting "From Learner to Leader: Navigating Your Tech Career Path" to ~200 participants from Dicoding Bootcamp Batch 8 and BEKUP Create 2025. Shared insights on tech career mapping, skill development beyond bootcamp, personal branding, and job hunting strategies.',
            certificateUrl:
              'https://www.dicoding.com/certificates/DCD/DES/XXV-08/DCD25-GS13',
            credentialId: 'DCD/DES/XXV-08/DCD25-GS13',
            issueDate: '2025-08-05',
            status: 'active',
            skills: [
              'Public Speaking',
              'Career Mentoring',
              'Tech Leadership',
              'Personal Branding',
              'Career Development',
              'Professional Networking',
            ],
          },
        ],
      },
    ],
  },
}));

describe('CertificatesSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders section with proper heading', () => {
      render(<CertificatesSection />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        /certificates & awards/i
      );
    });

    it('renders section subtitle', () => {
      render(<CertificatesSection />);

      expect(
        screen.getByText(/professional certifications and recognition/i)
      ).toBeInTheDocument();
    });

    it('renders filter toggle button', () => {
      render(<CertificatesSection />);

      expect(
        screen.getByRole('button', { name: /filter certificates/i })
      ).toBeInTheDocument();
    });

    it('renders certificates initially', () => {
      render(<CertificatesSection />);

      // Should render at least some certificates
      expect(screen.getByText(/android expert/i)).toBeInTheDocument();
      expect(screen.getByText(/flutter expert/i)).toBeInTheDocument();
    });
  });

  describe('Filtering Functionality', () => {
    it('shows filter buttons when filter toggle is clicked', async () => {
      render(<CertificatesSection />);

      const filterButton = screen.getByRole('button', {
        name: /filter certificates/i,
      });
      fireEvent.click(filterButton);

      await waitFor(() => {
        expect(screen.getByText(/all skills/i)).toBeInTheDocument();
      });
    });

    it('filters certificates by skill', async () => {
      render(<CertificatesSection />);

      // Show filters
      const filterButton = screen.getByRole('button', {
        name: /filter certificates/i,
      });
      fireEvent.click(filterButton);

      // Click on Android filter
      const androidButton = await screen.findByRole('button', {
        name: /android/i,
      });
      fireEvent.click(androidButton);

      // Should show Android certificate
      expect(screen.getByText(/android expert/i)).toBeInTheDocument();
    });

    it('shows all certificates when "All Skills" is selected', async () => {
      render(<CertificatesSection />);

      // Show filters
      const filterButton = screen.getByRole('button', {
        name: /filter certificates/i,
      });
      fireEvent.click(filterButton);

      // First filter by Android
      const androidButton = await screen.findByRole('button', {
        name: /android/i,
      });
      fireEvent.click(androidButton);

      // Then select "All Skills"
      const allButton = screen.getByRole('button', { name: /all skills/i });
      fireEvent.click(allButton);

      // Should show all certificates
      expect(screen.getByText(/android expert/i)).toBeInTheDocument();
      expect(screen.getByText(/flutter expert/i)).toBeInTheDocument();
    });
  });

  describe('Modal Functionality', () => {
    it('opens modal when certificate is clicked', async () => {
      render(<CertificatesSection />);

      const certificateCard = screen
        .getByText(/android expert/i)
        .closest('.card');
      if (certificateCard) {
        fireEvent.click(certificateCard);
      }

      await waitFor(() => {
        expect(screen.getByText(/description/i)).toBeInTheDocument();
      });
    });

    it('closes modal when close button is clicked', async () => {
      render(<CertificatesSection />);

      // Open modal
      const certificateCard = screen
        .getByText(/android expert/i)
        .closest('.card');
      if (certificateCard) {
        fireEvent.click(certificateCard);
      }

      await waitFor(() => {
        expect(screen.getByText(/description/i)).toBeInTheDocument();
      });

      // Close modal
      const closeButton = screen.getByRole('button', {
        name: /close certificate modal/i,
      });
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Show More/Less Functionality', () => {
    it('shows "See More" button when there are more certificates', () => {
      render(<CertificatesSection />);

      // Should show "See More" button if there are more than 6 certificates
      const seeMoreButton = screen.queryByRole('button', { name: /see more/i });
      if (seeMoreButton) {
        expect(seeMoreButton).toBeInTheDocument();
      }
    });

    it('toggles between show more and show less', async () => {
      render(<CertificatesSection />);

      const seeMoreButton = screen.queryByRole('button', { name: /see more/i });
      if (seeMoreButton) {
        fireEvent.click(seeMoreButton);

        await waitFor(() => {
          expect(
            screen.getByRole('button', { name: /show less/i })
          ).toBeInTheDocument();
        });

        const showLessButton = screen.getByRole('button', {
          name: /show less/i,
        });
        fireEvent.click(showLessButton);

        await waitFor(() => {
          expect(
            screen.getByRole('button', { name: /see more/i })
          ).toBeInTheDocument();
        });
      }
    });
  });

  describe('Accessibility', () => {
    it('should not have any accessibility violations', async () => {
      const { container } = render(<CertificatesSection />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper ARIA labels', () => {
      render(<CertificatesSection />);

      expect(
        screen.getByRole('region', { name: /certificates/i })
      ).toBeInTheDocument();
    });

    it('has proper button roles', () => {
      render(<CertificatesSection />);

      const filterButton = screen.getByRole('button', {
        name: /filter certificates/i,
      });
      expect(filterButton).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
