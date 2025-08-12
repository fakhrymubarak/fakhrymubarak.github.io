import React from 'react';
import { motion } from 'framer-motion';

interface ProjectFilterProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  filters,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-3 mb-8"
    >
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeFilter === 'all'
            ? 'bg-primary-coral text-white'
            : 'bg-light-surface dark:bg-dark-surface text-light-muted dark:text-dark-muted hover:text-primary-coral'
        }`}
      >
        All Projects
      </button>
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter
              ? 'bg-primary-coral text-white'
              : 'bg-light-surface dark:bg-dark-surface text-light-muted dark:text-dark-muted hover:text-primary-coral'
          }`}
        >
          {filter}
        </button>
      ))}
    </motion.div>
  );
};

export default ProjectFilter;
