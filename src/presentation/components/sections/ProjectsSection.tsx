import React, { lazy, Suspense } from 'react';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import ProjectCard from './project/ProjectCard';
import ProjectModal from './project/ProjectModal';
import { Filter } from 'lucide-react';
import { useAnalytics, useProjects } from '@/presentation';

const ProjectFilter = lazy(() => import('./project/ProjectFilter'));

const ProjectsSection: React.FC = () => {
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
            <m.div variants={itemVariants} className="section-header">
              <p className="eyebrow">Selected work</p>
              <h2 className="display-md text-light-text dark:text-dark-text">
                Projects
              </h2>
              <p className="body-text">
                Here are some of the projects I've worked on, showcasing my
                expertise in mobile development and software engineering.
              </p>

              {/* Filter Toggle */}
              <div className="flex pt-2">
                <button
                  onClick={() => {
                    trackButtonClick('toggle_filters', 'projects_section');
                    handleToggleFilters();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-light-surface dark:bg-dark-surface border border-black/[0.06] dark:border-white/[0.08] hover:border-primary-coral/40 transition-colors"
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

            {/* Projects Grid — bento: first tile spans wide, rest form the rhythm */}
            <m.div variants={itemVariants} className="bento-grid">
              {displayedProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={index === 0 ? 'bento-span-4' : 'bento-span-2'}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onSelect={handleProjectSelect}
                  />
                </div>
              ))}
            </m.div>

            {/* Toggle Projects Button */}
            {hasMoreProjects && (
              <m.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex"
              >
                <button
                  onClick={handleToggleProjects}
                  className="btn-outline px-8 py-3 rounded-full"
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
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
