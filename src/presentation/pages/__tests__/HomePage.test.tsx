// Mock the CertificatesSection component to avoid portfolio data issues
jest.mock('../../components/sections/CertificatesSection', () => {
  return function MockCertificatesSection() {
    return (
      <div data-testid="certificates-section">Mock Certificates Section</div>
    );
  };
});

// Mock ProjectsSection and other sections to ensure presence despite React.lazy
jest.mock('../../components/sections/ProjectsSection', () => ({
  __esModule: true,
  default: () => <div data-testid="projects-section">Projects Section</div>,
}));
jest.mock('../../components/sections/ExperienceSection', () => ({
  __esModule: true,
  default: () => <div data-testid="experience-section">Experience Section</div>,
}));
jest.mock('../../components/sections/FooterSection', () => ({
  __esModule: true,
  default: () => <div data-testid="footer-section">Footer Section</div>,
}));

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

const mockRssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Mock Feed</title>
    <item>
      <title>Test Article</title>
      <link>https://example.com/article</link>
      <guid>article-1</guid>
      <pubDate>Wed, 01 Jan 2024 00:00:00 GMT</pubDate>
      <description><![CDATA[<p>Summary content</p>]]></description>
      <content:encoded><![CDATA[<p>Full content</p>]]></content:encoded>
      <category>testing</category>
    </item>
  </channel>
</rss>`;

const originalFetch = global.fetch;

beforeEach(() => {
  (global as unknown as { fetch: jest.Mock }).fetch = jest
    .fn()
    .mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => mockRssFeed,
    });
});

afterEach(() => {
  (global.fetch as jest.Mock).mockReset();
});

afterAll(() => {
  if (originalFetch) {
    global.fetch = originalFetch;
  } else {
    delete (global as any).fetch;
  }
});

describe('HomePage Component', () => {
  it('renders all main sections', async () => {
    render(<HomePage />);

    expect(screen.getByTestId('intro-section')).toBeInTheDocument();
    expect(await screen.findByTestId('projects-section')).toBeInTheDocument();
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
