import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '@data/portfolio.ts'
import { ExternalLink, Github, Filter } from 'lucide-react'
import ProjectFilter from '../ui/ProjectFilter'

const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [showFilters, setShowFilters] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="heading-2">PROJECTS</h2>
            <p className="body-text max-w-2xl mx-auto">
              Here are some of the projects I've worked on, showcasing my expertise in mobile development and software engineering.
            </p>

            {/* Filter Toggle */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-muted/20 dark:border-dark-muted/20 hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filter Projects</span>
              </button>
            </div>
          </motion.div>

          {/* Filter Component */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ProjectFilter
                  projects={projects}
                  onFilterChange={setFilteredProjects}
                  className="mb-8"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects Grid */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card group cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
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
            ))}
          </motion.div>

          {/* Load More Button */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <button className="btn-secondary px-8 py-3">
              View All Projects
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-light-surface dark:bg-dark-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal content would go here */}
            <div className="p-6">
              <h3>Project Details</h3>
              <p>Detailed view for {selectedProject}</p>
              <button
                onClick={() => setSelectedProject(null)}
                className="btn-primary mt-4"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

export default ProjectsSection 