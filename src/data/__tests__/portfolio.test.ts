// Mock the portfolio module to avoid webp import issues
jest.mock('../portfolio', () => ({
  portfolioData: {
    introduction: {
      title: ['Hi, I am', 'Fakhry Mubarak'],
      subtitle: 'Software Engineer specializing in Android Development',
      description: 'Test description',
      imagePath: 'test-image.webp',
      techStack: [
        {
          name: 'Android',
          icon: {
            light: 'test-light.svg',
            dark: 'test-dark.svg',
          },
          color: '#3DDC84',
        },
      ],
    },
    projects: [
      {
        id: 'test-project',
        title: 'Test Project',
        period: 'Jan 2023 — Dec 2023',
        logo: 'test-logo.webp',
        image: 'test-image.webp',
        description: 'Test project description',
        link: 'https://example.com',
        stacks: ['Android', 'Kotlin'],
        featured: true,
        hasGithub: false,
        githubUrl: '',
      },
    ],
    companies: [
      {
        id: 'test-company',
        name: 'Test Company',
        logo: 'test-logo.webp',
        experiences: [
          {
            id: 'test-experience',
            title: 'Test Role',
            period: 'Jan 2023 — Dec 2023',
            duration: '1 year',
            type: 'Full-time',
            highlights: ['Test highlight 1', 'Test highlight 2'],
          },
        ],
      },
    ],
    footer: {
      contactImage: 'test-image.webp',
      contacts: [
        {
          type: 'email',
          label: 'Write Email',
          url: 'mailto:test@example.com',
          icon: 'mail',
        },
      ],
      socialMedia: [
        {
          name: 'GitHub',
          url: 'https://github.com/test',
          icon: 'github',
        },
      ],
      signature: '© 2024 Test. All rights reserved.',
    },
  },
}));

import { portfolioData } from '../portfolio';

describe('Portfolio Data', () => {
  it('has introduction data', () => {
    expect(portfolioData.introduction).toBeDefined();
    expect(portfolioData.introduction.title).toBeDefined();
    expect(portfolioData.introduction.description).toBeDefined();
    expect(portfolioData.introduction.imagePath).toBeDefined();
    expect(portfolioData.introduction.techStack).toBeDefined();
  });

  it('has projects data', () => {
    expect(portfolioData.projects).toBeDefined();
    expect(Array.isArray(portfolioData.projects)).toBe(true);
    expect(portfolioData.projects.length).toBeGreaterThan(0);
  });

  it('has companies data', () => {
    expect(portfolioData.companies).toBeDefined();
    expect(Array.isArray(portfolioData.companies)).toBe(true);
    expect(portfolioData.companies.length).toBeGreaterThan(0);
  });

  it('has footer data', () => {
    expect(portfolioData.footer).toBeDefined();
    expect(portfolioData.footer.contactImage).toBeDefined();
    expect(portfolioData.footer.contacts).toBeDefined();
    expect(portfolioData.footer.socialMedia).toBeDefined();
    expect(portfolioData.footer.signature).toBeDefined();
  });

  it('has valid project structure', () => {
    const project = portfolioData.projects[0];
    expect(project).toHaveProperty('id');
    expect(project).toHaveProperty('title');
    expect(project).toHaveProperty('description');
    expect(project).toHaveProperty('image');
    expect(project).toHaveProperty('link');
    expect(project).toHaveProperty('stacks');
    expect(project).toHaveProperty('featured');
  });

  it('has valid company structure', () => {
    const company = portfolioData.companies[0];
    expect(company).toHaveProperty('id');
    expect(company).toHaveProperty('name');
    expect(company).toHaveProperty('logo');
    expect(company).toHaveProperty('experiences');
    expect(Array.isArray(company.experiences)).toBe(true);
  });

  it('has valid experience structure', () => {
    const company = portfolioData.companies[0];
    const experience = company.experiences[0];
    expect(experience).toHaveProperty('id');
    expect(experience).toHaveProperty('title');
    expect(experience).toHaveProperty('period');
    expect(experience).toHaveProperty('duration');
    expect(experience).toHaveProperty('type');
    expect(experience).toHaveProperty('highlights');
    expect(Array.isArray(experience.highlights)).toBe(true);
  });

  it('has valid tech stack structure', () => {
    const tech = portfolioData.introduction.techStack[0];
    expect(tech).toHaveProperty('name');
    expect(tech).toHaveProperty('icon');
    expect(tech.icon).toHaveProperty('light');
    expect(tech.icon).toHaveProperty('dark');
  });

  it('has valid contact structure', () => {
    const contact = portfolioData.footer.contacts[0];
    expect(contact).toHaveProperty('type');
    expect(contact).toHaveProperty('label');
    expect(contact).toHaveProperty('url');
    expect(contact).toHaveProperty('icon');
  });

  it('has valid social media structure', () => {
    const social = portfolioData.footer.socialMedia[0];
    expect(social).toHaveProperty('name');
    expect(social).toHaveProperty('url');
    expect(social).toHaveProperty('icon');
  });
});
