import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  priority = false,
  onLoad,
  onError,
  sizes = '100vw',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If priority is true, load immediately
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate responsive srcSet for WebP images
  const generateSrcSet = (imageSrc: string) => {
    // For now, we'll use the same image but in a real app you'd have multiple sizes
    // This is a placeholder for responsive image optimization
    return `${imageSrc} 1x, ${imageSrc} 2x`;
  };

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}
      >
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
            <span className="text-xs">?</span>
          </div>
          <p className="text-xs">Image failed to load</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Placeholder */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
          >
            {placeholder ? (
              <img
                src={placeholder}
                alt=""
                className="w-full h-full object-cover opacity-50"
              />
            ) : (
              <LoadingSpinner size="md" color="gray" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Image */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          srcSet={generateSrcSet(src)}
        />
      )}
    </div>
  );
};

export default ResponsiveImage;
