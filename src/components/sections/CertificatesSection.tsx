import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import CertificateCard from './certificate/CertificateCard';
import CertificateModal from './certificate/CertificateModal';
import CertificateFilter from './certificate/CertificateFilter';
import { Filter } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';

const CertificatesSection: React.FC = () => {
  const { certificateCategories } = portfolioData;
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(
    null
  );
  const [activeSkillFilter, setActiveSkillFilter] = useState('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [activeTypeFilter, setActiveTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const { trackButtonClick } = useAnalytics();

  const MAX_CERTIFICATES = 6;

  // Flatten all certificates from all categories
  const allCertificates = useMemo(() => {
    return certificateCategories.flatMap(category =>
      category.certificates.map(cert => ({
        ...cert,
        categoryType: category.type,
      }))
    );
  }, [certificateCategories]);

  // Get unique skills for filtering
  const availableSkillFilters = useMemo(() => {
    const skills = allCertificates.flatMap(cert => cert.skills);
    return Array.from(new Set(skills));
  }, [allCertificates]);

  // Get unique statuses for filtering
  const availableStatusFilters = useMemo(() => {
    const statuses = allCertificates.map(cert => cert.status);
    return Array.from(new Set(statuses));
  }, [allCertificates]);

  // Get unique types for filtering
  const availableTypeFilters = useMemo(() => {
    const types = allCertificates.map(cert => cert.categoryType);
    return Array.from(new Set(types));
  }, [allCertificates]);

  // Filter certificates based on all active filters
  const filteredCertificates = useMemo(() => {
    let filtered = allCertificates;

    // Filter by skills
    if (activeSkillFilter !== 'all') {
      filtered = filtered.filter(cert =>
        cert.skills.includes(activeSkillFilter)
      );
    }

    // Filter by status
    if (activeStatusFilter !== 'all') {
      filtered = filtered.filter(cert => cert.status === activeStatusFilter);
    }

    // Filter by type
    if (activeTypeFilter !== 'all') {
      filtered = filtered.filter(
        cert => cert.categoryType === activeTypeFilter
      );
    }

    return filtered;
  }, [
    allCertificates,
    activeSkillFilter,
    activeStatusFilter,
    activeTypeFilter,
  ]);

  // Limit certificates to show based on showAllCertificates state
  const displayedCertificates = useMemo(() => {
    return showAllCertificates
      ? filteredCertificates
      : filteredCertificates.slice(0, MAX_CERTIFICATES);
  }, [filteredCertificates, showAllCertificates]);

  // Check if there are more certificates to show
  const hasMoreCertificates = filteredCertificates.length > MAX_CERTIFICATES;

  // Get selected certificate data
  const selectedCertificateData = useMemo(() => {
    return (
      allCertificates.find(cert => cert.id === selectedCertificate) || null
    );
  }, [allCertificates, selectedCertificate]);

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

  const handleCertificateSelect = (certificateId: string) => {
    setSelectedCertificate(certificateId);
  };

  const handleSkillFilterChange = (filter: string) => {
    trackButtonClick(`skill_filter_${filter}`, 'certificates_section');
    setActiveSkillFilter(filter);
  };

  const handleStatusFilterChange = (filter: string) => {
    trackButtonClick(`status_filter_${filter}`, 'certificates_section');
    setActiveStatusFilter(filter);
  };

  const handleTypeFilterChange = (filter: string) => {
    trackButtonClick(`type_filter_${filter}`, 'certificates_section');
    setActiveTypeFilter(filter);
  };

  const handleCloseModal = () => {
    trackButtonClick('close_certificate_modal', 'certificates_section');
    setSelectedCertificate(null);
  };

  const handleToggleCertificates = () => {
    trackButtonClick(
      showAllCertificates ? 'show_less_certificates' : 'show_more_certificates',
      'certificates_section'
    );
    setShowAllCertificates(!showAllCertificates);
  };

  return (
    <section
      id="certificates"
      className="section"
      role="region"
      aria-label="Certificates"
      data-testid="certificates-section"
    >
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-2">
              CERTIFICATES & AWARDS
            </h2>
            <p className="body-text max-w-2xl mx-auto">
              Professional certifications and recognition for expertise and
              contributions in mobile development and software engineering.
            </p>

            {/* Filter Toggle */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  trackButtonClick('toggle_filters', 'certificates_section');
                  setShowFilters(!showFilters);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-muted/20 dark:border-dark-muted/20 hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-colors"
                aria-expanded={showFilters}
              >
                <Filter className="w-4 h-4" />
                <span>Filter Certificates</span>
              </button>
            </div>
          </motion.div>

          {/* Filter Component */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Certificates Grid */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedCertificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={index}
                onSelect={handleCertificateSelect}
              />
            ))}
          </motion.div>

          {/* Toggle Certificates Button */}
          {hasMoreCertificates && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <button
                onClick={handleToggleCertificates}
                className="btn-outline px-8 py-3"
              >
                {showAllCertificates ? 'Show Less' : 'See More'}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        <CertificateModal
          certificate={selectedCertificateData}
          onClose={handleCloseModal}
        />
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;
