import type { DataType } from 'csstype';

export interface SnapProofPaperLayout {
  columns: number;
  rows: number;
}

export interface SnapProofPrintConfig {
  contentMarginLeftCm: number;
  contentMarginTopCm: number;
  contentMarginRightCm: number;
  contentMarginBottomCm: number;
  orientation: 'landscape' | 'portrait';
  size: DataType.PageSize | [number, number];
  aspectRatioFixed: boolean;
}

export interface SnapProofPrintPreviewConfig {
  colorMode: 'colorful' | 'gray';
}

export interface BaseSnapImage {
  key: string;
  name: string;
  status: 'loading' | 'loaded' | 'error';
}

export interface LoadedSnapImage extends BaseSnapImage {
  url: string;
  status: 'loaded';
}
export interface ErrorSnapImage extends BaseSnapImage {
  status: 'error';
  reason: string;
}

export interface LoadingSnapImage extends BaseSnapImage {
  status: 'loading';
}

export type SnapImage = LoadedSnapImage | ErrorSnapImage | LoadingSnapImage;

