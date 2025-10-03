import { act, renderHook, waitFor } from '@testing-library/react';
import { useMedium } from '../useMedium';
import { MediumService } from '@domain/services/medium';

describe('useMedium', () => {
  const mockFetchArticles = jest.spyOn(MediumService, 'fetchArticles');
  const originalConsoleError = console.error;
  const sampleArticles = Array.from({ length: 7 }).map((_, index) => ({
    id: `id-${index}`,
    title: `Article ${index}`,
    description: `Description ${index}`,
    url: `https://example.com/${index}`,
    publishedDate: new Date(2024, 0, index + 1).toISOString(),
    readTime: '3 min read',
    tags: index % 2 === 0 ? ['react', 'testing'] : ['javascript'],
    featured: index < 3,
    imageUrl: 'https://example.com/image.jpg',
    contentSnippet: '<p>Snippet</p>',
  }));

  const mediumData = {
    articles: sampleArticles,
    profileUrl: 'https://medium.com/@tester',
    totalArticles: sampleArticles.length,
    lastUpdated: new Date().toISOString(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
    mockFetchArticles.mockResolvedValue(mediumData);
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  afterAll(() => {
    mockFetchArticles.mockRestore();
  });

  it('loads Medium articles and exposes derived state', async () => {
    const { result } = renderHook(() => useMedium('tester'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockFetchArticles).toHaveBeenCalledWith('tester');
    expect(result.current.articles).toHaveLength(7);
    expect(result.current.availableFilters).toEqual([
      'react',
      'testing',
      'javascript',
    ]);
    expect(result.current.hasMoreArticles).toBe(true);
    expect(result.current.displayedArticles).toHaveLength(6);
  });

  it('handles filter and selection interactions', async () => {
    const { result } = renderHook(() => useMedium('tester'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.handleFilterChange('javascript');
    });

    expect(result.current.activeFilter).toBe('javascript');
    expect(result.current.showAllArticles).toBe(false);
    expect(
      result.current.displayedArticles.every(article =>
        article.tags.includes('javascript')
      )
    ).toBe(true);

    act(() => {
      result.current.handleToggleArticles();
    });
    expect(result.current.showAllArticles).toBe(true);
    expect(result.current.displayedArticles).toHaveLength(3);

    act(() => {
      result.current.handleArticleSelect('id-1');
    });
    expect(result.current.selectedArticle?.id).toBe('id-1');

    act(() => {
      result.current.handleCloseModal();
    });
    expect(result.current.selectedArticle).toBeNull();

    act(() => {
      result.current.handleToggleFilters();
    });
    expect(result.current.showFilters).toBe(true);
  });

  it('sets error state when fetching fails', async () => {
    mockFetchArticles.mockRejectedValueOnce(new Error('network error'));

    const { result } = renderHook(() => useMedium('tester'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('network error');
    expect(result.current.articles).toHaveLength(0);
  });
});
