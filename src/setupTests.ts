import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

// Extend Jest matchers for jest-axe
expect.extend(toHaveNoViolations);

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
  root: Element | null = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
  }),
});

// Suppress console warnings in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const message = args[0];
    // Suppress common test warnings
    if (
      typeof message === 'string' &&
      (message.includes('Warning: ReactDOM.render is no longer supported') ||
        message.includes('Warning: `ReactDOMTestUtils.act` is deprecated') ||
        message.includes('React does not recognize the `whileInView` prop') ||
        message.includes('React does not recognize the `whileHover` prop') ||
        message.includes('Function components cannot be given refs') ||
        message.includes(
          'Not implemented: HTMLCanvasElement.prototype.getContext'
        ) ||
        message.includes('Warning: React does not recognize the') ||
        message.includes(
          'Warning: A suspended resource finished loading inside a test'
        ))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
