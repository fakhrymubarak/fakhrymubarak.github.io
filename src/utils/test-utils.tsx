import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AllTheProviders } from './test-providers';

// Mock all-image imports
jest.mock(
  '@/assets/images/avatars/img_avatar.webp',
  () => 'mocked-avatar-image'
);
jest.mock(
  '@/assets/images/avatars/img_avatar_footer.webp',
  () => 'mocked-footer-avatar-image'
);
jest.mock(
  '@/assets/images/projects/img_mytelkomsel.webp',
  () => 'mocked-mytelkomsel-image'
);
jest.mock(
  '@/assets/images/projects/img_alkhairaat.webp',
  () => 'mocked-alkhairaat-image'
);
jest.mock(
  '@/assets/images/projects/img_chakra_loyalty.webp',
  () => 'mocked-chakra-loyalty-image'
);
jest.mock(
  '@/assets/images/projects/img_hress.webp',
  () => 'mocked-hress-image'
);
jest.mock(
  '@/assets/images/projects/img_lifelog.webp',
  () => 'mocked-lifelog-image'
);
jest.mock(
  '@/assets/images/projects/img_shafa_web.webp',
  () => 'mocked-shafa-web-image'
);
jest.mock(
  '@/assets/images/projects/img_showcase_v1.webp',
  () => 'mocked-showcase-v1-image'
);
jest.mock(
  '@/assets/images/projects/img_akuisisi_loyalty.webp',
  () => 'mocked-akuisisi-loyalty-image'
);

// Mock all image files generically
jest.mock('*.webp', () => 'mocked-webp-image');
jest.mock('*.png', () => 'mocked-png-image');
jest.mock('*.jpg', () => 'mocked-jpg-image');
jest.mock('*.jpeg', () => 'mocked-jpeg-image');
jest.mock('*.svg', () => 'mocked-svg-image');

// Mock all icon imports
jest.mock(
  '@/assets/icons/companies/ic_akuisisi_loyalty.webp',
  () => 'mocked-ic-akuisisi-loyalty'
);
jest.mock(
  '@/assets/icons/companies/ic_alkhairaat.webp',
  () => 'mocked-ic-alkhairaat'
);
jest.mock(
  '@/assets/icons/companies/ic_bangkit.webp',
  () => 'mocked-ic-bangkit'
);
jest.mock(
  '@/assets/icons/companies/ic_chakra_loyalty.webp',
  () => 'mocked-ic-chakra-loyalty'
);
jest.mock('@/assets/icons/companies/ic_crm.webp', () => 'mocked-ic-crm');
jest.mock(
  '@/assets/icons/companies/ic_hress_crm.webp',
  () => 'mocked-ic-hress-crm'
);
jest.mock(
  '@/assets/icons/companies/ic_lifelog.webp',
  () => 'mocked-ic-lifelog'
);
jest.mock(
  '@/assets/icons/companies/ic_mytelkomsel.webp',
  () => 'mocked-ic-mytelkomsel'
);
jest.mock(
  '@/assets/icons/companies/ic_phincon.webp',
  () => 'mocked-ic-phincon'
);
jest.mock(
  '@/assets/icons/companies/ic_shafa_25.webp',
  () => 'mocked-ic-shafa-25'
);
jest.mock(
  '@/assets/icons/companies/ic_showcase_v1.webp',
  () => 'mocked-ic-showcase-v1'
);

// Mock tech icons
jest.mock(
  '@/assets/icons/tech/ic_android_dark.svg',
  () => 'mocked-android-dark-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_android_light.svg',
  () => 'mocked-android-light-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_flutter_dark.svg',
  () => 'mocked-flutter-dark-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_flutter_light.svg',
  () => 'mocked-flutter-light-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_java_dark.svg',
  () => 'mocked-java-dark-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_java_light.svg',
  () => 'mocked-java-light-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_kotlin_dark.svg',
  () => 'mocked-kotlin-dark-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_kotlin_light.svg',
  () => 'mocked-kotlin-light-icon'
);

// Mock CSS modules
jest.mock('*.css', () => ({}));
jest.mock('*.scss', () => ({}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
    span: ({ children, ...props }: React.ComponentProps<'span'>) => (
      <span {...props}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock react-helmet-async
jest.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock firebase
jest.mock('@/config/firebase', () => ({
  analytics: {
    logEvent: jest.fn(),
  },
}));

// Mock the analytics hook
jest.mock('@hooks/useAnalytics.ts', () => ({
  useAnalytics: jest.fn(() => ({
    trackEvent: jest.fn(),
    trackPageView: jest.fn(),
    trackButtonClick: jest.fn(),
    trackProjectView: jest.fn(),
    trackContactClick: jest.fn(),
  })),
}));

// Mock the theme hook
jest.mock('@hooks/useTheme.ts', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    toggleTheme: jest.fn(),
  })),
}));

// Mock the accessibility hook
jest.mock('@hooks/useAccessibility.ts', () => ({
  useAccessibility: jest.fn((options: { onEscape?: () => void } = {}) => ({
    containerRef: { current: null },
    handleKeyDown: jest.fn((event: KeyboardEvent) => {
      if (event.key === 'Escape' && options.onEscape) {
        options.onEscape();
      }
    }),
  })),
  accessibilityUtils: {
    announce: jest.fn(),
  },
}));

