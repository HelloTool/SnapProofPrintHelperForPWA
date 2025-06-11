import { createStore } from 'solid-js/store';
import { maybeChrome } from '@/utils/platform';
import type { PaperLayout, PreviewConfig, PrintConfig } from '../types/config';

export interface ConfigStore {
  layout: PaperLayout;
  print: PrintConfig;
  preview: PreviewConfig;
}
export function createConfigStore() {
  return createStore<ConfigStore>({
    layout: {
      columns: 3,
      rows: 1,
    },
    print: {
      contentMarginLeft: 0.5,
      contentMarginTop: 1,
      contentMarginRight: 0.5,
      contentMarginBottom: 1,
      orientation: 'landscape',
      size: 'A4',
      aspectRatioFixed: !maybeChrome,
    },
    preview: {
      colorMode: 'gray',
      lightMode: false,
    },
  });
}
