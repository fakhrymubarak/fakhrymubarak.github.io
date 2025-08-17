import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  ExternalLink,
  Award,
  BookOpen,
  Star,
  Calendar,
  Hash,
} from 'lucide-react';
import { useAnalytics } from '@/presentation';
import { useAccessibility, accessibilityUtils } from '@/presentation';
import type { Certificate } from '@/domain';

interface CertificateModalProps {
  certificate: (Certificate & { categoryType: string }) | null;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  const { trackButtonClick } = useAnalytics();
  const { containerRef, handleKeyDown } = useAccessibility({
    onEscape: onClose,
    trapFocus: true,
    autoFocus: true,
  });

  useEffect(() => {
    // Only manage body scroll and announce when certificate is actually provided
    if (certificate) {
      // Announce modal opening to screen readers
      accessibilityUtils.announce(
        `Certificate modal opened: ${certificate.title}`
      );

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Always restore body scroll when component unmounts or certificate changes
      document.body.style.overflow = 'unset';
    };
  }, [certificate]);

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'award':
        return <Award className="w-5 h-5" />;
      case 'course':
        return <BookOpen className="w-5 h-5" />;
      case 'professional':
        return <Star className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const getCategoryLabel = (type: string) => {
    switch (type) {
      case 'award':
        return 'Award';
      case 'course':
        return 'Course';
      case 'professional':
        return 'Professional';
      default:
        return 'Certificate';
    }
  };

  const handleClose = () => {
    trackButtonClick('close_certificate_modal', 'certificate_modal');
    accessibilityUtils.announce('Certificate modal closed');
    onClose();
  };

  const handleViewCertificate = () => {
    trackButtonClick(
      'view_certificate_modal',
      `certificate_${certificate?.title}`
    );
  };

  // Early return after all hooks have been called
  if (!certificate) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      aria-describedby="certificate-modal-description"
    >
      <motion.div
        ref={containerRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-light-surface dark:bg-dark-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        role="document"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary-coral/10">
                {getCategoryIcon(certificate.categoryType)}
              </div>
              <h2
                id="certificate-modal-title"
                className="text-2xl font-bold text-light-text dark:text-dark-text"
              >
                {certificate.title}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-light-muted dark:text-dark-muted hover:text-primary-coral transition-colors focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2 rounded"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Certificate Details */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p id="certificate-modal-description" className="body-text">
                {certificate.description}
              </p>
            </div>

            {/* Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-light-muted dark:text-dark-muted" />
                <div>
                  <p className="text-sm text-light-muted dark:text-dark-muted">
                    Issue Date
                  </p>
                  <p className="font-medium text-light-text dark:text-dark-text">
                    {certificate.issueDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Hash className="w-4 h-4 text-light-muted dark:text-dark-muted" />
                <div>
                  <p className="text-sm text-light-muted dark:text-dark-muted">
                    Credential ID
                  </p>
                  <p className="font-medium text-light-text dark:text-dark-text font-mono text-sm">
                    {certificate.credentialId}
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">
                Status
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  certificate.status === 'active'
                    ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                    : 'bg-red-500/10 text-red-600 dark:text-red-400'
                }`}
              >
                {certificate.status === 'active' ? 'Active' : 'Expired'}
              </span>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary-coral/10 text-primary-coral text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-light-muted dark:text-dark-muted">
                {getCategoryLabel(certificate.categoryType)}
              </span>
              <div className="flex space-x-2">
                <a
                  href={certificate.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm px-4 py-2"
                  onClick={handleViewCertificate}
                  aria-label={`View ${certificate.title} certificate`}
                >
                  View Certificate
                  <ExternalLink className="w-3 h-3 ml-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CertificateModal;
