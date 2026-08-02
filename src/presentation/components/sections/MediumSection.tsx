import React, { lazy, Suspense } from 'react';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { ExternalLink, Filter } from 'lucide-react';
import MediumCard from './medium/MediumCard';
import { useAnalytics, useMedium, useTranslations } from '@/presentation';

const MediumFilter = lazy(() => import('./medium/MediumFilter'));

const MediumSection: React.FC = () => {
  const {
    displayedArticles,
    activeFilter,
    showFilters,
    showAllArticles,
    availableFilters,
    hasMoreArticles,
    loading,
    error,
    handleFilterChange,
    handleToggleArticles,
    handleToggleFilters,
  } = useMedium();

  const { trackButtonClick } = useAnalytics();
  const t = useTranslations();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (error) {
    return (
      <section
        id="articles"
        className="section bg-gradient"
        role="region"
        aria-label="Articles"
      >
        <div className="container min-h-screen flex items-center justify-center">
          <div className="text-center py-20">
            <p className="text-light-muted dark:text-dark-muted mb-4">
              {t.articles.unableToLoad}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="articles"
      className="section bg-gradient relative"
      role="region"
      aria-label="Articles"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center gap-3"
          >
            <div
              data-testid="medium-loading-spinner"
              className="animate-spin rounded-full h-10 w-10 border-b-2 border-light-primary dark:border-dark-primary"
            ></div>
            <span className="sr-only">{t.articles.loading}</span>
          </div>
        </div>
      )}
      <div className="container">
        <LazyMotion features={domAnimation}>
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Section Header */}
            <m.div variants={itemVariants} className="section-header">
              <p className="eyebrow">{t.articles.eyebrow}</p>
              <h2 className="display-md text-light-text dark:text-dark-text">
                {t.articles.heading}
              </h2>
              <p className="body-text">{t.articles.body}</p>

              {/* Controls */}
              {!loading && (
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      trackButtonClick('toggle_filters', 'medium_section');
                      handleToggleFilters();
                    }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-light-surface dark:bg-dark-surface border border-black/[0.06] dark:border-white/[0.08] hover:border-primary-coral/40 transition-colors"
                    aria-expanded={showFilters}
                  >
                    <Filter className="w-4 h-4" />
                    <span>{t.articles.filter}</span>
                  </button>

                  <a
                    href="https://medium.com/@fakhrymubarak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline gap-2 px-4 py-2 rounded-full"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t.articles.viewAll}</span>
                  </a>
                </div>
              )}
            </m.div>

            {/* Filter Component */}
            <AnimatePresence>
              {showFilters && !loading && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <Suspense fallback={<div />}>
                    <MediumFilter
                      filters={availableFilters}
                      activeFilter={activeFilter}
                      onFilterChange={handleFilterChange}
                    />
                  </Suspense>
                </m.div>
              )}
            </AnimatePresence>

            {/* Articles Grid — bento: first tile spans wide, rest form the rhythm */}
            <m.div variants={itemVariants} className="bento-grid">
              {displayedArticles.map((article, index) => (
                <div
                  key={article.id}
                  className={index === 0 ? 'bento-span-4' : 'bento-span-2'}
                >
                  <MediumCard article={article} index={index} />
                </div>
              ))}
            </m.div>

            {/* Toggle Articles Button */}
            {hasMoreArticles && !loading && (
              <m.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex"
              >
                <button
                  onClick={handleToggleArticles}
                  className="btn-outline px-8 py-3 rounded-full"
                >
                  {showAllArticles ? t.articles.showLess : t.articles.seeMore}
                </button>
              </m.div>
            )}
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default MediumSection;
