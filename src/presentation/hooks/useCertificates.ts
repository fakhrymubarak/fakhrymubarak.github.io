import { useState, useMemo } from 'react';
import { portfolioData } from '@domain/services/portfolio';
import { mapPortfolioData } from '@presentation/utils/dataMapper';
import type { UICertificateState } from '@presentation/models';

const MAX_CERTIFICATES = 6;

export const useCertificates = (): UICertificateState & {
  handleCertificateSelect: (certificateId: string) => void;
  handleSkillFilterChange: (filter: string) => void;
  handleStatusFilterChange: (filter: string) => void;
  handleTypeFilterChange: (filter: string) => void;
  handleCloseModal: () => void;
  handleToggleCertificates: () => void;
  handleToggleFilters: () => void;
} => {
  // Map domain data to UI data
  const uiData = useMemo(() => mapPortfolioData(portfolioData), []);
  const { certificateCategories } = uiData;

  // State management
  const [selectedCertificate, setSelectedCertificate] =
    useState<UICertificateState['selectedCertificate']>(null);
  const [activeSkillFilter, setActiveSkillFilter] = useState('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [activeTypeFilter, setActiveTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  // Flatten all certificates from all categories
  const certificates = useMemo(() => {
    return certificateCategories.flatMap(category =>
      category.certificates.map(cert => ({
        ...cert,
        categoryType: category.type,
      }))
    );
  }, [certificateCategories]);

  // Get unique skills for filtering
  const availableSkillFilters = useMemo(() => {
    const skills = certificates.flatMap(cert => cert.skills);
    return Array.from(new Set(skills));
  }, [certificates]);

  // Get unique statuses for filtering
  const availableStatusFilters = useMemo(() => {
    const statuses = certificates.map(cert => cert.status);
    return Array.from(new Set(statuses));
  }, [certificates]);

  // Get unique types for filtering
  const availableTypeFilters = useMemo(() => {
    const types = certificates.map(cert => cert.categoryType);
    return Array.from(new Set(types));
  }, [certificates]);

  // Filter certificates based on all active filters
  const filteredCertificates = useMemo(() => {
    return certificates.filter(cert => {
      const skillMatch =
        activeSkillFilter === 'all' || cert.skills.includes(activeSkillFilter);
      const statusMatch =
        activeStatusFilter === 'all' || cert.status === activeStatusFilter;
      const typeMatch =
        activeTypeFilter === 'all' || cert.categoryType === activeTypeFilter;

      return skillMatch && statusMatch && typeMatch;
    });
  }, [certificates, activeSkillFilter, activeStatusFilter, activeTypeFilter]);

  // Limit certificates to show based on showAllCertificates state
  const displayedCertificates = useMemo(() => {
    return showAllCertificates
      ? filteredCertificates
      : filteredCertificates.slice(0, MAX_CERTIFICATES);
  }, [filteredCertificates, showAllCertificates]);

  // Check if there are more certificates to show
  const hasMoreCertificates = filteredCertificates.length > MAX_CERTIFICATES;

  // Event handlers
  const handleCertificateSelect = (certificateId: string) => {
    const certificate = certificates.find(c => c.id === certificateId) || null;
    setSelectedCertificate(certificate);
  };

  const handleSkillFilterChange = (filter: string) => {
    setActiveSkillFilter(filter);
    setShowAllCertificates(false);
  };

  const handleStatusFilterChange = (filter: string) => {
    setActiveStatusFilter(filter);
    setShowAllCertificates(false);
  };

  const handleTypeFilterChange = (filter: string) => {
    setActiveTypeFilter(filter);
    setShowAllCertificates(false);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  const handleToggleCertificates = () => {
    setShowAllCertificates(prev => !prev);
  };

  const handleToggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  return {
    // State
    certificates,
    selectedCertificate,
    activeSkillFilter,
    activeStatusFilter,
    activeTypeFilter,
    showFilters,
    showAllCertificates,
    availableSkillFilters,
    availableStatusFilters,
    availableTypeFilters,
    filteredCertificates,
    displayedCertificates,
    hasMoreCertificates,
    // Event handlers
    handleCertificateSelect,
    handleSkillFilterChange,
    handleStatusFilterChange,
    handleTypeFilterChange,
    handleCloseModal,
    handleToggleCertificates,
    handleToggleFilters,
  };
};
