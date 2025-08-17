import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '../../../types';
import ResponsiveImage from '../../ui/ResponsiveImage';
import { useAnalytics } from '../../../hooks/useAnalytics';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onSelect,
}) => {
  const { trackProjectView, trackButtonClick } = useAnalytics();

  const handleProjectClick = () => {
    trackProjectView(project.title);
    onSelect(project.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card group cursor-pointer"
      onClick={handleProjectClick}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-t-lg">
        <ResponsiveImage
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Project Content */}
      <div className="pb-4 ps-0 pe-0 pt-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={project.logo}
              alt={`${project.title} logo`}
              className="w-8 h-8 rounded"
            />
            <div>
              <h3 className="font-semibold text-light-text dark:text-dark-text">
                {project.title}
              </h3>
              <p className="text-sm text-light-muted dark:text-dark-muted">
                {project.period}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-light-muted dark:text-dark-muted line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stacks.slice(0, 3).map((stack: string) => (
            <span
              key={stack}
              className="px-2 py-1 bg-primary-coral/10 text-primary-coral text-xs rounded-full"
            >
              {stack}
            </span>
          ))}
          {project.stacks.length > 3 && (
            <span className="px-2 py-1 bg-light-muted/20 text-light-muted dark:text-dark-muted text-xs rounded-full">
              +{project.stacks.length - 3}
            </span>
          )}
        </div>

        {/* Action Button */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-sm px-4 py-2"
          onClick={e => {
            e.stopPropagation();
            trackButtonClick('view_project', `project_${project.title}`);
          }}
        >
          View Project
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
