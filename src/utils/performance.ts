// Performance monitoring utilities

/* global setTimeout, process */

export interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
}

export interface PerformanceObserver {
  disconnect: () => void;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

interface GtagWindow extends Window {
  gtag?: (
    command: string,
    eventName: string,
    params: Record<string, unknown>
  ) => void;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  };

  private observers: PerformanceObserver[] = [];
  private isInitialized = false;

  constructor() {
    // Delay initialization to reduce initial load impact
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.initObservers();
        this.measureTTFB();
      }, 100);
    }
  }

  private initObservers() {
    if (this.isInitialized || !('PerformanceObserver' in window)) return;

    this.isInitialized = true;

    // First Contentful Paint - only measure once
    try {
      const fcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(
          entry => entry.name === 'first-contentful-paint'
        );
        if (fcpEntry) {
          this.metrics.fcp = fcpEntry.startTime;
          this.logMetric('FCP', fcpEntry.startTime);
          fcpObserver.disconnect(); // Stop observing after first measurement
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(fcpObserver);
    } catch (error) {
      // Silently fail to avoid console pollution
    }

    // Largest Contentful Paint - only measure once
    try {
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          this.metrics.lcp = lastEntry.startTime;
          this.logMetric('LCP', lastEntry.startTime);
          // Don't disconnect LCP observer as it can update
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (error) {
      // Silently fail to avoid console pollution
    }

    // First Input Delay - only measure once
    try {
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const fidEntry = entry as FirstInputEntry;
          this.metrics.fid = fidEntry.processingStart - fidEntry.startTime;
          this.logMetric('FID', this.metrics.fid);
          fidObserver.disconnect(); // Stop observing after first measurement
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (error) {
      // Silently fail to avoid console pollution
    }

    // Cumulative Layout Shift - only measure for first 5 seconds
    try {
      const clsStartTime = Date.now();
      const clsObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const clsEntry = entry as LayoutShiftEntry;
          if (!clsEntry.hadRecentInput) {
            this.metrics.cls = (this.metrics.cls || 0) + clsEntry.value;
            this.logMetric('CLS', this.metrics.cls);
          }
        });

        // Stop observing after 5 seconds to reduce overhead
        if (Date.now() - clsStartTime > 5000) {
          clsObserver.disconnect();
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (error) {
      // Silently fail to avoid console pollution
    }
  }

  private measureTTFB() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
        this.logMetric('TTFB', this.metrics.ttfb);
      }
    }
  }

  private logMetric(name: string, value: number) {
    // Only log in development to reduce production overhead
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}:`, value);
    }

    // Send to analytics if available
    const gtagWindow = window as GtagWindow;
    if (typeof gtagWindow.gtag !== 'undefined') {
      gtagWindow.gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
      });
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getMetricScore(
    metric: keyof PerformanceMetrics
  ): 'good' | 'needs-improvement' | 'poor' {
    const value = this.metrics[metric];
    if (value === null) return 'needs-improvement';

    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'needs-improvement';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export const initPerformanceMonitoring = () => {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
};

export const getPerformanceMonitor = () => {
  return performanceMonitor;
};

// Utility functions
export const measureTime = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name} took ${end - start}ms`);
  }
  return end - start;
};

export const measureAsyncTime = async (
  name: string,
  fn: () => Promise<void>
) => {
  const start = performance.now();
  await fn();
  const end = performance.now();
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name} took ${end - start}ms`);
  }
  return end - start;
};
