import { useTranslation } from 'react-i18next';
import { TranslationFunction } from 'i18next';
import { capitalizeFirstLetter } from 'public/util';

export function useT(): TranslationFunction {
  const i18n = useTranslation();
  return i18n.t.bind(i18n);
}

/**
 * Returns strings like from useT, but with capitalized first letter.
 */
export function useCT(): TranslationFunction {
  const t = useT();
  return (...args: Parameters<TranslationFunction>) =>
    capitalizeFirstLetter(t(...args));
}
