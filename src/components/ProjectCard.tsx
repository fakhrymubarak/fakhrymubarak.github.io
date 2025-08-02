import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Project } from '../types'

interface ProjectCardProps {
  project: Project
  index: number
  onSelect: (projectId: string) => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelect }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card group cursor-pointer"
      onClick={() => onSelect(project.id)}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Project Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={project.logo}
              alt={`${project.title} logo`}
              className="w-6 h-6 rounded"
            />
            <h3 className="heading-3">{project.title}</h3>
          </div>
          <span className="text-sm text-light-muted dark:text-dark-muted">
            {project.period}
          </span>
        </div>

        <p className="body-text text-sm line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stacks */}
        <div className="flex flex-wrap gap-2">
          {project.stacks.map((stack) => (
            <span
              key={stack}
              className="px-2 py-1 bg-primary-coral/10 text-primary-coral text-xs rounded-full"
            >
              {stack}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm px-4 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            View Project
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
          <button className="p-2 text-light-muted dark:text-dark-muted hover:text-primary-coral transition-colors">
            <Github className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard 