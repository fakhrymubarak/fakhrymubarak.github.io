import { render, screen } from '@testing-library/react';
import IntroSection from '../IntroSection';

// Mock the portfolio data
jest.mock('@domain/services/portfolio', () => ({
  portfolioData: {
    introduction: {
      title: ['Hi, I am', 'Fakhry Mubarak'],
      subtitle: 'Software Engineer specializing in Android Development',
      description:
        'Mobile Apps focused Software Engineer specializing in app development with over 3.5 years professional experience building scalable softwares. Currently building softwares at PT Phincon. Passionate about clean architecture, SOLID principles, and continuous learning. Experienced in both native Android and Multiplatform Development using Flutter, with strong mentoring and leadership abilities. Open for any challenges and opportunities.',
      imagePath: 'test-avatar.webp',
      techStack: [
        {
          name: 'Android',
          icon: {
            light: 'android-light.svg',
            dark: 'android-dark.svg',
          },
          color: '#3DDC84',
        },
        {
          name: 'Kotlin',
          icon: {
            light: 'kotlin-light.svg',
            dark: 'kotlin-dark.svg',
          },
          color: '#7F52FF',
        },
        {
          name: 'Java',
          icon: {
            light: 'java-light.svg',
            dark: 'java-dark.svg',
          },
          color: '#ED8B00',
        },
        {
          name: 'Flutter',
          icon: {
            light: 'flutter-light.svg',
            dark: 'flutter-dark.svg',
          },
          color: '#02569B',
        },
      ],
    },
    footer: {
      contacts: [
        {
          type: 'resume',
          url: '/resume.pdf',
        },
      ],
    },
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
  },
  LazyMotion: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  domAnimation: {},
  m: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
  },
}));

// Mock useTheme hook
jest.mock('@presentation/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
  }),
}));

// Mock useAnalytics hook
const mockTrackButtonClick = jest.fn();
const mockTrackContactClick = jest.fn();

jest.mock('@presentation/hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackButtonClick: mockTrackButtonClick,
    trackContactClick: mockTrackContactClick,
  }),
}));

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
Object.defineProperty(window, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
});

// Mock querySelector
const mockQuerySelector = jest.fn();
Object.defineProperty(document, 'querySelector', {
  value: mockQuerySelector,
  writable: true,
});

describe('IntroSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the intro section', () => {
    render(<IntroSection />);

    expect(screen.getByText('Hi, I am')).toBeInTheDocument();
    expect(screen.getByText('Fakhry Mubarak')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<IntroSection />);

    expect(
      screen.getByText(/Mobile Apps focused Software Engineer/)
    ).toBeInTheDocument();
  });

  it('renders the profile image', () => {
    render(<IntroSection />);

    const profileImage = screen.getByAltText('Fakhry Mubarak');
    expect(profileImage).toBeInTheDocument();
  });

  it('renders tech stack', () => {
    render(<IntroSection />);

    expect(screen.getByText('Tech Stack')).toBeInTheDocument();
    expect(screen.getByText('Android')).toBeInTheDocument();
  });

  it('renders tech stack icons', () => {
    render(<IntroSection />);

    const androidIcon = screen.getByAltText('Android icon');
    const kotlinIcon = screen.getByAltText('Kotlin icon');
    expect(androidIcon).toBeInTheDocument();
    expect(kotlinIcon).toBeInTheDocument();
  });

  it('renders experience badges', () => {
    render(<IntroSection />);

    expect(screen.getByText('+3.5 yrs')).toBeInTheDocument();
    expect(screen.getByText('+8 projects')).toBeInTheDocument();
  });
});
