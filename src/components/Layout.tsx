import React, {useEffect} from 'react';
import Header from './Header';
import {useAnalytics} from '../hooks/useAnalytics';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {trackPageView} = useAnalytics();

  useEffect(() => {
    // Track the initial page view
    trackPageView(window.location.pathname);
  }, [trackPageView]);

  return (
    <div className="app">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
