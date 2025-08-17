import { useMemo } from 'react';
import { portfolioData } from '@domain/services/portfolio';
import { mapPortfolioData } from '@presentation/utils/dataMapper';
import type { UIIntroState } from '@presentation/models';

export const useIntro = (): UIIntroState => {
  // Map domain data to UI data
  const uiData = useMemo(() => mapPortfolioData(portfolioData), []);
  const { introduction } = uiData;

  return {
    introduction,
  };
};
