import { useEffect, useMemo, useState } from 'react';
import { MediumService } from '@domain/services/medium';
import type { MediumArticle } from '@domain/models';
import { useLanguage } from './useLanguage';

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

const MAX_ARTICLES = 5;

export const useMedium = (): MediumState & {
  handleArticleSelect: (articleId: string) => void;
  handleFilterChange: (filter: string) => void;
  handleCloseModal: () => void;
  handleToggleArticles: () => void;
  handleToggleFilters: () => void;
} => {
  const { language } = useLanguage();
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

  // Fetch articles from Go medium-api on mount, and again if the user
  // switches language.
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        console.log('🔄 Fetching Medium articles from Go API');

        const mediumData = await MediumService.fetchArticles({ language });
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

    fetchArticles().then();
  }, [language]);

  // Filter articles based on an active filter
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
  };
};
