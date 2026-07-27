import { MediumData } from '../models';
import { MEDIUM_API_URL } from '@shared/env';

/** Default article source: Go medium-api (not Medium RSS / CORS proxy). */
const DEFAULT_PROFILE_USERNAME = 'fakhrymubarak';

export class MediumService {
  private static cache: MediumData | null = null;
  private static lastFetch: number = 0;
  /** Client cache; server refreshes once daily at 03:00 Asia/Jakarta. */
  private static readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  /**
   * Fetches articles from the Go medium-api backend.
   * Username is only used for the offline fallback profile URL.
   */
  static async fetchArticles(
    options: { retry?: number; fallbackUsername?: string } = {}
  ): Promise<MediumData> {
    const { retry = 0, fallbackUsername = DEFAULT_PROFILE_USERNAME } = options;
    const now = Date.now();

    if (this.cache && now - this.lastFetch < this.CACHE_DURATION) {
      return this.cache;
    }

    try {
      const apiBase = MEDIUM_API_URL.replace(/\/$/, '');
      const response = await fetch(`${apiBase}/api/medium`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const mediumData = (await response.json()) as MediumData;

      this.cache = mediumData;
      this.lastFetch = now;

      return mediumData;
    } catch (error) {
      console.error('Error fetching Medium articles from Go API:', error);

      if (retry < 1) {
        console.warn('Retrying Medium API fetch…');
        return this.fetchArticles({ retry: retry + 1, fallbackUsername });
      }

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
          profileUrl: `https://medium.com/@${fallbackUsername}`,
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
}
