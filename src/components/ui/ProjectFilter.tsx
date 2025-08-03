import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Project } from '@/types';

interface ProjectFilterProps {
  projects: Project[];
  onFilterChange: (filteredProjects: Project[]) => void;
  className?: string;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  projects,
  onFilterChange,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get unique categories from projects
  const categories = useMemo(() => {
    const allCategories = projects.flatMap(project => project.stacks);
    return Array.from(new Set(allCategories)).sort();
  }, [projects]);

  // Filter projects based on search and categories
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        searchTerm === '' ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.stacks.some(stack =>
          stack.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.some(category => project.stacks.includes(category));

      return matchesSearch && matchesCategories;
    });
  }, [projects, searchTerm, selectedCategories]);

  // Update parent component when filters change
  React.useEffect(() => {
    onFilterChange(filteredProjects);
  }, [filteredProjects, onFilterChange]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
  };

  const hasActiveFilters = searchTerm !== '' || selectedCategories.length > 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-muted dark:text-dark-muted" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-light-surface dark:bg-dark-surface border border-light-muted/20 dark:border-dark-muted/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-coral focus:border-transparent"
        />
      </div>

      {/* Category Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
            Filter by Technology
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-sm text-primary-coral hover:text-primary-coral/80 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategories.includes(category)
                  ? 'bg-primary-coral text-white shadow-lg'
                  : 'bg-light-surface dark:bg-dark-surface text-light-muted dark:text-dark-muted hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 border border-light-muted/20 dark:border-dark-muted/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${searchTerm}-${selectedCategories.join(',')}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-light-muted dark:text-dark-muted"
        >
          Showing {filteredProjects.length} of {projects.length} projects
          {hasActiveFilters && (
            <span className="ml-2 text-primary-coral">(filtered)</span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProjectFilter;
