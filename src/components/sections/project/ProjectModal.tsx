import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types';
import { useAnalytics } from '@hooks/useAnalytics.ts';
import {
  useAccessibility,
  accessibilityUtils,
} from '@hooks/useAccessibility.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { trackButtonClick } = useAnalytics();
  const { containerRef, handleKeyDown } = useAccessibility({
    onEscape: onClose,
    trapFocus: true,
    autoFocus: true,
  });

  useEffect(() => {
    // Announce modal opening to screen readers
    if (project) {
      accessibilityUtils.announce(`Project modal opened: ${project.title}`);
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  const handleClose = () => {
    trackButtonClick('close_project_modal', 'project_modal');
    accessibilityUtils.announce('Project modal closed');
    onClose();
  };

  const handleViewProject = () => {
    trackButtonClick('view_project_from_modal', `project_${project?.title}`);
  };

  const handleViewGithub = () => {
    trackButtonClick('view_github', `project_${project?.title}`);
  };

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      aria-describedby="project-modal-description"
    >
      <motion.div
        ref={containerRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-light-surface dark:bg-dark-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        role="document"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={project.logo}
                alt={`${project.title} logo`}
                className="w-8 h-8 rounded"
              />
              <h2
                id="project-modal-title"
                className="text-2xl font-bold text-light-text dark:text-dark-text"
              >
                {project.title}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-light-muted dark:text-dark-muted hover:text-primary-coral transition-colors focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2 rounded"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Image */}
          <div className="mb-6">
            <img
              src={project.image}
              alt={`Screenshot of ${project.title} application`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-light-muted dark:text-dark-muted">
                {project.period}
              </span>
              <div className="flex space-x-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm px-4 py-2"
                  onClick={handleViewProject}
                  aria-label={`View ${project.title} project`}
                >
                  View Project
                  <ExternalLink className="w-3 h-3 ml-1" aria-hidden="true" />
                </a>
                {project.hasGithub && project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-light-surface dark:bg-dark-surface rounded border border-light-muted/20 dark:border-dark-muted/20 text-light-muted dark:text-dark-muted hover:text-primary-coral transition-colors focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2"
                    onClick={handleViewGithub}
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p id="project-modal-description" className="body-text">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Tech Stack</h3>
              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-label="Technologies used"
              >
                {project.stacks.map(stack => (
                  <span
                    key={stack}
                    className="px-3 py-1 bg-primary-coral/10 text-primary-coral text-sm rounded-full"
                    role="listitem"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
