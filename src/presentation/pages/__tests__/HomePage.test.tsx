// Mock the CertificatesSection component to avoid portfolio data issues
jest.mock('../../components/sections/CertificatesSection', () => {
  return function MockCertificatesSection() {
    return (
      <div data-testid="certificates-section">Mock Certificates Section</div>
    );
  };
});

// Mock the portfolio data to include certificateCategories
jest.mock('@domain/services/portfolio', () => ({
  portfolioData: {
    introduction: {
      title: ['Test', 'Title'],
      subtitle: 'Test Subtitle',
      description: 'Test Description',
      imagePath: 'test-image.jpg',
      techStack: [],
    },
    projects: [],
    companies: [],
    certificateCategories: [
      {
        type: 'course',
        certificates: [
          {
            id: 'test-certificate',
            title: 'Test Certificate',
            description: 'Test Description',
            certificateUrl: 'https://example.com',
            credentialId: 'TEST123',
            issueDate: '2023-01-01',
            status: 'active',
            type: 'course',
            skills: ['Test', 'Skill'],
          },
        ],
      },
    ],
    footer: {
      socialMedia: [],
      contacts: [],
      signature: 'Test Signature',
      contactImage: 'test-image.jpg',
    },
  },
}));

import { render, screen } from '../../../shared/test-utils/test-utils';
import HomePage from '../HomePage';

describe('HomePage Component', () => {
  it('renders all main sections', () => {
    render(<HomePage />);

    expect(screen.getByTestId('intro-section')).toBeInTheDocument();
    expect(screen.getByTestId('projects-section')).toBeInTheDocument();
    expect(screen.getByTestId('certificates-section')).toBeInTheDocument();
    expect(screen.getByTestId('experience-section')).toBeInTheDocument();
    expect(screen.getByTestId('footer-section')).toBeInTheDocument();
  });

  it('renders with proper layout structure', () => {
    render(<HomePage />);

    // Check for main container
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    // Check for proper section ordering
    const sections = screen.getAllByTestId(/section$/);
    expect(sections).toHaveLength(5);
  });

  it('has proper semantic HTML structure', () => {
    render(<HomePage />);

    // Check for main landmark
    expect(screen.getByRole('main')).toBeInTheDocument();

    // Check for proper heading hierarchy (if any)
    // This will depend on the actual content of the sections
  });

  it('renders without errors', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<HomePage />);

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('has proper accessibility attributes', () => {
    render(<HomePage />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('renders consistently across renders', () => {
    const { rerender } = render(<HomePage />);

    expect(screen.getByTestId('intro-section')).toBeInTheDocument();
    expect(screen.getByTestId('projects-section')).toBeInTheDocument();
    expect(screen.getByTestId('certificates-section')).toBeInTheDocument();

    rerender(<HomePage />);

    expect(screen.getByTestId('intro-section')).toBeInTheDocument();
    expect(screen.getByTestId('projects-section')).toBeInTheDocument();
    expect(screen.getByTestId('certificates-section')).toBeInTheDocument();
  });
});
