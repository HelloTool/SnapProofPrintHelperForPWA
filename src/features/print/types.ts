export interface PrintPaperConfig {
  contentAspectRatioFixed: boolean;
  contentAspectRatio: number;
}

export interface PrintPreviewPaperConfig {
  paperAspectRatio: number;
  paperPaddingLeftPercent?: number;
  paperPaddingTopPercent?: number;
  paperPaddingRightPercent?: number;
  paperPaddingBottomPercent?: number;
  colorMode?: 'colorful' | 'gray';
}
