import React, { Suspense, lazy, useEffect } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import CertificateCard from './certificate/CertificateCard';
const CertificateModal = lazy(() => import('./certificate/CertificateModal'));
const CertificateFilter = lazy(() => import('./certificate/CertificateFilter'));
import { Filter } from 'lucide-react';
import { useCertificates, useAnalytics } from '@/presentation';

const CertificatesSection: React.FC = () => {
  useEffect(() => {
    // Preload modal chunk so the first open doesn't flash the fallback
    void import('./certificate/CertificateModal');
  }, []);

  const {
    displayedCertificates,
    selectedCertificate,
    activeSkillFilter,
    activeStatusFilter,
    activeTypeFilter,
    showFilters,
    showAllCertificates,
    availableSkillFilters,
    availableStatusFilters,
    availableTypeFilters,
    hasMoreCertificates,
    handleCertificateSelect,
    handleSkillFilterChange,
    handleStatusFilterChange,
    handleTypeFilterChange,
    handleCloseModal,
    handleToggleCertificates,
    handleToggleFilters,
  } = useCertificates();

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

  return (
    <section
      id="certificates"
      className="section"
      role="region"
      aria-label="Certificates"
      data-testid="certificates-section"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}
    >
      <div className="container">
        <LazyMotion features={domAnimation}>
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Section Header */}
            <m.div variants={itemVariants} className="section-header">
              <p className="eyebrow">Credentials</p>
              <h2 className="display-md text-light-text dark:text-dark-text">
                Certificates & Awards
              </h2>
              <p className="body-text">
                Professional certifications and recognition for expertise and
                contributions in mobile development and software engineering.
              </p>

              {/* Filter Toggle */}
              <div className="flex pt-2">
                <button
                  onClick={() => {
                    trackButtonClick('toggle_filters', 'certificates_section');
                    handleToggleFilters();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-light-surface dark:bg-dark-surface border border-black/[0.06] dark:border-white/[0.08] hover:border-primary-coral/40 transition-colors"
                  aria-expanded={showFilters}
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter Certificates</span>
                </button>
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
                  <Suspense fallback={null}>
                    <CertificateFilter
                      skillFilters={availableSkillFilters}
                      statusFilters={availableStatusFilters}
                      typeFilters={availableTypeFilters}
                      activeSkillFilter={activeSkillFilter}
                      activeStatusFilter={activeStatusFilter}
                      activeTypeFilter={activeTypeFilter}
                      onSkillFilterChange={handleSkillFilterChange}
                      onStatusFilterChange={handleStatusFilterChange}
                      onTypeFilterChange={handleTypeFilterChange}
                    />
                  </Suspense>
                </m.div>
              )}
            </AnimatePresence>

            {/* Certificates Grid — bento rhythm */}
            <m.div variants={itemVariants} className="bento-grid">
              {displayedCertificates.map((certificate, index) => (
                <div key={certificate.id} className="bento-span-2">
                  <CertificateCard
                    certificate={certificate}
                    index={index}
                    onSelect={handleCertificateSelect}
                  />
                </div>
              ))}
            </m.div>

            {/* Toggle Certificates Button */}
            {hasMoreCertificates && (
              <m.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex"
              >
                <button
                  onClick={handleToggleCertificates}
                  className="btn-outline px-8 py-3 rounded-full"
                >
                  {showAllCertificates ? 'Show Less' : 'See More'}
                </button>
              </m.div>
            )}
          </m.div>
        </LazyMotion>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence mode="wait">
        {selectedCertificate && (
          <Suspense fallback={null}>
            <CertificateModal
              key={selectedCertificate.id}
              certificate={selectedCertificate}
              onClose={handleCloseModal}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;
