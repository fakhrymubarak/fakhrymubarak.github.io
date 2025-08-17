import { useEffect, useRef } from 'react';
import { Analytics, logEvent } from 'firebase/analytics';
import { analytics } from '@/infrastructure/adapters/firebase';

// Define a proper type for analytics parameters
type AnalyticsParameters = Record<
  string,
  string | number | boolean | null | undefined
>;

export const useAnalytics = () => {
  const analyticsRef = useRef<Analytics | null>(null);

  useEffect(() => {
    analyticsRef.current = analytics;
  }, []);

  const trackEvent = (eventName: string, parameters?: AnalyticsParameters) => {
    if (analyticsRef.current) {
      logEvent(analyticsRef.current, eventName, parameters);
    }
  };

  const trackEventIdle = (
    eventName: string,
    parameters?: AnalyticsParameters
  ) => {
    if (analyticsRef.current) {
      // Use requestIdleCallback to defer analytics to idle time
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(
          () => {
            logEvent(analyticsRef.current!, eventName, parameters);
          },
          { timeout: 2000 }
        );
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(() => {
          logEvent(analyticsRef.current!, eventName, parameters);
        }, 0);
      }
    }
  };

  const trackPageView = (pageName: string) => {
    trackEvent('page_view', { page_name: pageName });
  };

  const trackButtonClick = (buttonName: string, location?: string) => {
    // Use idle callback for button clicks to avoid blocking theme toggle
    trackEventIdle('button_click', {
      button_name: buttonName,
      location: location,
    });
  };

  const trackProjectView = (projectName: string) => {
    trackEventIdle('project_view', { project_name: projectName });
  };

  const trackContactClick = (method: string) => {
    trackEventIdle('contact_click', { contact_method: method });
  };

  return {
    trackEvent,
    trackEventIdle,
    trackPageView,
    trackButtonClick,
    trackProjectView,
    trackContactClick,
  };
};
