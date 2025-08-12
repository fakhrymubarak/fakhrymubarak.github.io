import React from 'react';
import SEO from '../components/SEO';
import SkipLink from '../components/ui/SkipLink';
import IntroSection from '../components/sections/IntroSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import FooterSection from '../components/sections/FooterSection';

const HomePage: React.FC = () => {
  return (
    <>
      <SEO />
      <SkipLink />
      <main id="main-content" className="pt-16" tabIndex={-1}>
        <IntroSection />
        <ProjectsSection />
        <ExperienceSection />
        <FooterSection />
      </main>
    </>
  );
};

export default HomePage;
