import { render, screen, fireEvent } from '@testing-library/react';
import FooterSection from '../FooterSection';

// Mock the portfolio data
jest.mock('@domain/services/portfolio', () => ({
  portfolioData: {
    footer: {
      socialMedia: [
        {
          name: 'Instagram',
          url: 'https://instagram.com/test',
          icon: 'instagram',
        },
        {
          name: 'LinkedIn',
          url: 'https://linkedin.com/test',
          icon: 'linkedin',
        },
        { name: 'GitHub', url: 'https://github.com/test', icon: 'github' },
        { name: 'YouTube', url: 'https://youtube.com/test', icon: 'youtube' },
      ],
      contacts: [
        {
          type: 'resume',
          label: 'Download Resume',
          url: 'https://example.com/resume',
          icon: 'download',
        },
        {
          type: 'email',
          label: 'Write Email',
          url: 'mailto:test@example.com',
          icon: 'mail',
        },
        {
          type: 'whatsapp',
          label: 'WhatsApp',
          url: 'https://whatsapp.com/test',
          icon: 'message-circle',
        },
      ],
      signature: '© 2024 Fakhry Mubarak. All rights reserved.',
      contactImage: 'test-image.webp',
    },
  },
}));

// Mock the ResponsiveImage component
jest.mock('../../ui/ResponsiveImage', () => {
  return function MockResponsiveImage({
    src,
    alt,
  }: {
    src: string;
    alt: string;
  }) {
    return <img src={src} alt={alt} data-testid="responsive-image" />;
  };
});

// Mock the useAnalytics hook
const mockTrackContactClick = jest.fn();
const mockTrackButtonClick = jest.fn();
jest.mock('../../../hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackContactClick: mockTrackContactClick,
    trackButtonClick: mockTrackButtonClick,
  }),
}));

describe('FooterSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the footer section', () => {
    render(<FooterSection />);

    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders the profile image', () => {
    render(<FooterSection />);

    expect(screen.getByAltText('Contact me')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<FooterSection />);

    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('YouTube')).toBeInTheDocument();
  });

  it('renders contact links', () => {
    render(<FooterSection />);

    expect(screen.getByText('Download Resume')).toBeInTheDocument();
    expect(screen.getByText('Write Email')).toBeInTheDocument();
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
  });

  it('renders contact links with correct URLs', () => {
    render(<FooterSection />);

    const resumeLink = screen.getByRole('link', { name: /download resume/i });
    const emailLink = screen.getByRole('link', { name: /write email/i });
    const whatsappLink = screen.getByRole('link', { name: /whatsapp/i });

    expect(resumeLink).toHaveAttribute('href', 'https://example.com/resume');
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
    expect(whatsappLink).toHaveAttribute('href', 'https://whatsapp.com/test');
  });

  it('renders copyright text', () => {
    render(<FooterSection />);

    expect(screen.getByText(/© 2024 Fakhry Mubarak/)).toBeInTheDocument();
  });

  it('tracks contact clicks', () => {
    render(<FooterSection />);

    const emailLink = screen.getByRole('link', { name: /write email/i });
    fireEvent.click(emailLink);

    expect(mockTrackContactClick).toHaveBeenCalledWith('email');
  });

  it('tracks social media clicks', () => {
    render(<FooterSection />);

    const githubLink = screen.getByLabelText('GitHub');
    fireEvent.click(githubLink);

    expect(mockTrackButtonClick).toHaveBeenCalledWith(
      'social_github',
      'footer'
    );
  });

  it('has proper accessibility attributes', () => {
    render(<FooterSection />);

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      if (link.getAttribute('target') === '_blank') {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });
  });

  it('renders with proper heading structure', () => {
    render(<FooterSection />);

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders social links with icons', () => {
    render(<FooterSection />);

    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThan(0);
  });
});
