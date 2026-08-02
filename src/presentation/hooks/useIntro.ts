import { useMemo } from 'react';
import { getPortfolioData } from '@domain/services/portfolio';
import { mapPortfolioData } from '@presentation/utils/dataMapper';
import { useLanguage } from './useLanguage';
import type { UIIntroState } from '@presentation/models';

export const useIntro = (): UIIntroState => {
  const { language } = useLanguage();
  // Map domain data to UI data
  const uiData = useMemo(
    () => mapPortfolioData(getPortfolioData(language)),
    [language]
  );
  const { introduction } = uiData;

  return {
    introduction,
  };
};
