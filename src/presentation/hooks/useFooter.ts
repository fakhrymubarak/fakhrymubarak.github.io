import { useMemo } from 'react';
import { getPortfolioData } from '@domain/services/portfolio';
import { mapPortfolioData } from '@presentation/utils/dataMapper';
import { useLanguage } from './useLanguage';
import type { UIFooterState } from '@presentation/models';

export const useFooter = (): UIFooterState => {
  const { language } = useLanguage();
  // Map domain data to UI data
  const uiData = useMemo(
    () => mapPortfolioData(getPortfolioData(language)),
    [language]
  );
  const { footer } = uiData;

  return {
    footer,
  };
};
