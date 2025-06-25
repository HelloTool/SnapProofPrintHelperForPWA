import type { Flatten } from '@solid-primitives/i18n';
import type zhCN from './zh-CN';

export const locales = ['en', 'zh-CN'] as const;

export type Locale = 'en' | 'zh-CN';
export type RawGlobalDictionary = typeof zhCN;
export type GlobalDictionary = Flatten<typeof zhCN>;
