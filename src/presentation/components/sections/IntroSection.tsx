import React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useIntro, useProjects } from '@/presentation';
import { getYearsOfExperience } from '@/domain';

const IntroSection: React.FC = () => {
  const { introduction } = useIntro();
  const { projects } = useProjects();

  const yearsOfExperience = getYearsOfExperience();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="home" className="section">
      <div className="container">
        <LazyMotion features={domAnimation}>
          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bento-grid"
          >
            {/* ── Headline tile: the editorial anchor ── */}
            <m.div
              variants={itemVariants}
              className="bento-tile-feature bento-span-4 flex flex-col justify-center min-h-[18rem] md:min-h-[24rem]"
            >
              <p className="eyebrow mb-4">{introduction.title[0]}</p>
              <h1 className="display-xl text-light-text dark:text-dark-text">
                {introduction.title[1]}
              </h1>
              <p className="body-text mt-6 max-w-xl">
                {introduction.description}
              </p>
            </m.div>

            {/* ── Portrait tile ── */}
            <m.div
              variants={itemVariants}
              className="bento-tile bento-span-2 sm:col-span-2 flex items-center justify-center p-0 min-h-[18rem] md:min-h-[24rem]"
            >
              <img
                src={introduction.imagePath}
                alt="Fakhry Mubarak"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                width={320}
                height={320}
                decoding="async"
                sizes="(min-width: 1024px) 20rem, 18rem"
              />
            </m.div>

            {/* ── Stat: years of experience ── */}
            <m.div
              variants={itemVariants}
              className="bento-tile bento-span-2 flex flex-col justify-between min-h-[9rem]"
            >
              <p className="eyebrow">Experience</p>
              <p className="display-lg text-primary-coral leading-none">
                +{yearsOfExperience} yrs
              </p>
            </m.div>

            {/* ── Stat: projects shipped ── */}
            <m.div
              variants={itemVariants}
              className="bento-tile bento-span-2 flex flex-col justify-between min-h-[9rem]"
            >
              <p className="eyebrow">Shipped</p>
              <p className="display-lg text-primary-lavender leading-none">
                +{projects.length} projects
              </p>
            </m.div>

            {/* ── Tech stack tile ── */}
            <m.div
              variants={itemVariants}
              className="bento-tile bento-span-2 sm:col-span-2 flex flex-col min-h-[9rem]"
            >
              <h3 className="eyebrow mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {introduction.techStack.map(tech => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full
                      bg-black/[0.04] dark:bg-white/[0.06]
                      border border-black/[0.05] dark:border-white/[0.07]"
                  >
                    <tech.icon
                      color={tech.color}
                      size={16}
                      role="img"
                      aria-label={`${tech.name} icon`}
                    />
                    <span className="font-medium text-xs">{tech.name}</span>
                  </div>
                ))}
              </div>
            </m.div>
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default IntroSection;
