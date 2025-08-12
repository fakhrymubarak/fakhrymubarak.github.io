import React, { useEffect, useRef, useCallback } from 'react';

interface UseAccessibilityOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  onSpace?: () => void;
  trapFocus?: boolean;
  autoFocus?: boolean;
}

export const useAccessibility = (options: UseAccessibilityOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];

    return Array.from(
      containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
      )
    ) as Element[];
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const { key, target } = event;
      const focusableElements = getFocusableElements();

      if (!focusableElements.length) return;

      const currentIndex = focusableElements.indexOf(target as Element);
      const isFirstElement = currentIndex === 0;
      const isLastElement = currentIndex === focusableElements.length - 1;

      switch (key) {
        case 'Escape':
          if (options.onEscape) {
            event.preventDefault();
            options.onEscape();
          }
          break;

        case 'Enter':
          if (options.onEnter) {
            event.preventDefault();
            options.onEnter();
          }
          break;

        case ' ':
          if (options.onSpace) {
            event.preventDefault();
            options.onSpace();
          }
          break;

        case 'Tab':
          if (options.trapFocus) {
            if (event.shiftKey) {
              if (isFirstElement) {
                event.preventDefault();
                (
                  focusableElements[focusableElements.length - 1] as HTMLElement
                ).focus();
              }
            } else {
              if (isLastElement) {
                event.preventDefault();
                (focusableElements[0] as HTMLElement).focus();
              }
            }
          }
          break;

        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          if (currentIndex < focusableElements.length - 1) {
            (focusableElements[currentIndex + 1] as HTMLElement).focus();
          } else if (options.trapFocus) {
            (focusableElements[0] as HTMLElement).focus();
          }
          break;

        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          if (currentIndex > 0) {
            (focusableElements[currentIndex - 1] as HTMLElement).focus();
          } else if (options.trapFocus) {
            (
              focusableElements[focusableElements.length - 1] as HTMLElement
            ).focus();
          }
          break;
      }
    },
    [options, getFocusableElements]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Auto-focus first focusable element
    if (options.autoFocus) {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [options.autoFocus, getFocusableElements]);

  return {
    containerRef,
    getFocusableElements,
    handleKeyDown,
  };
};

// Utility functions for accessibility
export const accessibilityUtils = {
  // Announce to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    window.setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  },

  // Skip to the main content
  skipToMain: () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      (mainContent as HTMLElement).focus();
      accessibilityUtils.announce('Navigated to main content');
    }
  },

  // Focus management
  focusFirstElement: (container: Element) => {
    const focusableElements = Array.from(
      container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  },

  // Check if an element is visible
  isElementVisible: (element: Element): boolean => {
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);

    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style.visibility !== 'hidden' &&
      style.display !== 'none' &&
      style.opacity !== '0'
    );
  },
};
