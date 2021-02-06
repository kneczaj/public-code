import { useTranslation } from 'react-i18next';

export function useT() {
  const i18n = useTranslation();
  return i18n.t.bind(i18n);
}
