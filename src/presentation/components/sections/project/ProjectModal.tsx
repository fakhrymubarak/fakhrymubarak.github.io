import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import type { UIProject } from '@presentation/models';
import { useAnalytics } from '@/presentation';

interface ProjectModalProps {
  project: UIProject | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { trackButtonClick } = useAnalytics();
  const isOpeningRef = useRef(true);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';

      isOpeningRef.current = true;
      const timer = setTimeout(() => {
        isOpeningRef.current = false;
      }, 300);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  const handleClose = () => {
    if (isOpeningRef.current) return;
    trackButtonClick('close_project_modal', 'project_modal');
    onClose();
  };

  const handleViewProject = () => {
    trackButtonClick('view_project_from_modal', `project_${project?.title}`);
  };

  const handleViewGithub = () => {
    trackButtonClick('view_github', `project_${project?.title}`);
  };

  if (!project) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-light-surface dark:bg-dark-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={project.logo}
                alt={`${project.title} logo`}
                className="w-8 h-8 rounded"
                loading="lazy"
                decoding="async"
                width={32}
                height={32}
              />
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                {project.title}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-light-muted dark:text-dark-muted hover:text-primary-coral transition-colors focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2 rounded"
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
              loading="eager"
              width={1024}
              height={512}
            />
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-light-muted dark:text-dark-muted">
                {project.period}
              </span>
              <div className="flex space-x-2">
                {project.link !== '' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm px-4 py-2"
                    onClick={handleViewProject}
                  >
                    View Project
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
                {project.hasGithub && project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-light-surface dark:bg-dark-surface rounded border border-light-muted/20 dark:border-dark-muted/20 text-light-muted dark:text-dark-muted hover:text-primary-coral transition-colors focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2"
                    onClick={handleViewGithub}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-sm text-light-muted dark:text-dark-muted">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stacks.map((stack: string) => (
                  <span
                    key={stack}
                    className="px-3 py-1 bg-primary-coral/10 text-primary-coral text-sm rounded-full"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default ProjectModal;
