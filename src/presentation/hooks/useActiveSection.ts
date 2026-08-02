import { useEffect, useState } from 'react';

export const useActiveSection = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      entries => {
        const visibleIds = new Set(
          entries
            .filter(entry => entry.isIntersecting)
            .map(entry => entry.target.id)
        );

        const lastVisibleId = sectionIds.filter(id => visibleIds.has(id)).pop();

        if (lastVisibleId) {
          setActiveSection(lastVisibleId);
        }
      },
      { rootMargin: '-64px 0px -60% 0px', threshold: 0 }
    );

    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};
