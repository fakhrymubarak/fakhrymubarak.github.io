import React, { Suspense, lazy, useEffect } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import ProjectCard from './project/ProjectCard';
const ProjectModal = lazy(() => import('./project/ProjectModal'));
const ProjectFilter = lazy(() => import('./project/ProjectFilter'));
import { Filter } from 'lucide-react';
import { useProjects, useAnalytics } from '@/presentation';

const ProjectsSection: React.FC = () => {
  useEffect(() => {
    // Preload modal chunk so the first open doesn't flash the fallback
    void import('./project/ProjectModal');
  }, []);

  const {
    displayedProjects,
    selectedProject,
    activeFilter,
    showFilters,
    showAllProjects,
    availableFilters,
    hasMoreProjects,
    handleProjectSelect,
    handleFilterChange,
    handleCloseModal,
    handleToggleProjects,
    handleToggleFilters,
  } = useProjects();

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
      id="projects"
      className="section"
      role="region"
      aria-label="Projects"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}
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
                Projects
              </h2>
              <p className="body-text max-w-2xl mx-auto">
                Here are some of the projects I've worked on, showcasing my
                expertise in mobile development and software engineering.
              </p>

              {/* Filter Toggle */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    trackButtonClick('toggle_filters', 'projects_section');
                    handleToggleFilters();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-muted/20 dark:border-dark-muted/20 hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter Projects</span>
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
                  <Suspense fallback={<div />}>
                    <ProjectFilter
                      filters={availableFilters}
                      activeFilter={activeFilter}
                      onFilterChange={handleFilterChange}
                    />
                  </Suspense>
                </m.div>
              )}
            </AnimatePresence>

            {/* Projects Grid */}
            <m.div
              variants={itemVariants}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayedProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={handleProjectSelect}
                />
              ))}
            </m.div>

            {/* Toggle Projects Button */}
            {hasMoreProjects && (
              <m.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <button
                  onClick={handleToggleProjects}
                  className="btn-outline px-8 py-3"
                >
                  {showAllProjects ? 'Show Less' : 'See More'}
                </button>
              </m.div>
            )}
          </m.div>
        </LazyMotion>
      </div>

      {/* Project Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <Suspense fallback={null}>
            <ProjectModal
              key={selectedProject.id}
              project={selectedProject}
              onClose={handleCloseModal}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
