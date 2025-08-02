// Performance monitoring utilities

export interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
}

export interface PerformanceObserver {
  disconnect: () => void
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  }

  private observers: PerformanceObserver[] = []

  constructor() {
    this.initObservers()
    this.measureTTFB()
  }

  private initObservers() {
    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
          if (fcpEntry) {
            this.metrics.fcp = fcpEntry.startTime
            this.logMetric('FCP', fcpEntry.startTime)
          }
        })
        fcpObserver.observe({ entryTypes: ['paint'] })
        this.observers.push(fcpObserver)
      } catch (error) {
        console.warn('FCP observer failed:', error)
      }

      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          if (lastEntry) {
            this.metrics.lcp = lastEntry.startTime
            this.logMetric('LCP', lastEntry.startTime)
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        this.observers.push(lcpObserver)
      } catch (error) {
        console.warn('LCP observer failed:', error)
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            this.metrics.fid = entry.processingStart - entry.startTime
            this.logMetric('FID', this.metrics.fid)
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
        this.observers.push(fidObserver)
      } catch (error) {
        console.warn('FID observer failed:', error)
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          this.metrics.cls = clsValue
          this.logMetric('CLS', clsValue)
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(clsObserver)
      } catch (error) {
        console.warn('CLS observer failed:', error)
      }
    }
  }

  private measureTTFB() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart
        this.logMetric('TTFB', this.metrics.ttfb)
      }
    }
  }

  private logMetric(name: string, value: number) {
    console.log(`Performance Metric - ${name}:`, value)

    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
      })
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  public getMetricScore(metric: keyof PerformanceMetrics): 'good' | 'needs-improvement' | 'poor' {
    const value = this.metrics[metric]
    if (value === null) return 'needs-improvement'

    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 },
    }

    const threshold = thresholds[metric]
    if (!threshold) return 'needs-improvement'

    if (value <= threshold.good) return 'good'
    if (value <= threshold.poor) return 'needs-improvement'
    return 'poor'
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null

export const initPerformanceMonitoring = () => {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor()
  }
  return performanceMonitor
}

export const getPerformanceMonitor = () => {
  return performanceMonitor
}

// Utility functions
export const measureTime = (name: string, fn: () => void) => {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start}ms`)
  return end - start
}

export const measureAsyncTime = async (name: string, fn: () => Promise<void>) => {
  const start = performance.now()
  await fn()
  const end = performance.now()
  console.log(`${name} took ${end - start}ms`)
  return end - start
} 