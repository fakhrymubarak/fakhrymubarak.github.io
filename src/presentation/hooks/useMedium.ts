import { useEffect, useMemo, useState } from 'react';
import { MediumService } from '@domain/services/medium';
import type { MediumArticle } from '@domain/models';

interface MediumState {
  articles: MediumArticle[];
  selectedArticle: MediumArticle | null;
  activeFilter: string;
  showFilters: boolean;
  showAllArticles: boolean;
  availableFilters: string[];
  filteredArticles: MediumArticle[];
  displayedArticles: MediumArticle[];
  hasMoreArticles: boolean;
  loading: boolean;
  error: string | null;
}

const MAX_ARTICLES = 6;

export const useMedium = (
  username: string = 'fakhrymubarak'
): MediumState & {
  handleArticleSelect: (articleId: string) => void;
  handleFilterChange: (filter: string) => void;
  handleCloseModal: () => void;
  handleToggleArticles: () => void;
  handleToggleFilters: () => void;
  refreshArticles: () => Promise<void>;
} => {
  const [state, setState] = useState<MediumState>({
    articles: [],
    selectedArticle: null,
    activeFilter: 'all',
    showFilters: false,
    showAllArticles: false,
    availableFilters: [],
    filteredArticles: [],
    displayedArticles: [],
    hasMoreArticles: false,
    loading: true,
    error: null,
  });

  // Fetch articles on mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        console.log('🔄 Fetching Medium articles for:', username);

        const mediumData = await MediumService.fetchArticles(username);
        console.log('✅ Medium articles fetched:', mediumData.articles.length);

        const availableFilters = Array.from(
          new Set(mediumData.articles.flatMap(article => article.tags))
        );

        setState(prev => ({
          ...prev,
          articles: mediumData.articles,
          availableFilters,
          loading: false,
        }));
      } catch (error) {
        console.error('❌ Error in useMedium hook:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error:
            error instanceof Error ? error.message : 'Failed to fetch articles',
        }));
      }
    };

    fetchArticles();
  }, [username]);

  // Filter articles based on active filter
  const filteredArticles = useMemo(() => {
    if (state.activeFilter === 'all') return state.articles;
    return state.articles.filter(article =>
      article.tags.includes(state.activeFilter)
    );
  }, [state.articles, state.activeFilter]);

  // Limit articles to show based on showAllArticles state
  const displayedArticles = useMemo(() => {
    return state.showAllArticles
      ? filteredArticles
      : filteredArticles.slice(0, MAX_ARTICLES);
  }, [filteredArticles, state.showAllArticles]);

  // Check if there are more articles to show
  const hasMoreArticles = filteredArticles.length > MAX_ARTICLES;

  // Event handlers
  const handleArticleSelect = (articleId: string) => {
    const article = state.articles.find(a => a.id === articleId) || null;
    setState(prev => ({ ...prev, selectedArticle: article }));
  };

  const handleFilterChange = (filter: string) => {
    setState(prev => ({
      ...prev,
      activeFilter: filter,
      showAllArticles: false,
    }));
  };

  const handleCloseModal = () => {
    setState(prev => ({ ...prev, selectedArticle: null }));
  };

  const handleToggleArticles = () => {
    setState(prev => ({ ...prev, showAllArticles: !prev.showAllArticles }));
  };

  const handleToggleFilters = () => {
    setState(prev => ({ ...prev, showFilters: !prev.showFilters }));
  };

  const refreshArticles = async () => {
    try {
      MediumService.clearCache();
      const mediumData = await MediumService.fetchArticles(username);

      const availableFilters = Array.from(
        new Set(mediumData.articles.flatMap(article => article.tags))
      );

      setState(prev => ({
        ...prev,
        articles: mediumData.articles,
        availableFilters,
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error('❌ Error refreshing Medium articles:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error ? error.message : 'Failed to refresh articles',
      }));
    }
  };

  return {
    ...state,
    filteredArticles,
    displayedArticles,
    hasMoreArticles,
    handleArticleSelect,
    handleFilterChange,
    handleCloseModal,
    handleToggleArticles,
    handleToggleFilters,
    refreshArticles,
  };
};
