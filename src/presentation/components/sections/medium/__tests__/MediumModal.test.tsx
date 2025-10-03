import { fireEvent, render, screen } from '@testing-library/react';
import MediumModal from '../MediumModal';

const article = {
  id: 'modal-1',
  title: 'Modal Article',
  description: 'Detailed article description.',
  url: 'https://example.com/modal',
  publishedDate: '2024-01-01T00:00:00.000Z',
  readTime: '5 min read',
  tags: ['react', 'testing'],
  featured: true,
  imageUrl: 'https://example.com/cover.jpg',
  contentSnippet: '<p>Modal snippet content</p>',
};

describe('MediumModal', () => {
  it('renders article content and triggers close handlers', () => {
    const onClose = jest.fn();

    render(<MediumModal article={article} onClose={onClose} />);

    expect(screen.getByText('Modal Article')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /modal article/i })).toHaveAttribute(
      'src',
      'https://example.com/cover.jpg'
    );
    expect(screen.getByText('Read on Medium').closest('a')).toHaveAttribute(
      'href',
      'https://example.com/modal'
    );

    fireEvent.click(screen.getByRole('button', { name: /close modal/i }));
    fireEvent.click(screen.getByTestId('medium-modal-overlay'));

    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
