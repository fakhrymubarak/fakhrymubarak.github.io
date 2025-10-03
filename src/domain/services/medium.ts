import { MediumArticle, MediumData } from '../models';

// CORS proxy for client-side requests
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

interface MediumFeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  content: string;
  categories: string[];
  guid: string;
}

type DomParserSupported = 'text/html' | 'text/xml';
type DomParserConstructor = new () => globalThis.DOMParser;

export class MediumService {
  private static cache: MediumData | null = null;
  private static lastFetch: number = 0;
  private static readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  static async fetchArticles(
    username: string,
    options: { retry?: number } = {}
  ): Promise<MediumData> {
    const { retry = 0 } = options;
    const now = Date.now();

    // Return cached data if still fresh
    if (this.cache && now - this.lastFetch < this.CACHE_DURATION) {
      return this.cache;
    }

    try {
      const rssUrl = `https://medium.com/feed/@${username}`;
      const proxyUrl = `${CORS_PROXY}${encodeURIComponent(rssUrl)}`;

      console.log('🔄 Fetching RSS feed from:', proxyUrl);

      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const xmlText = await response.text();
      const feed = this.parseRSSFeed(xmlText);

      const articles: MediumArticle[] = feed.items.map((item, index) => {
        const rawContent = item.content || item.contentSnippet || '';
        const plainText = this.extractPlainText(rawContent);
        const fallbackText = this.extractPlainText(item.contentSnippet || '');
        const descriptionSource = plainText || fallbackText;
        const description = (
          this.createSummary(descriptionSource) ||
          descriptionSource ||
          'Summary unavailable'
        ).trim();

        return {
          id: item.guid || item.link || `article-${index}`,
          title: item.title || 'Untitled',
          description,
          url: item.link || '',
          publishedDate: item.pubDate || new Date().toISOString(),
          readTime: this.estimateReadTime(plainText),
          tags: item.categories || [],
          featured: index < 3, // First 3 articles are featured
          imageUrl: this.extractImageUrl(item),
          contentSnippet: this.createHtmlSnippet(rawContent),
        };
      });

      const mediumData: MediumData = {
        articles,
        profileUrl: `https://medium.com/@${username}`,
        totalArticles: articles.length,
        lastUpdated: new Date().toISOString(),
      };

      // Cache the data
      this.cache = mediumData;
      this.lastFetch = now;

      return mediumData;
    } catch (error) {
      console.error('Error fetching Medium articles:', error);

      if (retry < 1) {
        console.warn('Retrying Medium fetch…');
        return this.fetchArticles(username, { retry: retry + 1 });
      }

      // Return fallback data with sample articles if no cache
      if (!this.cache) {
        return {
          articles: [
            {
              id: 'sample-1',
              title:
                'Android File Upload with Retrofit + Coroutines + Progress (Flow)',
              description:
                'If you\'ve ever searched "How to implement progress bar when upload file to backend services?", you\'ll find lots of partial answers...',
              url: 'https://fakhrymubarak.medium.com/android-file-upload-with-retrofit-coroutines-progress-flow-51ea26e70d46',
              publishedDate: new Date().toISOString(),
              readTime: '5 min read',
              tags: ['android', 'kotlin', 'retrofit'],
              featured: true,
              contentSnippet:
                'Learn how to implement file upload with progress tracking using Retrofit, Coroutines, and Flow in Android development.',
            },
          ],
          profileUrl: `https://medium.com/@${username}`,
          totalArticles: 1,
          lastUpdated: new Date().toISOString(),
        };
      }

      return this.cache;
    }
  }

  static clearCache(): void {
    this.cache = null;
    this.lastFetch = 0;
  }

