import * as i18n from '@solid-primitives/i18n';
import { type Accessor, createResource } from 'solid-js';
import type { GlobalDictionary, RawGlobalDictionary } from '@/locales';
import zhCN from '@/locales/zh-CN';

async function fetchDictionary<T>(locale: T): Promise<GlobalDictionary> {
  const dict: RawGlobalDictionary = (await import(`@/locales/${locale}`)).default;
  return i18n.flatten(dict);
}

export default function createGlobalTranslator<T extends string>(currentLocale: Accessor<T>) {
  const [dict] = createResource(currentLocale, fetchDictionary, { initialValue: i18n.flatten(zhCN) });
  const t = i18n.translator(dict);
  return t;
}
