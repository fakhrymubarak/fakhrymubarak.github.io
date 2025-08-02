import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '@data/portfolio.ts'
import { Calendar, Clock } from 'lucide-react'

const ExperienceSection: React.FC = () => {
  const { experience } = portfolioData

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-500'
      case 'part-time':
        return 'bg-blue-500'
      case 'contract':
        return 'bg-orange-500'
      case 'freelance':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <section id="experience" className="section bg-gradient">
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
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-2">EXPERIENCES</h2>
            <p className="body-text max-w-2xl mx-auto">
              My professional journey in mobile development and software engineering.
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants} className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline Line */}
                {index < experience.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-16 bg-light-muted/20 dark:bg-dark-muted/20" />
                )}

                <div className="flex gap-6">
                  {/* Timeline Dot */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-light-surface dark:bg-dark-surface rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-dark-bg">
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-8 h-8 rounded"
                      />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-4 h-4 ${getTypeColor(exp.type)} rounded-full`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 card">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="heading-3">{exp.title}</h3>
                          <span className={`px-2 py-1 text-xs text-white rounded-full ${getTypeColor(exp.type)} self-start sm:self-auto`}>
                            {exp.type}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-primary-coral">
                          {exp.company}
                        </h4>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-light-muted dark:text-dark-muted">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2">
                        <h5 className="font-medium text-light-text dark:text-dark-text">
                          Key Achievements:
                        </h5>
                        <ul className="space-y-1">
                          {exp.highlights.map((highlight, highlightIndex) => (
                            <li
                              key={highlightIndex}
                              className="flex items-start space-x-2 text-sm"
                            >
                              <span className="w-1.5 h-1.5 bg-primary-coral rounded-full mt-2 flex-shrink-0" />
                              <span className="text-light-muted dark:text-dark-muted">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceSection 