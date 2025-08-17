import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useIntersectionAnimation, animationClasses } from '@/domain';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
const mockObserver = {
  observe: jest.fn(),
  disconnect: jest.fn(),
};

describe('Animation utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.IntersectionObserver = mockIntersectionObserver;
    mockIntersectionObserver.mockReturnValue(mockObserver);
  });

  describe('animationClasses', () => {
    it('exports animation class names', () => {
      expect(animationClasses.fadeInUp).toBe('animate-fade-in-up');
      expect(animationClasses.fadeIn).toBe('animate-fade-in');
      expect(animationClasses.scaleIn).toBe('animate-scale-in');
      expect(animationClasses.float).toBe('animate-float');
      expect(animationClasses.pulse).toBe('animate-pulse');
    });
  });

  describe('useIntersectionAnimation', () => {
    it('creates intersection observer when element ref is provided', () => {
      const mockElement = {
        classList: {
          add: jest.fn(),
        },
      };

      renderHook(() => {
        const elementRef = useRef<HTMLDivElement>(mockElement as any);
        useIntersectionAnimation(elementRef, 'test-animation');
        return elementRef;
      });

      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        { threshold: 0.1 }
      );
    });

    it('uses custom threshold when provided', () => {
      const mockElement = {
        classList: {
          add: jest.fn(),
        },
      };

      renderHook(() => {
        const elementRef = useRef<HTMLDivElement>(mockElement as any);
        useIntersectionAnimation(elementRef, 'test-animation', 0.5);
        return elementRef;
      });

      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        { threshold: 0.5 }
      );
    });

    it('handles null element ref gracefully', () => {
      expect(mockObserver.observe).not.toHaveBeenCalled();
    });

    it('disconnects observer on cleanup', () => {
      const mockElement = {
        classList: {
          add: jest.fn(),
        },
      };

      const { unmount } = renderHook(() => {
        const elementRef = useRef<HTMLDivElement>(mockElement as any);
        useIntersectionAnimation(elementRef, 'test-animation');
        return elementRef;
      });

      unmount();

      expect(mockObserver.disconnect).toHaveBeenCalled();
    });

    it('adds animation class when element becomes visible', () => {
      const mockElement = {
        classList: {
          add: jest.fn(),
        },
      };

      renderHook(() => {
        const elementRef = useRef<HTMLDivElement>(mockElement as any);
        useIntersectionAnimation(elementRef, 'test-animation');
        return elementRef;
      });

      // Simulate intersection
      const observerCallback = mockIntersectionObserver.mock.calls[0][0];
      observerCallback([{ isIntersecting: true }]);

      expect(mockElement.classList.add).toHaveBeenCalledWith('test-animation');
      expect(mockObserver.disconnect).toHaveBeenCalled();
    });

    it('does not add animation class when element is not intersecting', () => {
      const mockElement = {
        classList: {
          add: jest.fn(),
        },
      };

      renderHook(() => {
        const elementRef = useRef<HTMLDivElement>(mockElement as any);
        useIntersectionAnimation(elementRef, 'test-animation');
        return elementRef;
      });

      // Simulate non-intersection
      const observerCallback = mockIntersectionObserver.mock.calls[0][0];
      observerCallback([{ isIntersecting: false }]);

      expect(mockElement.classList.add).not.toHaveBeenCalled();
      expect(mockObserver.disconnect).not.toHaveBeenCalled();
    });
  });
});
