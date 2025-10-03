import React from 'react';
import { motion } from 'framer-motion';

interface MediumFilterProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const MediumFilter: React.FC<MediumFilterProps> = ({
  filters,
  activeFilter,
  onFilterChange,
}) => {
  const allFilters = ['all', ...filters];

  const baseClasses =
    'px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm';
  const activeClasses = 'bg-primary-coral text-white';
  const inactiveClasses =
    'bg-light-surface dark:bg-dark-surface text-light-muted dark:text-dark-muted hover:text-primary-coral';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-4"
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
          Filter Articles
        </h3>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {allFilters.map(filter => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            >
              {filter === 'all' ? 'All Articles' : filter}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MediumFilter;
