import { useEffect } from 'react';

export const useLockBodyScroll = (isLocked: boolean): void => {
  useEffect(() => {
    if (!isLocked) return undefined;

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, scrollY);
      document.documentElement.style.scrollBehavior = '';
    };
  }, [isLocked]);
};
