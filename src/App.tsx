import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ThemeProvider } from './application/store/ThemeContext.tsx';
import { LanguageProvider } from './application/store/LanguageContext.tsx';
import Layout from './presentation/components/Layout';
import LoadingSpinner from './presentation/components/ui/LoadingSpinner';
import './App.css';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./presentation/pages/HomePage'));
const PrivacyPomodojoPage = lazy(
  () => import('@presentation/pages/PomoDojoPrivacyPage')
);
const PomoDojoTermsOfUsePage = lazy(
  () => import('@presentation/pages/PomoDojoTermsOfUsePage')
);

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/pomodojo/privacy"
                element={<PrivacyPomodojoPage />}
              />
              <Route
                path="/pomodojo/terms"
                element={<PomoDojoTermsOfUsePage />}
              />
            </Routes>
          </Suspense>
        </Layout>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
