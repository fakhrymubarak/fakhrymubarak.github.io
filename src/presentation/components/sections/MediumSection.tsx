import React, { lazy, Suspense } from 'react';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { ExternalLink, Filter } from 'lucide-react';
import MediumCard from './medium/MediumCard';
import { useAnalytics, useMedium } from '@/presentation';

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

  if (loading) {
    return (
      <section id="articles" className="section bg-gradient">
        <div className="container min-h-screen flex items-center justify-center">
          <div className="py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-light-primary dark:border-dark-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="articles" className="section bg-gradient">
        <div className="container min-h-screen flex items-center justify-center">
          <div className="text-center py-20">
            <p className="text-light-muted dark:text-dark-muted mb-4">
              Unable to load articles at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="articles"
      className="section bg-gradient"
      role="region"
      aria-label="Articles"
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '1000px',
        minHeight: '100vh',
      }}
    >
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
            <m.div variants={itemVariants} className="text-center space-y-4">
              <h2 className="heading-2 text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-2">
                Articles
              </h2>
              <p className="body-text max-w-2xl mx-auto">
                My latest thoughts and insights on software development, mobile
                engineering, and technology trends.
              </p>

              {/* Controls */}
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => {
                    trackButtonClick('toggle_filters', 'medium_section');
                    handleToggleFilters();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-muted/20 dark:border-dark-muted/20 hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter Articles</span>
                </button>

                <a
                  href="https://medium.com/@fakhrymubarak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline gap-2 px-5 py-2.5 rounded-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View All on Medium</span>
                </a>
              </div>
            </m.div>

            {/* Filter Component */}
            <AnimatePresence>
              {showFilters && (
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

            {/* Articles Grid */}
            <m.div
              variants={itemVariants}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayedArticles.map((article, index) => (
                <MediumCard key={article.id} article={article} index={index} />
              ))}
            </m.div>

            {/* Toggle Articles Button */}
            {hasMoreArticles && (
              <m.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <button
                  onClick={handleToggleArticles}
                  className="btn-outline px-8 py-3"
                >
                  {showAllArticles ? 'Show Less' : 'See More Articles'}
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
