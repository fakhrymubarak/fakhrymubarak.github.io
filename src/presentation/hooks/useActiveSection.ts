import { useEffect, useRef, useState } from 'react';

export const useActiveSection = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const visibleIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

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

    const foundIds = new Set<string>();
    elements.forEach(element => {
      observer.observe(element);
      foundIds.add(element.id);
    });

    // Sections may not exist in the DOM yet (e.g. the whole page is behind a
    // lazy-loaded route, or individual sections are lazily-loaded). Watch for
    // them mounting and observe them once they appear.
    let mutationObserver: MutationObserver | undefined;

    if (foundIds.size < sectionIds.length) {
      mutationObserver = new MutationObserver(() => {
        sectionIds
          .filter(id => !foundIds.has(id))
          .forEach(id => {
            const element = document.getElementById(id);
            if (element) {
              observer.observe(element);
              foundIds.add(id);
            }
          });

        if (foundIds.size === sectionIds.length) {
          mutationObserver?.disconnect();
        }
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
      mutationObserver?.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
};
