import React, { lazy, Suspense } from 'react';
import SEO from '../components/SEO';
import SkipLink from '../components/ui/SkipLink';
import IntroSection from '../components/sections/IntroSection';
const ProjectsSection = lazy(
  () => import('../components/sections/ProjectsSection')
);
const CertificatesSection = lazy(
  () => import('../components/sections/CertificatesSection')
);
const ExperienceSection = lazy(
  () => import('../components/sections/ExperienceSection')
);
const FooterSection = lazy(
  () => import('../components/sections/FooterSection')
);

const HomePage: React.FC = () => {
  return (
    <>
      <SEO />
      <SkipLink />
      <main id="main-content" className="pt-16" tabIndex={-1}>
        <IntroSection />
        <Suspense fallback={null}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={null}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={null}>
          <CertificatesSection />
        </Suspense>
        <Suspense fallback={null}>
          <FooterSection />
        </Suspense>
      </main>
    </>
  );
};

export default HomePage;
