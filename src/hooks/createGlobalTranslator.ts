import { flatten, translator } from '@solid-primitives/i18n';
import type { Accessor } from 'solid-js';
import type { RawGlobalDictionary } from '@/locales';
import en from '@/locales/en';
import zhCN from '@/locales/zh-CN';

export default function createGlobalTranslator<T extends string>(currentLocale: Accessor<T>) {
  const dictionary = () => {
    let rawDictionary: RawGlobalDictionary;
    switch (currentLocale()) {
      case 'zh-CN':
        rawDictionary = zhCN;
        break;
      case 'en':
        rawDictionary = en;
        break;
      default:
        rawDictionary = zhCN;
    }
    return flatten(rawDictionary);
  };
  const t = translator(dictionary);
  return t;
}
