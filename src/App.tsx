import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import Layout from './components/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import './App.css';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
