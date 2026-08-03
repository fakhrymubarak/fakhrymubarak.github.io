import { useEffect, useRef, useState } from 'react';

export const useActiveSection = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const visibleIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return undefined;

    // Reset visible ids on mount
    visibleIdsRef.current.clear();

    const observer = new IntersectionObserver(
      entries => {
        // Update accumulated set of currently-intersecting ids
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visibleIdsRef.current.add(entry.target.id);
          } else {
            visibleIdsRef.current.delete(entry.target.id);
          }
        });

        // Derive active section from accumulated visible ids
        const lastVisibleId = sectionIds
          .filter(id => visibleIdsRef.current.has(id))
          .pop();

        if (lastVisibleId) {
          setActiveSection(lastVisibleId);
        }
        // If no sections are visible, maintain current activeSection (no update)
      },
      { rootMargin: '-64px 0px -60% 0px', threshold: 0 }
    );

    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};
