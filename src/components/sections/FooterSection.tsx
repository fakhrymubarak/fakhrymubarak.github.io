import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../../data/portfolio'
import { Mail, MessageCircle, Download, Instagram, Linkedin, Github, Youtube } from 'lucide-react'

const FooterSection: React.FC = () => {
  const { footer } = portfolioData

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

  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />
      case 'github':
        return <Github className="w-5 h-5" />
      case 'youtube':
        return <Youtube className="w-5 h-5" />
      default:
        return null
    }
  }

  const getContactIcon = (icon: string) => {
    switch (icon) {
      case 'mail':
        return <Mail className="w-5 h-5" />
      case 'message-circle':
        return <MessageCircle className="w-5 h-5" />
      case 'download':
        return <Download className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <section id="contact" className="section">
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
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-2">GET IN TOUCH</h2>
            <p className="body-text max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contact Image */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <img
                  src={footer.contactImage}
                  alt="Contact me"
                  className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl object-cover shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              </div>
            </motion.div>

            {/* Contact Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Links */}
              <div className="space-y-4">
                <h3 className="heading-3">Let's Connect</h3>
                <p className="body-text">
                  Feel free to reach out if you'd like to discuss potential collaborations,
                  have questions about my work, or just want to say hello!
                </p>

                <div className="space-y-3">
                  {footer.contacts.map((contact) => (
                    <a
                      key={contact.type}
                      href={contact.url}
                      target={contact.type === 'email' ? undefined : '_blank'}
                      rel={contact.type === 'email' ? undefined : 'noopener noreferrer'}
                      className="flex items-center space-x-3 p-4 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-colors group"
                    >
                      <div className="p-2 bg-primary-coral/10 rounded-lg group-hover:bg-primary-coral/20 transition-colors">
                        {getContactIcon(contact.icon)}
                      </div>
                      <span className="font-medium">{contact.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="heading-3">Follow Me</h3>
                <div className="flex space-x-4">
                  {footer.socialMedia.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-primary-coral hover:text-white transition-all duration-300 group"
                      aria-label={social.name}
                    >
                      {getSocialIcon(social.icon)}
                    </a>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div
            variants={itemVariants}
            className="border-t border-light-muted/20 dark:border-dark-muted/20 pt-8 text-center"
          >
            <p className="text-sm text-light-muted dark:text-dark-muted">
              {footer.signature}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FooterSection 