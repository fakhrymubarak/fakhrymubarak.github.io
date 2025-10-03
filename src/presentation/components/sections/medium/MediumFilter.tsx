import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-light-surface dark:bg-dark-surface rounded-xl border border-light-muted/20 dark:border-dark-muted/20 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
          Filter Articles
        </h3>
        <button
          onClick={() => onFilterChange('all')}
          aria-label="Reset filters"
          className="text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {allFilters.map(filter => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-light-primary dark:bg-dark-primary text-white'
                : 'bg-light-muted/20 dark:bg-dark-muted/20 text-light-text dark:text-dark-text hover:bg-light-muted/30 dark:hover:bg-dark-muted/30'
            }`}
          >
            {filter === 'all' ? 'All Articles' : filter}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default MediumFilter;
