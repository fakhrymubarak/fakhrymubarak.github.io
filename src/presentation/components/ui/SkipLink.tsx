import React from 'react';
import { accessibilityUtils } from '@/presentation/hooks/useAccessibility';

/**
 * SkipLink component is used to skip to the main content of the page.
 * It is a small link that is hidden by default and becomes visible when the user focuses on it.
 */
const SkipLink: React.FC = () => {
  const handleSkipToMain = () => {
    accessibilityUtils.skipToMain();
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkipToMain}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-coral focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
