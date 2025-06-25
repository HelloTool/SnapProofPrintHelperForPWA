import { makeEventListener } from '@solid-primitives/event-listener';
import { createSignal } from 'solid-js';
import { type Locale, locales } from '@/locales';

function getAvailableLocales() {
  const availableLocales: Locale[] = [];
  for (const browserLanguage of navigator.languages) {
    if (browserLanguage in locales) {
      availableLocales.push(browserLanguage as Locale);
    } else {
      const similarLocale = locales.find((locale) => browserLanguage.startsWith(locale));
      if (similarLocale) {
        availableLocales.push(similarLocale);
      }
    }
  }
  return availableLocales;
}

export function createCurrentLocale() {
  const [currentLocale, setCurrentLocale] = createSignal(getAvailableLocales()[0]);
  makeEventListener(window, 'languagechange', () => {
    setCurrentLocale(getAvailableLocales()[0]);
  });
  return currentLocale;
}
