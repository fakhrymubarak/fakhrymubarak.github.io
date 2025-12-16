import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { useAnalytics } from '@/presentation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { trackPageView } = useAnalytics();
  const location = useLocation();
  const hideChrome = location.pathname.startsWith('/pomodojo');

  useEffect(() => {
    trackPageView(location.pathname);
  }, [trackPageView, location.pathname]);

  return (
    <div className="app">
      {!hideChrome && <Header />}
      <main className={hideChrome ? 'app-main app-main--bare' : 'app-main'}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
