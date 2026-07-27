import { MediumService } from '../medium';
import type { MediumData } from '../../models';

describe('MediumService', () => {
  const mediumData: MediumData = {
    articles: [
      {
        id: 'guid-1',
        title: 'First Article',
        description: 'First summary',
        url: 'https://example.com/first',
        publishedDate: 'Wed, 01 Jan 2024 00:00:00 GMT',
        readTime: '1 min read',
        tags: ['react', 'testing'],
        featured: true,
        imageUrl: 'https://example.com/img.jpg',
        contentSnippet: '<p>First content paragraph.</p>',
      },
      {
        id: 'guid-2',
        title: 'Second Article',
        description: 'Second summary',
        url: 'https://example.com/second',
        publishedDate: 'Thu, 02 Jan 2024 00:00:00 GMT',
        readTime: '1 min read',
        tags: ['react'],
        featured: true,
      },
    ],
    profileUrl: 'https://medium.com/@tester',
    totalArticles: 2,
    lastUpdated: '2024-01-01T00:00:00.000Z',
  };

  const originalFetch = global.fetch;
  const mockFetch = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mediumData,
    });
    (global as unknown as { fetch: typeof fetch }).fetch =
      mockFetch as unknown as typeof fetch;
    MediumService.clearCache();
  });

  afterEach(() => {
    jest.useRealTimers();
    mockFetch.mockReset();
  });

  afterAll(() => {
    if (originalFetch) {
      global.fetch = originalFetch;
    } else {
      delete (global as any).fetch;
    }
  });

  it('fetches MediumData from the API and caches it', async () => {
    const data = await MediumService.fetchArticles('tester');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/medium$/)
    );
    expect(data.articles).toHaveLength(2);

    const [firstArticle] = data.articles;
    expect(firstArticle.title).toBe('First Article');
    expect(firstArticle.tags).toEqual(['react', 'testing']);
    expect(firstArticle.imageUrl).toBe('https://example.com/img.jpg');
    expect(firstArticle.readTime).toMatch(/min read$/);
    expect(firstArticle.contentSnippet).toContain(
      '<p>First content paragraph.</p>'
    );

    mockFetch.mockClear();
    const cached = await MediumService.fetchArticles('tester');
    expect(mockFetch).not.toHaveBeenCalled();
    expect(cached).toBe(data);
  });

  it('retries once before returning cache data on error', async () => {
    mockFetch
      .mockRejectedValueOnce(new Error('network error'))
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mediumData,
      } as any);

    const data = await MediumService.fetchArticles('tester');

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(data.articles).toHaveLength(2);
  });

  it('returns fallback data when fetch fails and cache is empty', async () => {
    mockFetch.mockRejectedValue(new Error('unavailable'));

    const data = await MediumService.fetchArticles('tester');

    expect(data.articles).toHaveLength(1);
    expect(data.articles[0].id).toBe('sample-1');
  });
});
