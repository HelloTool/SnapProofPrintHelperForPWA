import type { SetStoreFunction } from 'solid-js/store';
import type { ConfigStore } from '../stores/config';

export interface ConfigActions {
  layout: {
    setColumns: (columns: number) => void;
    setRows: (rows: number) => void;
  };
  print: {
    setMarginPreset: (value: 'default' | 'custom') => void;
    setMarginLeft: (value: number) => void;
    setMarginTop: (value: number) => void;
    setMarginRight: (value: number) => void;
    setMarginBottom: (value: number) => void;
    resetMargins: () => void;
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
      setMarginPreset: (preset) => {
        setState('print', 'contentMarginPreset', preset);
      },
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

      resetMargins: () => {
        setState('print', 'contentMarginLeft', 0.5);
        setState('print', 'contentMarginTop', 1);
        setState('print', 'contentMarginRight', 0.5);
        setState('print', 'contentMarginBottom', 1);
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
