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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card bento-tile-interactive group h-full flex flex-col p-0"
    >
      {article.imageUrl && (
        <div className="relative overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="space-y-2">
          <h3 className="font-semibold text-light-text dark:text-dark-text line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-light-muted dark:text-dark-muted line-clamp-2">
            {article.description || 'Summary unavailable'}
          </p>
        </div>

        <div className="flex items-center space-x-4 text-sm text-light-muted dark:text-dark-muted">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(article.publishedDate)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{article.readTime}</span>
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

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-sm px-4 py-2 rounded-full mt-auto self-start"
        >
          View on Medium
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </div>
    </motion.article>
  );
};

export default MediumCard;
