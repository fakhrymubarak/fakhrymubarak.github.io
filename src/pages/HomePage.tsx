import React from 'react'
import IntroSection from '../components/sections/IntroSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import FooterSection from '../components/sections/FooterSection'

const HomePage: React.FC = () => {
  return (
    <div className="pt-16">
      <IntroSection />
      <ProjectsSection />
      <ExperienceSection />
      <FooterSection />
    </div>
  )
}

export default HomePage 