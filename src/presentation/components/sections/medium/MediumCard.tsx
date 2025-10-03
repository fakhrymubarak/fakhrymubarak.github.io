import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import type { MediumArticle } from '@domain/models';

interface MediumCardProps {
  article: MediumArticle;
  index: number;
}

const MediumCard: React.FC<MediumCardProps> = ({ article, index }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-light-surface dark:bg-dark-surface rounded-xl border border-light-muted/20 dark:border-dark-muted/20 hover:border-light-primary/30 dark:hover:border-dark-primary/30 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {article.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6 flex flex-col gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-light-text dark:text-dark-text group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-light-muted dark:text-dark-muted line-clamp-3">
            {article.description || 'Summary unavailable'}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-light-muted dark:text-dark-muted">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.publishedDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-primary-coral/10 text-primary-coral text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="px-2 py-1 bg-light-muted/20 text-light-muted dark:text-dark-muted text-xs rounded-full">
                +{article.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm px-4 py-2"
          >
            View on Medium
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default MediumCard;
