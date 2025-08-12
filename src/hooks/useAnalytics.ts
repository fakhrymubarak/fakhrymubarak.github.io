import { useEffect, useRef } from 'react';
import { Analytics, logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase';

// Define a proper type for analytics parameters
type AnalyticsParameters = Record<string, string | number | boolean | null | undefined>;

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

  const trackPageView = (pageName: string) => {
    trackEvent('page_view', { page_name: pageName });
  };

  const trackButtonClick = (buttonName: string, location?: string) => {
    trackEvent('button_click', {
      button_name: buttonName,
      location: location
    });
  };

  const trackProjectView = (projectName: string) => {
    trackEvent('project_view', { project_name: projectName });
  };

  const trackContactClick = (method: string) => {
    trackEvent('contact_click', { contact_method: method });
  };

  return {
    trackEvent,
    trackPageView,
    trackButtonClick,
    trackProjectView,
    trackContactClick,
  };
};
