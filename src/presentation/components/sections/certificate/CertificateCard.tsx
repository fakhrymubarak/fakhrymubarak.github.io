import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, BookOpen, Star } from 'lucide-react';
import { useAnalytics } from '@/presentation';
import type { Certificate } from '@/domain';

interface CertificateCardProps {
  certificate: Certificate & { categoryType: string };
  index: number;
  onSelect: (id: string) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  index,
  onSelect,
}) => {
  const { trackButtonClick } = useAnalytics();

  const handleCertificateClick = () => {
    trackButtonClick('certificate_view', `certificate_${certificate.title}`);
    onSelect(certificate.id);
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'award':
        return <Award className="w-4 h-4" />;
      case 'course':
        return <BookOpen className="w-4 h-4" />;
      case 'professional':
        return <Star className="w-4 h-4" />;
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'award':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
      case 'course':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'professional':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card group cursor-pointer h-full"
      onClick={handleCertificateClick}
    >
      {/* Certificate Content */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${getCategoryColor(certificate.categoryType)}`}
            >
              {getCategoryIcon(certificate.categoryType)}
            </div>
            <div>
              <h3 className="font-semibold text-light-text dark:text-dark-text line-clamp-2">
                {certificate.title}
              </h3>
              <p className="text-sm text-light-muted dark:text-dark-muted">
                {certificate.issueDate}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-light-muted dark:text-dark-muted line-clamp-3 mb-4">
          {certificate.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {certificate.skills.slice(0, 3).map((skill: string) => (
            <span
              key={skill}
              className="px-2 py-1 bg-primary-coral/10 text-primary-coral text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
          {certificate.skills.length > 3 && (
            <span className="px-2 py-1 bg-light-muted/20 text-light-muted dark:text-dark-muted text-xs rounded-full">
              +{certificate.skills.length - 3}
            </span>
          )}
        </div>

        {/* Bottom Section - Status Badge and Action Button */}
        <div className="flex items-center justify-between mt-auto">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              certificate.status === 'active'
                ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                : 'bg-red-500/10 text-red-600 dark:text-red-400'
            }`}
          >
            {certificate.status === 'active' ? 'Active' : 'Expired'}
          </span>

          {/* Action Button */}
          <a
            href={certificate.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm px-4 py-2"
            onClick={e => {
              e.stopPropagation();
              trackButtonClick(
                'view_certificate',
                `certificate_${certificate.title}`
              );
            }}
          >
            View Certificate
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
