import { useState, useMemo } from 'react';
import { portfolioData } from '@domain/services/portfolio';
import { mapPortfolioData } from '@presentation/utils/dataMapper';
import type { UIProjectState } from '@presentation/models';

const MAX_PROJECTS = 6;

export const useProjects = (): UIProjectState & {
  handleProjectSelect: (projectId: string) => void;
  handleFilterChange: (filter: string) => void;
  handleCloseModal: () => void;
  handleToggleProjects: () => void;
  handleToggleFilters: () => void;
} => {
  // Map domain data to UI data
  const uiData = useMemo(() => mapPortfolioData(portfolioData), []);
  const { projects } = uiData;

  // State management
  const [selectedProject, setSelectedProject] =
    useState<UIProjectState['selectedProject']>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Get unique tech stacks for filtering
  const availableFilters = useMemo(() => {
    const stacks = projects.flatMap(project => project.stacks);
    return Array.from(new Set(stacks));
  }, [projects]);

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(project => project.stacks.includes(activeFilter));
  }, [projects, activeFilter]);

  // Limit projects to show based on showAllProjects state
  const displayedProjects = useMemo(() => {
    return showAllProjects
      ? filteredProjects
      : filteredProjects.slice(0, MAX_PROJECTS);
  }, [filteredProjects, showAllProjects]);

  // Check if there are more projects to show
  const hasMoreProjects = filteredProjects.length > MAX_PROJECTS;

  // Event handlers
  const handleProjectSelect = (projectId: string) => {
    const project = projects.find(p => p.id === projectId) || null;
    setSelectedProject(project);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setShowAllProjects(false); // Reset to show limited projects when filter changes
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleToggleProjects = () => {
    setShowAllProjects(prev => !prev);
  };

  const handleToggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  return {
    // State
    projects,
    selectedProject,
    activeFilter,
    showFilters,
    showAllProjects,
    availableFilters,
    filteredProjects,
    displayedProjects,
    hasMoreProjects,
    // Event handlers
    handleProjectSelect,
    handleFilterChange,
    handleCloseModal,
    handleToggleProjects,
    handleToggleFilters,
  };
};
