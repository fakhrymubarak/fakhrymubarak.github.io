import { render, screen } from '@testing-library/react';
import MediumCard from '../MediumCard';

const baseArticle = {
  id: 'article-1',
  title: 'Testing Medium Card',
  description: 'A short description about testing cards.',
  url: 'https://example.com/article',
  publishedDate: '2024-01-01T00:00:00.000Z',
  readTime: '4 min read',
  tags: ['react', 'testing', 'typescript', 'hooks'],
  featured: true,
  imageUrl: 'https://example.com/image.jpg',
  contentSnippet: '<p>Snippet</p>',
};

describe('MediumCard', () => {
  it('renders article details, tags, and overflow indicator', () => {
    render(<MediumCard article={baseArticle} index={0} />);

    expect(screen.getByText('Testing Medium Card')).toBeInTheDocument();
    expect(screen.getByText('4 min read')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /testing medium card/i })
    ).toHaveAttribute('src', 'https://example.com/image.jpg');

    // Only first three tags are rendered directly
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('testing')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
    // Remaining tags are summarized
    expect(screen.getByText('+1')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /view on medium/i });
    expect(link).toHaveAttribute('href', 'https://example.com/article');
  });
});
