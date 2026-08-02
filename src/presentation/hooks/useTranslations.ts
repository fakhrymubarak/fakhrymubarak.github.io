import { useLanguage } from './useLanguage';
import { getUIStrings } from '@domain/services/i18n/translations';
import type { UIStrings } from '@domain/services/i18n/translations';

export const useTranslations = (): UIStrings => {
  const { language } = useLanguage();
  return getUIStrings(language);
};
