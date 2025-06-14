import type { SetStoreFunction } from 'solid-js/store';
import type { ConfigStore } from '../stores/config';

export interface ConfigActions {
  layout: {
    setColumns: (columns: number) => void;
    setRows: (rows: number) => void;
  };
  print: {
    setMarginLeft: (value: number) => void;
    setMarginTop: (value: number) => void;
    setMarginRight: (value: number) => void;
    setMarginBottom: (value: number) => void;
    setOrientation: (value: 'landscape' | 'portrait') => void;
    setPaperSize: (size: ConfigStore['print']['size']) => void;
  };
  preview: {
    setColorMode: (mode: 'colorful' | 'gray') => void;
    toggleLightMode: () => void;
  };
}

export function createConfigActions(setState: SetStoreFunction<ConfigStore>): ConfigActions {
  return {
    layout: {
      setColumns: (columns: number) => {
        setState('layout', 'columns', columns);
      },

      setRows: (rows: number) => {
        setState('layout', 'rows', rows);
      },
    },

    print: {
      setMarginLeft: (value: number) => {
        setState('print', 'contentMarginLeft', value);
      },

      setMarginTop: (value: number) => {
        setState('print', 'contentMarginTop', value);
      },

      setMarginRight: (value: number) => {
        setState('print', 'contentMarginRight', value);
      },

      setMarginBottom: (value: number) => {
        setState('print', 'contentMarginBottom', value);
      },
      setOrientation: (value: 'landscape' | 'portrait') => {
        setState('print', 'orientation', value);
      },

      setPaperSize: (size: ConfigStore['print']['size']) => {
        setState('print', 'size', size);
      },
    },

    preview: {
      setColorMode: (mode: 'colorful' | 'gray') => {
        setState('preview', 'colorMode', mode);
      },
      toggleLightMode: () => {
        setState('preview', 'lightMode', (prev) => !prev);
      },
    },
  };
}
