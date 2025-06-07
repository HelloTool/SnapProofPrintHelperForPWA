import type { DataType } from 'csstype';

export interface PaperLayout {
  columns: number;
  rows: number;
}

export interface PrintConfig {
  contentMarginLeft: number;
  contentMarginTop: number;
  contentMarginRight: number;
  contentMarginBottom: number;
  orientation: 'landscape' | 'portrait';
  size: DataType.PageSize | [number, number];
  aspectRatioFixed: boolean;
}

export interface PreviewConfig {
  colorMode: 'colorful' | 'gray';
}
