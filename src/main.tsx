import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import {
  initPerformanceMonitoring,
  initPerformanceOptimizations,
} from '@/domain';
import { initServiceWorker } from './domain/valueObjects/sw';
// Initialize performance monitoring
initPerformanceMonitoring();

// Initialize performance optimizations
initPerformanceOptimizations();

// Initialize service worker
initServiceWorker();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
