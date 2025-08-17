import { useMemo } from 'react';
import { portfolioData } from '@domain/services/portfolio';
import { mapPortfolioData } from '@presentation/utils/dataMapper';
import type { UIExperienceState } from '@presentation/models';

export const useExperience = (): UIExperienceState => {
  // Map domain data to UI data
  const uiData = useMemo(() => mapPortfolioData(portfolioData), []);
  const { companies } = uiData;

  return {
    companies,
  };
};
