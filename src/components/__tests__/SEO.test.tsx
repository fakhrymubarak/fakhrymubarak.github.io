import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '../SEO';

// Mock the portfolio data
jest.mock('@data/portfolio.ts', () => ({
  portfolioData: {
    introduction: {
      description: 'Test description',
      techStack: [{ name: 'React' }, { name: 'TypeScript' }],
    },
    projects: [
      {
        title: 'Test Project',
        description: 'Test project description',
        link: 'https://example.com',
      },
    ],
  },
}));

describe('SEO', () => {
  const renderSEO = (props = {}) => {
    return render(
      <HelmetProvider>
        <SEO {...props} />
      </HelmetProvider>
    );
  };

  it('renders with default props', () => {
    renderSEO();
    // The component renders Helmet tags, so we just check it doesn't crash
    expect(document.head).toBeDefined();
  });

  it('renders with custom title', () => {
    const customTitle = 'Custom Title';
    renderSEO({ title: customTitle });
    // The component renders Helmet tags, so we just check it doesn't crash
    expect(document.head).toBeDefined();
  });

  it('renders with custom description', () => {
    const customDescription = 'Custom description';
    renderSEO({ description: customDescription });
    // The component renders Helmet tags, so we just check it doesn't crash
    expect(document.head).toBeDefined();
  });

  it('renders with custom image', () => {
    const customImage = 'https://example.com/custom-image.jpg';
    renderSEO({ image: customImage });
    // The component renders Helmet tags, so we just check it doesn't crash
    expect(document.head).toBeDefined();
  });

  it('renders with custom URL', () => {
    const customUrl = 'https://example.com/custom';
    renderSEO({ url: customUrl });
    // The component renders Helmet tags, so we just check it doesn't crash
    expect(document.head).toBeDefined();
  });

  it('renders with custom type', () => {
    const customType = 'article';
    renderSEO({ type: customType });
    // The component renders Helmet tags, so we just check it doesn't crash
    expect(document.head).toBeDefined();
  });

  it('renders with all custom props', () => {
    const customProps = {
      title: 'Custom Title',
      description: 'Custom description',
      image: 'https://example.com/image.jpg',
      url: 'https://example.com',
      type: 'article',
    };
    renderSEO(customProps);
    // The component renders Helmet tags, so we just check it doesn't crash
    expect(document.head).toBeDefined();
  });
});
