import { render, screen } from '@testing-library/react';
import ExperienceSection from '../ExperienceSection';

// Mock the portfolio data
jest.mock('@domain/services/portfolio', () => ({
  portfolioData: {
    companies: [
      {
        id: 'phincon',
        name: 'PHINCON',
        logo: 'phincon-logo',
        experiences: [
          {
            id: 'byu-exp',
            title: 'Software Engineer - Backend',
            period: 'Jul 2025 — Present',
            duration: '1 year',
            type: 'full-time',
            highlights: [
              'Maintaining Backend App that using Go Fiber to facilitate API bridging for migrating ByU users.',
              'Enhancing Software Engineering skills by learning Backend using Go Programming Language.',
            ],
          },
          {
            id: 'mytelkomsel-exp',
            title: 'Software Engineer - Android',
            period: 'Jul 2023 — Jun 2025',
            duration: '2 years',
            type: 'full-time',
            highlights: [
              'Crafting Android Application with +100M downloads and ~6M daily active users.',
              'Plan, develop, and build features with SOLID principles with a modular clean architecture using MVVM.',
            ],
          },
        ],
      },
      {
        id: 'crm',
        name: 'PT Cakra Radha Mustika (Kalbe Group)',
        logo: 'crm-logo',
        experiences: [
          {
            id: 'crm-engineer',
            title: 'Software Engineer - Mobile Apps (Android & iOS)',
            period: 'Jan 2022 — Jun 2023',
            duration: '1.5 years',
            type: 'contract',
            highlights: [
              'Migrating Chakra android app data source from vendor server to CRM server (~80 API endpoint)',
              'Migrating app architecture pattern from MVP to MVVM.',
              'Migrating source code language from 100% Java to 97% Kotlin.',
            ],
          },
        ],
      },
    ],
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

describe('ExperienceSection', () => {
  it('renders the experience section', () => {
    render(<ExperienceSection />);

    expect(screen.getByText('EXPERIENCES')).toBeInTheDocument();
  });

  it('renders all company information', () => {
    render(<ExperienceSection />);

    expect(screen.getByText('PHINCON')).toBeInTheDocument();
    expect(
      screen.getByText('PT Cakra Radha Mustika (Kalbe Group)')
    ).toBeInTheDocument();
  });

  it('renders company positions', () => {
    render(<ExperienceSection />);

    expect(screen.getByText('Software Engineer - Backend')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer - Android')).toBeInTheDocument();
    expect(
      screen.getByText('Software Engineer - Mobile Apps (Android & iOS)')
    ).toBeInTheDocument();
  });

  it('renders employment periods', () => {
    render(<ExperienceSection />);

    expect(screen.getByText('Jul 2025 — Present')).toBeInTheDocument();
    expect(screen.getByText('Jul 2023 — Jun 2025')).toBeInTheDocument();
    expect(screen.getByText('Jan 2022 — Jun 2023')).toBeInTheDocument();
  });

  it('renders job descriptions', () => {
    render(<ExperienceSection />);

    expect(screen.getByText(/Maintaining Backend App/)).toBeInTheDocument();
    expect(
      screen.getByText(/Crafting Android Application/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Migrating Chakra android app/)
    ).toBeInTheDocument();
  });

  it('renders company logos', () => {
    render(<ExperienceSection />);

    const images = screen.getAllByAltText(/logo$/);
    expect(images.length).toBeGreaterThan(0);
  });

  it('has proper section structure', () => {
    render(<ExperienceSection />);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders experience items', () => {
    render(<ExperienceSection />);

    const experienceItems = screen.getAllByText(/Software Engineer/);
    expect(experienceItems.length).toBeGreaterThan(0);
  });

  it('renders key achievements sections', () => {
    render(<ExperienceSection />);

    const achievementsSections = screen.getAllByText('Key Achievements:');
    expect(achievementsSections.length).toBeGreaterThan(0);
  });
});
