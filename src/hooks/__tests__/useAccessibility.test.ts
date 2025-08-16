import { renderHook, act } from '@testing-library/react';
import { useAccessibility, accessibilityUtils } from '../useAccessibility';

// Mock requestAnimationFrame
const mockRequestAnimationFrame = jest.fn();
Object.defineProperty(window, 'requestAnimationFrame', {
  value: mockRequestAnimationFrame,
  writable: true,
});

describe('useAccessibility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequestAnimationFrame.mockImplementation((callback) => {
      // Execute callback immediately for testing
      setTimeout(callback, 0);
      return 1;
    });
  });

  describe('hook functionality', () => {
    it('returns containerRef and handlers', () => {
      const { result } = renderHook(() => useAccessibility());

      expect(result.current.containerRef).toBeDefined();
      expect(result.current.getFocusableElements).toBeDefined();
      expect(result.current.handleKeyDown).toBeDefined();
    });

    it('returns empty array when no container ref', () => {
      const { result } = renderHook(() => useAccessibility());

      const focusableElements = result.current.getFocusableElements();
      expect(focusableElements).toEqual([]);
    });

    it('handles key events correctly', () => {
      const onEscape = jest.fn();
      const onEnter = jest.fn();
      const onSpace = jest.fn();

      const { result } = renderHook(() =>
        useAccessibility({ onEscape, onEnter, onSpace })
      );

      // Set up container ref with focusable elements
      const container = document.createElement('div');
      const button = document.createElement('button');
      container.appendChild(button);
      document.body.appendChild(container);

      // Set the ref
      (result.current.containerRef as any).current = container;

      const mockEvent = {
        key: 'Escape',
        preventDefault: jest.fn(),
        target: button,
      } as any;

      act(() => {
        result.current.handleKeyDown(mockEvent);
      });

      expect(onEscape).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('handles Enter key', () => {
      const onEnter = jest.fn();
      const { result } = renderHook(() => useAccessibility({ onEnter }));

      // Set up container ref with focusable elements
      const container = document.createElement('div');
      const button = document.createElement('button');
      container.appendChild(button);
      document.body.appendChild(container);

      // Set the ref
      (result.current.containerRef as any).current = container;

      const mockEvent = {
        key: 'Enter',
        preventDefault: jest.fn(),
        target: button,
      } as any;

      act(() => {
        result.current.handleKeyDown(mockEvent);
      });

      expect(onEnter).toHaveBeenCalled();
    });

    it('handles Space key', () => {
      const onSpace = jest.fn();
      const { result } = renderHook(() => useAccessibility({ onSpace }));

      // Set up container ref with focusable elements
      const container = document.createElement('div');
      const button = document.createElement('button');
      container.appendChild(button);
      document.body.appendChild(container);

      // Set the ref
      (result.current.containerRef as any).current = container;

      const mockEvent = {
        key: ' ',
        preventDefault: jest.fn(),
        target: button,
      } as any;

      act(() => {
        result.current.handleKeyDown(mockEvent);
      });

      expect(onSpace).toHaveBeenCalled();
    });

    it('handles Tab key with focus trap', () => {
      const { result } = renderHook(() =>
        useAccessibility({ trapFocus: true })
      );

      // Set up container ref with focusable elements
      const container = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      container.appendChild(button1);
      container.appendChild(button2);
      document.body.appendChild(container);

      // Set the ref
      (result.current.containerRef as any).current = container;

      const mockEvent = {
        key: 'Tab',
        shiftKey: false,
        preventDefault: jest.fn(),
        target: button2, // Last element
      } as any;

      act(() => {
        result.current.handleKeyDown(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('handles Tab key with shift for focus trap', () => {
      const { result } = renderHook(() =>
        useAccessibility({ trapFocus: true })
      );

      // Set up container ref with focusable elements
      const container = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      container.appendChild(button1);
      container.appendChild(button2);
      document.body.appendChild(container);

      // Set the ref
      (result.current.containerRef as any).current = container;

      const mockEvent = {
        key: 'Tab',
        shiftKey: true,
        preventDefault: jest.fn(),
        target: button1, // First element
      } as any;

      act(() => {
        result.current.handleKeyDown(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('handles Arrow keys', () => {
      const { result } = renderHook(() => useAccessibility());

      // Set up container ref with focusable elements
      const container = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      container.appendChild(button1);
      container.appendChild(button2);
      document.body.appendChild(container);

      // Set the ref
      (result.current.containerRef as any).current = container;

      const mockEvent = {
        key: 'ArrowDown',
        preventDefault: jest.fn(),
        target: button1,
      } as any;

      act(() => {
        result.current.handleKeyDown(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('handles Arrow keys with focus trap', () => {
      const { result } = renderHook(() =>
        useAccessibility({ trapFocus: true })
      );

      // Set up container ref with focusable elements
      const container = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      container.appendChild(button1);
      container.appendChild(button2);
      document.body.appendChild(container);

      // Set the ref
      (result.current.containerRef as any).current = container;

      const mockEvent = {
        key: 'ArrowDown',
        preventDefault: jest.fn(),
        target: button2, // Last element
      } as any;

      act(() => {
        result.current.handleKeyDown(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('handles Arrow keys with focus trap for first element', () => {
      const { result } = renderHook(() =>
        useAccessibility({ trapFocus: true })
      );

      // Set up container ref with focusable elements
      const container = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      container.appendChild(button1);
      container.appendChild(button2);
      document.body.appendChild(container);

      // Set the ref
      (result.current.containerRef as any).current = container;

      const mockEvent = {
        key: 'ArrowUp',
        preventDefault: jest.fn(),
        target: button1, // First element
      } as any;

      act(() => {
        result.current.handleKeyDown(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('does not handle key events when no focusable elements', () => {
      const onEscape = jest.fn();
      const { result } = renderHook(() => useAccessibility({ onEscape }));

      const mockEvent = {
        key: 'Escape',
        preventDefault: jest.fn(),
        target: document.createElement('div'),
      } as any;

      act(() => {
        result.current.handleKeyDown(mockEvent);
      });

      expect(onEscape).not.toHaveBeenCalled();
    });

    it('handles unknown keys gracefully', () => {
      const { result } = renderHook(() => useAccessibility());

      // Set up container ref with focusable elements
      const container = document.createElement('div');
      const button = document.createElement('button');
      container.appendChild(button);
      document.body.appendChild(container);

      // Set the ref
      (result.current.containerRef as any).current = container;

      const mockEvent = {
        key: 'Unknown',
        preventDefault: jest.fn(),
        target: button,
      } as any;

      act(() => {
        result.current.handleKeyDown(mockEvent);
      });

      // Should not throw error
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('accessibilityUtils', () => {
    beforeEach(() => {
      // Mock document.body
      document.body.innerHTML = '';
      // Reset the singleton live region
      accessibilityUtils._liveRegion = null;
    });

    it('announce function creates live region on first call', () => {
      const message = 'Test announcement';

      accessibilityUtils.announce(message);

      const liveRegion = document.getElementById('accessibility-live-region');
      expect(liveRegion).toBeInTheDocument();
      expect(liveRegion?.getAttribute('aria-live')).toBe('polite');
      expect(liveRegion?.getAttribute('aria-atomic')).toBe('true');
    });

    it('announce function reuses existing live region', () => {
      const message1 = 'First announcement';
      const message2 = 'Second announcement';

      // First call creates the region
      accessibilityUtils.announce(message1);
      const liveRegion1 = document.getElementById('accessibility-live-region');

      // Clear the mock calls
      mockRequestAnimationFrame.mockClear();

      // Second call reuses the same region
      accessibilityUtils.announce(message2);
      const liveRegion2 = document.getElementById('accessibility-live-region');

      expect(liveRegion1).toBe(liveRegion2);

      // Wait for requestAnimationFrame to execute
      act(() => {
        const callback = mockRequestAnimationFrame.mock.calls[0][0];
        callback();
      });

      expect(liveRegion2?.textContent).toBe(message2);
    });

    it('announce function with assertive priority updates aria-live', () => {
      const message = 'Test announcement';

      accessibilityUtils.announce(message, 'assertive');

      const liveRegion = document.getElementById('accessibility-live-region');
      expect(liveRegion?.getAttribute('aria-live')).toBe('assertive');
    });

    it('announce function uses requestAnimationFrame for DOM updates', () => {
      const message = 'Test announcement';

      accessibilityUtils.announce(message);

      expect(mockRequestAnimationFrame).toHaveBeenCalledWith(expect.any(Function));
    });

    it('skipToMain function focuses main element', () => {
      const mainElement = document.createElement('main');
      document.body.appendChild(mainElement);

      const focusSpy = jest.spyOn(mainElement, 'focus');

      accessibilityUtils.skipToMain();

      expect(focusSpy).toHaveBeenCalled();
    });

    it('skipToMain function handles missing main element', () => {
      // No main element in document
      expect(() => {
        accessibilityUtils.skipToMain();
      }).not.toThrow();
    });

    it('focusFirstElement focuses first focusable element', () => {
      const container = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');

      container.appendChild(button1);
      container.appendChild(button2);
      document.body.appendChild(container);

      const focusSpy = jest.spyOn(button1, 'focus');

      accessibilityUtils.focusFirstElement(container);

      expect(focusSpy).toHaveBeenCalled();
    });

    it('focusFirstElement handles container with no focusable elements', () => {
      const container = document.createElement('div');
      const div = document.createElement('div');
      container.appendChild(div);
      document.body.appendChild(container);

      expect(() => {
        accessibilityUtils.focusFirstElement(container);
      }).not.toThrow();
    });

    it('isElementVisible returns true for visible element', () => {
      const element = document.createElement('div');
      element.style.width = '100px';
      element.style.height = '100px';
      element.style.visibility = 'visible';
      element.style.display = 'block';
      element.style.opacity = '1';

      // Mock getBoundingClientRect to return non-zero dimensions
      element.getBoundingClientRect = jest.fn().mockReturnValue({
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        right: 100,
        bottom: 100,
      });

      // Mock getComputedStyle
      const mockStyle = {
        visibility: 'visible',
        display: 'block',
        opacity: '1',
      };
      jest.spyOn(window, 'getComputedStyle').mockReturnValue(mockStyle as any);

      document.body.appendChild(element);

      const result = accessibilityUtils.isElementVisible(element);

      expect(result).toBe(true);
    });

    it('isElementVisible returns false for hidden element', () => {
      const element = document.createElement('div');
      element.style.visibility = 'hidden';

      // Mock getComputedStyle
      const mockStyle = {
        visibility: 'hidden',
        display: 'block',
        opacity: '1',
      };
      jest.spyOn(window, 'getComputedStyle').mockReturnValue(mockStyle as any);

      document.body.appendChild(element);

      const result = accessibilityUtils.isElementVisible(element);

      expect(result).toBe(false);
    });

    it('isElementVisible returns false for element with zero dimensions', () => {
      const element = document.createElement('div');

      // Mock getBoundingClientRect to return zero dimensions
      element.getBoundingClientRect = jest.fn().mockReturnValue({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      });

      // Mock getComputedStyle
      const mockStyle = {
        visibility: 'visible',
        display: 'block',
        opacity: '1',
      };
      jest.spyOn(window, 'getComputedStyle').mockReturnValue(mockStyle as any);

      document.body.appendChild(element);

      const result = accessibilityUtils.isElementVisible(element);

      expect(result).toBe(false);
    });

    it('isElementVisible returns false for element with display none', () => {
      const element = document.createElement('div');

      // Mock getBoundingClientRect to return non-zero dimensions
      element.getBoundingClientRect = jest.fn().mockReturnValue({
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        right: 100,
        bottom: 100,
      });

      // Mock getComputedStyle
      const mockStyle = {
        visibility: 'visible',
        display: 'none',
        opacity: '1',
      };
      jest.spyOn(window, 'getComputedStyle').mockReturnValue(mockStyle as any);

      document.body.appendChild(element);

      const result = accessibilityUtils.isElementVisible(element);

      expect(result).toBe(false);
    });

    it('isElementVisible returns false for element with opacity 0', () => {
      const element = document.createElement('div');

      // Mock getBoundingClientRect to return non-zero dimensions
      element.getBoundingClientRect = jest.fn().mockReturnValue({
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        right: 100,
        bottom: 100,
      });

      // Mock getComputedStyle
      const mockStyle = {
        visibility: 'visible',
        display: 'block',
        opacity: '0',
      };
      jest.spyOn(window, 'getComputedStyle').mockReturnValue(mockStyle as any);

      document.body.appendChild(element);

      const result = accessibilityUtils.isElementVisible(element);

      expect(result).toBe(false);
    });
  });
});
