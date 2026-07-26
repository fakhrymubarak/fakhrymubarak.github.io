import React from 'react';
import { motion } from 'framer-motion';
import { useExperience } from '@/presentation';
import { Calendar, Clock } from 'lucide-react';

const ExperienceSection: React.FC = () => {
  const { companies } = useExperience();

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-500';
      case 'part-time':
        return 'bg-blue-500';
      case 'contract':
        return 'bg-orange-500';
      case 'freelance':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section
      id="experience"
      className="section bg-gradient"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}
    >
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <p className="eyebrow">Career</p>
            <h2 className="display-md text-light-text dark:text-dark-text">
              Experiences
            </h2>
            <p className="body-text">
              My professional journey in mobile development and software
              engineering.
            </p>
          </motion.div>

          {/* Experience — editorial stack, company as masthead */}
          <motion.div variants={itemVariants} className="space-y-10">
            {companies.map((company, companyIndex) => (
              <motion.div
                key={company.id}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: companyIndex * 0.1 }}
                className="space-y-4"
              >
                {/* Company masthead */}
                <div className="flex items-center gap-4 pb-4 rule border-t-0 border-b">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="w-11 h-11 rounded-lg object-contain bg-light-surface dark:bg-dark-surface p-1.5"
                  />
                  <h4 className="text-xl font-display font-semibold text-light-text dark:text-dark-text">
                    {company.name}
                  </h4>
                  <span
                    className={`ml-auto px-3 py-1 text-xs text-white rounded-full ${getTypeColor(company.experiences[0].type)}`}
                  >
                    {company.experiences[0].type}
                  </span>
                </div>

                {/* Roles at this company */}
                <div className="bento-grid">
                  {company.experiences.map(exp => (
                    <div key={exp.id} className="bento-tile bento-span-3">
                      <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
                        {exp.title}
                      </h3>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-light-muted dark:text-dark-muted">
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
                      <div className="mt-5 space-y-2">
                        <h5 className="eyebrow">Key Achievements:</h5>
                        <ul className="space-y-1.5">
                          {exp.highlights.map((highlight, highlightIndex) => (
                            <li
                              key={highlightIndex}
                              className="flex items-start space-x-2 text-sm"
                            >
                              <span className="w-1.5 h-1.5 bg-primary-coral rounded-full mt-1.5 flex-shrink-0" />
                              <span className="text-light-muted dark:text-dark-muted">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