// Mock the portfolio data
jest.mock('@data/portfolio.ts', () => ({
  portfolioData: {
    introduction: {
      title: ['Hi, I am', 'Fakhry Mubarak'],
      subtitle: 'Software Engineer specializing in Android Development',
      description: 'Test description',
      imagePath: 'mocked-avatar-image',
      techStack: [
        {
          name: 'Android',
          icon: {
            light: 'mocked-android-light-icon',
            dark: 'mocked-android-dark-icon',
          },
          color: '#3DDC84',
        },
      ],
    },
    projects: [
      {
        id: 'react-project',
        title: 'React Project',
        description: 'A React project',
        image: 'mocked-image',
        logo: 'mocked-logo',
        link: 'https://example.com',
        stacks: ['React', 'TypeScript', 'Tailwind CSS'],
        featured: true,
        hasGithub: true,
        githubUrl: 'https://github.com/example/react-project',
        period: '2023 - 2024',
      },
      {
        id: 'vue-project',
        title: 'Vue Project',
        description: 'A Vue project',
        image: 'mocked-image',
        logo: 'mocked-logo',
        link: 'https://example.com',
        stacks: ['Vue.js', 'JavaScript', 'Vite'],
        featured: false,
        hasGithub: true,
        githubUrl: 'https://github.com/example/vue-project',
        period: '2023 - 2024',
      },
      {
        id: 'angular-project',
        title: 'Angular Project',
        description: 'An Angular project',
        image: 'mocked-image',
        logo: 'mocked-logo',
        link: 'https://example.com',
        stacks: ['Angular', 'TypeScript', 'Jest'],
        featured: false,
        hasGithub: false,
        githubUrl: '',
        period: '2023 - 2024',
      },
    ],
    companies: [],
    footer: {
      contacts: [],
      socialMedia: [],
      contactImage: 'mocked-footer-avatar-image',
      signature: 'Test signature',
    },
  },
}));

// Mock the section components
jest.mock('@/components/sections/IntroSection', () => ({
  __esModule: true,
  default: () => <div data-testid="intro-section">Intro Section</div>,
}));

// Conditional mock for ProjectsSection - only mock when not testing ProjectsSection itself
jest.requireActual('@/components/sections/ProjectsSection');
jest.mock('@/components/sections/ProjectsSection', () => {
  const actual = jest.requireActual('@/components/sections/ProjectsSection');
  return {
    __esModule: true,
    default: jest.fn(props => {
      // Check if we're in a ProjectsSection test by looking at the test file name
      const testFile = expect.getState().testPath || '';
      if (testFile.includes('ProjectsSection.test')) {
        // Use the real component for ProjectsSection tests
        return actual.default(props);
      } else {
        // Use mock for other tests (like HomePage)
        return <div data-testid="projects-section">Projects Section</div>;
      }
    }),
  };
});

jest.mock('@/components/sections/ExperienceSection', () => ({
  __esModule: true,
  default: () => <div data-testid="experience-section">Experience Section</div>,
}));

jest.mock('@/components/sections/FooterSection', () => ({
  __esModule: true,
  default: () => <div data-testid="footer-section">Footer Section</div>,
}));

// Mock SEO and SkipLink components
jest.mock('@/components/SEO', () => ({
  __esModule: true,
  default: () => <div data-testid="seo">SEO</div>,
}));

jest.mock('@/components/ui/SkipLink', () => ({
  __esModule: true,
  default: () => <div data-testid="skip-link">Skip Link</div>,
}));

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByType: jest.fn(() => []),
  },
  writable: true,
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  root = null;
  rootMargin = '';
  thresholds = [];
  takeRecords() {
    return [];
  }
} as typeof IntersectionObserver;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
  }),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

// Custom render function that includes providers

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export specific testing library functions
export {
  screen,
  fireEvent,
  waitFor,
  within,
  getByRole,
  getByText,
  getByLabelText,
  getByPlaceholderText,
  getByTestId,
  queryByRole,
  queryByText,
  queryByLabelText,
  queryByPlaceholderText,
  queryByTestId,
  findByRole,
  findByText,
  findByLabelText,
  findByPlaceholderText,
  findByTestId,
  act,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react';

// Override render method
export { customRender as render };

// Test data helpers
export const mockProject = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project description',
  image: '/test-image.webp',
  logo: '/test-logo.webp',
  link: 'https://test-project.com',
  githubUrl: 'https://github.com/test/project',
  hasGithub: true,
  period: '2023 - 2024',
  stacks: ['React', 'TypeScript', 'Tailwind CSS'],
};

export const mockProjects = [
  mockProject,
  {
    ...mockProject,
    id: 'test-project-2',
    title: 'Test Project 2',
    hasGithub: false,
  },
];

export const mockExperience = {
  id: 'test-experience',
  company: 'Test Company',
  position: 'Software Engineer',
  period: '2023 - Present',
  description: 'Test experience description',
  logo: '/test-company-logo.webp',
  technologies: ['React', 'TypeScript'],
};

export const mockExperiences = [
  mockExperience,
  {
    ...mockExperience,
    id: 'test-experience-2',
    company: 'Test Company 2',
  },
];
