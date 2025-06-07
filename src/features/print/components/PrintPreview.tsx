import { Box, type Theme } from '@suid/material';
import type { SxProps } from '@suid/system';
import { createMemo, mergeProps } from 'solid-js';
import type { JSX } from 'solid-js';
import { getOrientationBasedSize } from '../utils/print';
import { PrintPreviewPaperConfigProvider } from '../contexts/PrintPreviewPaperConfigContext';
import type { DataType } from 'csstype';
import { pageSizeNameToCm } from '../utils/paperSize';

interface PrintPreviewProps {
  children: JSX.Element;
  sx?: SxProps<Theme>;
  paperSize?: DataType.PageSize | [number, number];
  paperOrientation?: 'landscape' | 'portrait';
  contentAspectRatioFixed?: boolean;
  contentMarginLeft?: number;
  contentMarginTop?: number;
  contentMarginRight?: number;
  contentMarginBottom?: number;
  colorMode?: 'colorful' | 'gray';
}
const DEFAULT_PROPS = {
  paperSize: 'A4',
  paperOrientation: 'portrait',
  contentMarginLeft: 2.25,
  contentMarginTop: 2.25,
  contentMarginRight: 2.25,
  contentMarginBottom: 2.25,
  colorMode: 'colorful',
} as const satisfies Partial<PrintPreviewProps>;
export default function PrintPreview(props: PrintPreviewProps) {
  const finalProps = mergeProps(DEFAULT_PROPS, props);
  const finalPaperSize = createMemo(() => {
    const paperSize = Array.isArray(finalProps.paperSize)
      ? finalProps.paperSize
      : pageSizeNameToCm(finalProps.paperSize);
    return getOrientationBasedSize(paperSize, finalProps.paperOrientation);
  });
  return (
    <Box class="PrintPreview" sx={finalProps.sx}>
      <PrintPreviewPaperConfigProvider
        paperAspectRatio={finalPaperSize().width / finalPaperSize().height}
        paperPaddingLeftPercent={(finalProps.contentMarginLeft / finalPaperSize().width) * 100}
        paperPaddingTopPercent={(finalProps.contentMarginTop / finalPaperSize().width) * 100}
        paperPaddingRightPercent={(finalProps.contentMarginRight / finalPaperSize().width) * 100}
        paperPaddingBottomPercent={(finalProps.contentMarginBottom / finalPaperSize().width) * 100}
        colorMode={finalProps.colorMode}
      >
        {finalProps.children}
      </PrintPreviewPaperConfigProvider>
    </Box>
  );
}
