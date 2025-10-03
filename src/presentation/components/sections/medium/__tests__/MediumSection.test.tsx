import { fireEvent, render, screen } from '@testing-library/react';
import MediumSection from '../../MediumSection';
import { useAnalytics, useMedium } from '@/presentation';

jest.mock('@/presentation', () => {
  const actual = jest.requireActual('@/presentation');
  return {
    ...actual,
    useMedium: jest.fn(),
    useAnalytics: jest.fn(() => ({
      trackButtonClick: jest.fn(),
    })),
  };
});

const mockedUseMedium = useMedium as jest.Mock;
const mockedUseAnalytics = useAnalytics as jest.Mock;

const createMediumState = (overrides: Record<string, unknown> = {}) =>
  ({
    articles: [],
    selectedArticle: null,
    activeFilter: 'all',
    showFilters: false,
    showAllArticles: false,
    availableFilters: [],
    filteredArticles: [],
    displayedArticles: [],
    hasMoreArticles: false,
    loading: false,
    error: null,
    handleArticleSelect: jest.fn(),
    handleFilterChange: jest.fn(),
    handleCloseModal: jest.fn(),
    handleToggleArticles: jest.fn(),
    handleToggleFilters: jest.fn(),
    ...overrides,
  }) as any;

describe('MediumSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    mockedUseMedium.mockReturnValue(createMediumState({ loading: true }));

    render(<MediumSection />);

    expect(
      screen.getByRole('region', { name: /articles/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('medium-loading-spinner')).toBeInTheDocument();
  });

  it('renders error state when fetching fails', () => {
    mockedUseMedium.mockReturnValue(
      createMediumState({ loading: false, error: 'Failed to fetch' })
    );

    render(<MediumSection />);

    expect(
      screen.getByText(/unable to load articles at the moment/i)
    ).toBeInTheDocument();
  });

  it('renders articles and triggers handlers', async () => {
    const handleToggleFilters = jest.fn();
    const handleToggleArticles = jest.fn();
    const mockTrack = jest.fn();

    mockedUseAnalytics.mockReturnValue({ trackButtonClick: mockTrack });

    mockedUseMedium.mockReturnValue(
      createMediumState({
        displayedArticles: [
          {
            id: '1',
            title: 'First Medium Article',
            description: 'Description for testing.',
            url: 'https://example.com/first',
            publishedDate: '2024-01-01T00:00:00.000Z',
            readTime: '3 min read',
            tags: ['react'],
            featured: true,
            imageUrl: 'https://example.com/image.jpg',
            contentSnippet: '<p>Snippet</p>',
          },
        ],
        filteredArticles: [
          {
            id: '1',
            title: 'First Medium Article',
            description: 'Description for testing.',
            url: 'https://example.com/first',
            publishedDate: '2024-01-01T00:00:00.000Z',
            readTime: '3 min read',
            tags: ['react'],
            featured: true,
            imageUrl: 'https://example.com/image.jpg',
            contentSnippet: '<p>Snippet</p>',
          },
        ],
        availableFilters: ['react'],
        hasMoreArticles: true,
        handleToggleFilters,
        handleToggleArticles,
      })
    );

    render(<MediumSection />);

    expect(screen.getByText('First Medium Article')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /filter articles/i }));
    expect(handleToggleFilters).toHaveBeenCalled();
    expect(mockTrack).toHaveBeenCalledWith('toggle_filters', 'medium_section');

    fireEvent.click(screen.getByRole('button', { name: /see more articles/i }));
    expect(handleToggleArticles).toHaveBeenCalled();

    const mediumLink = screen.getByRole('link', {
      name: /view all on medium/i,
    });
    expect(mediumLink).toHaveAttribute(
      'href',
      'https://medium.com/@fakhrymubarak'
    );
  });
});
