import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, X } from 'lucide-react';
import type { MediumArticle } from '@domain/models';

interface MediumModalProps {
  article: MediumArticle;
  onClose: () => void;
}

const MediumModal: React.FC<MediumModalProps> = ({ article, onClose }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        data-testid="medium-modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-light-surface dark:bg-dark-surface rounded-xl border border-light-muted/20 dark:border-dark-muted/20 max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-light-muted/20 dark:border-dark-muted/20">
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
              {article.title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Article Image */}
            {article.imageUrl && (
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Meta */}
            <div className="flex items-center space-x-6 text-sm text-light-muted dark:text-dark-muted">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedDate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <p className="text-light-text dark:text-dark-text leading-relaxed">
                {article.description || 'Summary unavailable'}
              </p>
            </div>

            {/* Content Snippet */}
            {article.contentSnippet && (
              <div className="prose prose-lg max-w-none">
                <div
                  className="text-light-text dark:text-dark-text leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.contentSnippet }}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-light-muted/20 dark:border-dark-muted/20">
            <div className="text-sm text-light-muted dark:text-dark-muted">
              Read the full article on Medium
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:bg-light-primary/90 dark:hover:bg-dark-primary/90 transition-colors"
            >
              <span>Read on Medium</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MediumModal;
