import type { DataType } from 'csstype';
import { atomWithImmer } from 'jotai-immer';
import { maybeChrome } from '@/utils/platform';
export interface ImagesGridConfig {
  columns: number;
  rows: number;
}

export interface PrintConfig {
  contentMarginLeftCm: number;
  contentMarginTopCm: number;
  contentMarginRightCm: number;
  contentMarginBottomCm: number;
  orientation: 'landscape' | 'portrait';
  size: DataType.PageSize | [number, number];
  aspectRatioFixed: boolean;
}

export interface PrintPreviewConfig {
  colorMode: 'colorful' | 'gray';
}

export const imagesGridConfigAtom = atomWithImmer<ImagesGridConfig>({
  columns: 3,
  rows: 1,
});

export const printConfigAtom = atomWithImmer<PrintConfig>({
  contentMarginLeftCm: 0.5,
  contentMarginTopCm: 1,
  contentMarginRightCm: 0.5,
  contentMarginBottomCm: 1,
  orientation: 'landscape',
  size: 'A4',
  aspectRatioFixed: !maybeChrome,
});

export const printPreviewConfigAtom = atomWithImmer<PrintPreviewConfig>({
  colorMode: 'colorful',
});
