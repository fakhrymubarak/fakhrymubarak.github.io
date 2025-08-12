import { useEffect, RefObject } from 'react';

// Lightweight animation utilities to reduce Framer Motion usage

export const fadeInUp = {
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'opacity 0.5s ease, transform 0.5s ease',
};

export const fadeInUpVisible = {
  opacity: 1,
  transform: 'translateY(0)',
};

export const fadeIn = {
  opacity: 0,
  transition: 'opacity 0.3s ease',
};

export const fadeInVisible = {
  opacity: 1,
};

export const scaleIn = {
  opacity: 0,
  transform: 'scale(0.9)',
  transition: 'opacity 0.3s ease, transform 0.3s ease',
};
// CSS animation classes for simple animations
export const animationClasses = {
  fadeInUp: 'animate-fade-in-up',
  fadeIn: 'animate-fade-in',
  scaleIn: 'animate-scale-in',
  float: 'animate-float',
  pulse: 'animate-pulse',
};

// Intersection Observer hook for simple animations
export const useIntersectionAnimation = (
  elementRef: RefObject<HTMLElement>,
  animationClass: string,
  threshold = 0.1
) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add(animationClass);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, animationClass, threshold]);
};
