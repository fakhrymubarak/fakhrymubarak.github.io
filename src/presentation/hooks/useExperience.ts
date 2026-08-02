import { useMemo } from 'react';
import { getPortfolioData } from '@domain/services/portfolio';
import { mapPortfolioData } from '@presentation/utils/dataMapper';
import { useLanguage } from './useLanguage';
import type { UIExperienceState } from '@presentation/models';

export const useExperience = (): UIExperienceState => {
  const { language } = useLanguage();
  // Map domain data to UI data
  const uiData = useMemo(
    () => mapPortfolioData(getPortfolioData(language)),
    [language]
  );
  const { companies } = uiData;

  return {
    companies,
  };
};
