import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ThemeProvider } from './application/store/ThemeContext.tsx';
import Layout from './presentation/components/Layout';
import LoadingSpinner from './presentation/components/ui/LoadingSpinner';
import './App.css';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./presentation/pages/HomePage'));

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
