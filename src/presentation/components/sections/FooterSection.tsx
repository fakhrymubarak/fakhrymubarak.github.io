import React from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Youtube,
} from 'lucide-react';
import { useAnalytics, useFooter, useTranslations } from '@/presentation';

const FooterSection: React.FC = () => {
  const { footer } = useFooter();
  const { trackContactClick, trackButtonClick } = useAnalytics();
  const t = useTranslations();

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

  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getContactIcon = (icon: string) => {
    switch (icon) {
      case 'mail':
        return <Mail className="w-5 h-5" />;
      case 'message-circle':
        return <MessageCircle className="w-5 h-5" />;
      case 'download':
        return <Download className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <section
      id="contact"
      className="section pb-0"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}
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
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="heading-2 text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-2">
              {t.footer.getInTouch}
            </h2>
            <p className="body-text max-w-2xl mx-auto">
              {t.footer.getInTouchBody}
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {/* Contact Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Links */}
              <div className="space-y-4">
                <h3 className="heading-3">{t.footer.letsConnect}</h3>
                <p className="body-text">{t.footer.letsConnectBody}</p>

                <div className="space-y-3">
                  {footer.contacts.map(contact => (
                    <a
                      key={contact.type}
                      href={contact.url}
                      target={contact.type === 'email' ? undefined : '_blank'}
                      rel={
                        contact.type === 'email'
                          ? undefined
                          : 'noopener noreferrer'
                      }
                      className="flex items-center space-x-3 p-4 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-colors group"
                      onClick={() => trackContactClick(contact.type)}
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
                <h3 className="heading-3">{t.footer.followMe}</h3>
                <div className="flex space-x-4">
                  {footer.socialMedia.map(social => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-primary-coral hover:text-white transition-all duration-300 group"
                      aria-label={social.name}
                      onClick={() =>
                        trackButtonClick(
                          `social_${social.name.toLowerCase()}`,
                          'footer'
                        )
                      }
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
            className="border-t border-light-muted/20 dark:border-dark-muted/20 pt-8 pb-8 text-center"
          >
            <p className="text-sm text-light-muted dark:text-dark-muted">
              {footer.signature} - {new Date().getFullYear()}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterSection;
