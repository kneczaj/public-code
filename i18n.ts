import i18nBase, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

export function getI18n(resources: Resource): i18nBase.i18n {
  const whitelist = Object.keys(resources);
  const fallbackLng = 'en';
  const i18n = i18nBase
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(I18nextBrowserLanguageDetector)
    .init({
      resources,
      fallbackLng,
      returnObjects: true,
      keySeparator: false,
      interpolation: {
        escapeValue: false
      },
      whitelist
    });

  if (!whitelist.includes(i18n.language)) {
    i18n.changeLanguage(fallbackLng);
  }
  return i18n;
}
