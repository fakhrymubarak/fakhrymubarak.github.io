import { useMemo } from 'react';
import { portfolioData } from '@domain/services/portfolio';
import { mapPortfolioData } from '@presentation/utils/dataMapper';
import type { UIFooterState } from '@presentation/models';

export const useFooter = (): UIFooterState => {
  // Map domain data to UI data
  const uiData = useMemo(() => mapPortfolioData(portfolioData), []);
  const { footer } = uiData;

  return {
    footer,
  };
};