  private static estimateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const normalized = content.trim();
    const wordCount = normalized ? normalized.split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    return `${minutes} min read`;
  }

  private static extractPlainText(source: string): string {
    if (!source) {
      return '';
    }

    const decoded = this.decodeHtmlEntities(source);

    try {
      const doc = this.createDomDocument(decoded, 'text/html');
      if (doc) {
        doc
          .querySelectorAll('script, style, iframe, noscript, svg')
          .forEach(node => node.remove());
        doc.querySelectorAll('img').forEach(img => {
          if (img.alt) {
            const altText = doc.createTextNode(` ${img.alt} `);
            img.replaceWith(altText);
          } else {
            img.remove();
          }
        });

        const text = doc.body?.textContent || '';
        const normalized = this.normalizeWhitespace(text);
        if (normalized) {
          return normalized;
        }
      }
    } catch (error) {
      console.error('Error extracting plain text from HTML:', error);
    }

    const stripped = decoded
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<figure[\s\S]*?<\/figure>/gi, ' ')
      .replace(/<img[^>]*>/gi, ' ')
      .replace(/<[^>]+>/g, ' ');

    return this.normalizeWhitespace(stripped);
  }

  private static createSummary(text: string, maxWords = 60): string {
    if (!text) {
      return '';
    }

    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) {
      return text;
    }

    const sliced = words.slice(0, maxWords).join(' ');
    return `${sliced.trim()}...`;
  }

  private static createHtmlSnippet(
    html: string,
    options: { maxParagraphs?: number; maxLength?: number } = {}
  ): string {
    if (!html) {
      return '';
    }

    const { maxParagraphs = 3, maxLength = 900 } = options;
    const decodedHtml = this.decodeHtmlEntities(html);

    try {
      const doc = this.createDomDocument(decodedHtml, 'text/html');
      if (doc) {
        const contentNodes = Array.from(
          doc.body?.querySelectorAll(
            'p, ul, ol, h2, h3, h4, blockquote, pre'
          ) ?? []
        );

        const snippetParts: string[] = [];
        let charCount = 0;

        for (const node of contentNodes) {
          if (snippetParts.length >= maxParagraphs || charCount >= maxLength) {
            break;
          }

          const outerHtml = node.outerHTML?.trim();
          if (!outerHtml) {
            continue;
          }

          snippetParts.push(outerHtml);
          charCount += outerHtml.length;
        }

        if (snippetParts.length > 0) {
          const snippet = snippetParts.join('');
          return charCount >= maxLength ? `${snippet}...` : snippet;
        }

        const fallbackText = doc.body?.textContent || '';
        return this.createSummary(fallbackText, Math.floor(maxLength / 5));
      }
    } catch (error) {
      console.error('Error creating HTML snippet:', error);
    }

    const trimmed = decodedHtml.slice(0, maxLength);
    return decodedHtml.length > maxLength ? `${trimmed}...` : trimmed;
  }

  private static decodeHtmlEntities(value: string): string {
    if (!value) {
      return '';
    }

    if (
      typeof window !== 'undefined' &&
      typeof window.document !== 'undefined'
    ) {
      const textarea = window.document.createElement('textarea');
      textarea.innerHTML = value;
      return textarea.value;
    }

    return value
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
      .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
        String.fromCharCode(parseInt(code, 16))
      );
  }

  private static normalizeWhitespace(value: string): string {
    return value.replace(/\s+/g, ' ').trim();
  }

  private static parseRSSFeed(xmlText: string): { items: MediumFeedItem[] } {
    try {
      const xmlDoc = this.createDomDocument(xmlText, 'text/xml');
      if (!xmlDoc) {
        console.warn('DOMParser unavailable when parsing Medium RSS feed.');
        return { items: [] };
      }

      const items = Array.from(xmlDoc.querySelectorAll('item')).map(item => {
        const title = item.querySelector('title')?.textContent?.trim() ?? '';
        const link = item.querySelector('link')?.textContent?.trim() ?? '';
        const pubDate =
          item.querySelector('pubDate')?.textContent?.trim() ?? '';
        const description =
          item.querySelector('description')?.textContent?.trim() ?? '';

        let content = '';
        const encoded =
          item.getElementsByTagName('content:encoded')[0] ??
          item.getElementsByTagNameNS(
            'http://purl.org/rss/1.0/modules/content/',
            'encoded'
          )[0];
        if (encoded?.textContent) {
          content = encoded.textContent;
        }

        const categories = Array.from(item.querySelectorAll('category')).map(
          category => category.textContent?.trim() ?? ''
        );

        const guid = item.querySelector('guid')?.textContent?.trim() ?? link;

        return {
          title,
          link,
          pubDate,
          contentSnippet: description,
          content,
          categories,
          guid,
        } satisfies MediumFeedItem;
      });

      return { items };
    } catch (error) {
      console.error('Error parsing RSS feed:', error);
      return { items: [] };
    }
  }

  private static extractImageUrl(item: MediumFeedItem): string | undefined {
    // Try to extract image from content if available
    if (item.content) {
      const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/);
      if (imgMatch) {
        return imgMatch[1];
      }
    }
    // Try to extract from description
    if (item.contentSnippet) {
      const imgMatch = item.contentSnippet.match(/<img[^>]+src="([^"]+)"/);
      if (imgMatch) {
        return imgMatch[1];
      }
    }
    return undefined;
  }

  private static createDomDocument(
    value: string,
    type: DomParserSupported
  ): globalThis.Document | null {
    const ParserCtor: DomParserConstructor | undefined =
      (typeof window !== 'undefined' && window.DOMParser) ||
      (typeof globalThis.DOMParser !== 'undefined'
        ? (globalThis.DOMParser as DomParserConstructor)
        : undefined);

    if (!ParserCtor) {
      return null;
    }

    try {
      return new ParserCtor().parseFromString(value, type);
    } catch (error) {
      console.error('Failed to parse DOM content:', error);
      return null;
    }
  }
}
