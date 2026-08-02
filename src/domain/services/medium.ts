import { MediumData } from '../models';
import type { Locale } from '@domain/models/i18n.ts';
import { MEDIUM_API_URL } from '@shared/env';

/** Default article source: Go medium-api (not Medium RSS / CORS proxy). */
const DEFAULT_PROFILE_USERNAME = 'fakhrymubarak';

export class MediumService {
  private static cache: Partial<Record<Locale, MediumData>> = {};
  private static lastFetch: Partial<Record<Locale, number>> = {};
  /** Client cache; server refreshes once daily at 03:00 Asia/Jakarta. */
  private static readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  /**
   * Fetches articles from the Go medium-api backend, in the given language
   * (sent as the `X-Lang` header; the API defaults to English otherwise).
   * Username is only used for the offline fallback profile URL.
   */
  static async fetchArticles(
    options: {
      language?: Locale;
      retry?: number;
      fallbackUsername?: string;
    } = {}
  ): Promise<MediumData> {
    const {
      language = 'en',
      retry = 0,
      fallbackUsername = DEFAULT_PROFILE_USERNAME,
    } = options;
    const now = Date.now();

    const cached = this.cache[language];
    const cachedAt = this.lastFetch[language] ?? 0;
    if (cached && now - cachedAt < this.CACHE_DURATION) {
      return cached;
    }

    try {
      const apiBase = MEDIUM_API_URL.replace(/\/$/, '');
      const response = await fetch(`${apiBase}/api/medium`, {
        headers: { 'X-Lang': language },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const mediumData = (await response.json()) as MediumData;

      this.cache[language] = mediumData;
      this.lastFetch[language] = now;

      return mediumData;
    } catch (error) {
      console.error('Error fetching Medium articles from Go API:', error);

      if (retry < 1) {
        console.warn('Retrying Medium API fetch…');
        return this.fetchArticles({
          language,
          retry: retry + 1,
          fallbackUsername,
        });
      }

      const staleCache = this.cache[language];
      if (!staleCache) {
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
          profileUrl: `https://medium.com/@${fallbackUsername}`,
          totalArticles: 1,
          lastUpdated: new Date().toISOString(),
        };
      }

      return staleCache;
    }
  }

  static clearCache(): void {
    this.cache = {};
    this.lastFetch = {};
  }
}
