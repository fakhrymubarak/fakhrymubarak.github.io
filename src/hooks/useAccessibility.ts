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

// Optimized accessibility utilities
export const accessibilityUtils = {
  // Use a singleton aria-live region to avoid DOM manipulation
  _liveRegion: null as HTMLElement | null,
  
  _getLiveRegion: () => {
    if (!accessibilityUtils._liveRegion) {
      // Check if live region already exists
      let existingRegion = document.getElementById('accessibility-live-region');
      if (existingRegion) {
        accessibilityUtils._liveRegion = existingRegion;
      } else {
        // Create live region once and reuse it
        const liveRegion = document.createElement('div');
        liveRegion.id = 'accessibility-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        
        document.body.appendChild(liveRegion);
        accessibilityUtils._liveRegion = liveRegion;
      }
    }
    return accessibilityUtils._liveRegion;
  },

  // Optimized announcement that reuses DOM element
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const liveRegion = accessibilityUtils._getLiveRegion();
    if (!liveRegion) return;

    // Update aria-live priority if needed
    if (liveRegion.getAttribute('aria-live') !== priority) {
      liveRegion.setAttribute('aria-live', priority);
    }

    // Clear previous content and set new message
    liveRegion.textContent = '';
    
    // Use requestAnimationFrame to ensure DOM update happens in next frame
    requestAnimationFrame(() => {
      if (liveRegion) {
        liveRegion.textContent = message;
      }
    });
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
