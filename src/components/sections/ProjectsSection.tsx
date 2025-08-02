import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../../data/portfolio'
import ProjectCard from '../ProjectCard'
import ProjectModal from '../ProjectModal'
import ProjectFilter from '../ProjectFilter'
import { Filter } from 'lucide-react'

const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique tech stacks for filtering
  const availableFilters = useMemo(() => {
    const stacks = projects.flatMap(project => project.stacks)
    return Array.from(new Set(stacks))
  }, [projects])

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter(project => project.stacks.includes(activeFilter))
  }, [projects, activeFilter])

  // Get selected project data
  const selectedProjectData = useMemo(() => {
    return projects.find(project => project.id === selectedProject) || null
  }, [projects, selectedProject])

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

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId)
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
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
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-2">PROJECTS</h2>
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
                  filters={availableFilters}
                  activeFilter={activeFilter}
                  onFilterChange={handleFilterChange}
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
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={handleProjectSelect}
              />
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
      <AnimatePresence>
        {selectedProjectData && (
          <ProjectModal
            project={selectedProjectData}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProjectsSection 