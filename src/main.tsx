import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import {
  initPerformanceMonitoring,
  initPerformanceOptimizations,
} from './utils/performance';
import { initServiceWorker } from './utils/sw';
import { handle404Error } from './utils/clearCache';

// Initialize performance monitoring
initPerformanceMonitoring();

// Initialize performance optimizations
initPerformanceOptimizations();

// Initialize service worker
initServiceWorker();

// Handle 404 errors
handle404Error();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
