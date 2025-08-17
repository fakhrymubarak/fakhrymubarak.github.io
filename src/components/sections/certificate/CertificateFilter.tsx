import React from 'react';
import { motion } from 'framer-motion';

interface CertificateFilterProps {
  skillFilters: string[];
  statusFilters: string[];
  typeFilters: string[];
  activeSkillFilter: string;
  activeStatusFilter: string;
  activeTypeFilter: string;
  onSkillFilterChange: (filter: string) => void;
  onStatusFilterChange: (filter: string) => void;
  onTypeFilterChange: (filter: string) => void;
}

const CertificateFilter: React.FC<CertificateFilterProps> = ({
  skillFilters,
  statusFilters,
  typeFilters,
  activeSkillFilter,
  activeStatusFilter,
  activeTypeFilter,
  onSkillFilterChange,
  onStatusFilterChange,
  onTypeFilterChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 mb-8"
    >
      {/* Status Filter */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">
          Filter by Status
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onStatusFilterChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeStatusFilter === 'all'
                ? 'bg-primary-coral text-white'
                : 'bg-light-surface dark:bg-dark-surface text-light-muted dark:text-dark-muted hover:text-primary-coral'
            }`}
          >
            All Status
          </button>
          {statusFilters.map(filter => (
            <button
              key={filter}
              onClick={() => onStatusFilterChange(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeStatusFilter === filter
                  ? 'bg-primary-coral text-white'
                  : 'bg-light-surface dark:bg-dark-surface text-light-muted dark:text-dark-muted hover:text-primary-coral'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">
          Filter by Type
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onTypeFilterChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTypeFilter === 'all'
                ? 'bg-primary-coral text-white'
                : 'bg-light-surface dark:bg-dark-surface text-light-muted dark:text-dark-muted hover:text-primary-coral'
            }`}
          >
            All Types
          </button>
          {typeFilters.map(filter => (
            <button
              key={filter}
              onClick={() => onTypeFilterChange(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTypeFilter === filter
                  ? 'bg-primary-coral text-white'
                  : 'bg-light-surface dark:bg-dark-surface text-light-muted dark:text-dark-muted hover:text-primary-coral'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Filter */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">
          Filter by Skills
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onSkillFilterChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeSkillFilter === 'all'
                ? 'bg-primary-coral text-white'
                : 'bg-light-surface dark:bg-dark-surface text-light-muted dark:text-dark-muted hover:text-primary-coral'
            }`}
          >
            All Skills
          </button>
          {skillFilters.map(filter => (
            <button
              key={filter}
              onClick={() => onSkillFilterChange(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSkillFilter === filter
                  ? 'bg-primary-coral text-white'
                  : 'bg-light-surface dark:bg-dark-surface text-light-muted dark:text-dark-muted hover:text-primary-coral'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateFilter;
