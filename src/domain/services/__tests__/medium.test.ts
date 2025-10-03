import { MediumService } from '../medium';

describe('MediumService', () => {
  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Mock Feed</title>
    <item>
      <title>First Article</title>
      <link>https://example.com/first</link>
      <guid>guid-1</guid>
      <pubDate>Wed, 01 Jan 2024 00:00:00 GMT</pubDate>
      <description><![CDATA[<p>First summary<img src="https://example.com/img.jpg" alt="Example" /></p>]]></description>
      <content:encoded><![CDATA[<p>First content paragraph.</p><p>More words here.</p><img src="https://example.com/img.jpg" alt="Cover" />]]></content:encoded>
      <category>react</category>
      <category>testing</category>
    </item>
    <item>
      <title>Second Article</title>
      <link>https://example.com/second</link>
      <guid>guid-2</guid>
      <pubDate>Thu, 02 Jan 2024 00:00:00 GMT</pubDate>
      <description><![CDATA[<p>Second summary</p>]]></description>
      <content:encoded><![CDATA[<p>Second content paragraph with more than enough words to calculate read time easily.</p>]]></content:encoded>
      <category>react</category>
    </item>
  </channel>
</rss>`;

  const originalFetch = global.fetch;
  const mockFetch = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => rssFeed,
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

  it('fetches, parses, and caches Medium articles', async () => {
    const data = await MediumService.fetchArticles('tester');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.allorigins.win/raw?url=')
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
        text: async () => rssFeed,
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
