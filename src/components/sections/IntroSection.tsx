import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '@data/portfolio.ts'
import { ExternalLink, Download } from 'lucide-react'

const IntroSection: React.FC = () => {
  const { introduction } = portfolioData

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
    <section id="home" className="section bg-gradient">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Title */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="text-light-text dark:text-dark-text">
                  {introduction.title[0]}
                </span>
                <br />
                <span className="text-gradient">
                  {introduction.title[1]}
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="body-text max-w-2xl">
              {introduction.description}
            </motion.p>

            {/* Tech Stack */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="heading-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-4">
                {introduction.techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-light-surface dark:bg-dark-surface rounded-lg shadow-sm"
                  >
                    <img
                      src={tech.icon}
                      alt={`${tech.name} icon`}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="font-medium text-sm">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="btn-primary px-8 py-3"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                View Projects
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a
                href={portfolioData.footer.contacts.find(c => c.type === 'resume')?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-8 py-3"
              >
                Download Resume
                <Download className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary-coral/20 to-primary-lavender/20 flex items-center justify-center">
                <img
                  src={introduction.imagePath}
                  alt="Fakhry Mubarak"
                  className="w-72 h-72 lg:w-80 lg:h-80 rounded-full object-cover shadow-2xl"
                />
              </div>
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary-coral rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold">3+</span>
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-lavender rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-sm">100M+</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default IntroSection 