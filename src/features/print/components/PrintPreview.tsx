import { Box } from '@suid/material';
import type BoxProps from '@suid/material/Box/BoxProps';
import type { DataType } from 'csstype';
import type { JSX } from 'solid-js';
import { createMemo, mergeProps, splitProps } from 'solid-js';
import { PrintPreviewPaperConfigProvider } from '../contexts/PrintPreviewPaperConfigContext';
import { pageSizeNameToCm } from '../utils/paperSize';
import { getOrientationBasedSize } from '../utils/print';

interface PrintPreviewProps extends BoxProps {
  children: JSX.Element;
  paperSize?: DataType.PageSize | [number, number];
  paperOrientation?: 'landscape' | 'portrait';
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
  const [localProps, otherProps] = splitProps(mergeProps(DEFAULT_PROPS, props), [
    'children',
    'paperSize',
    'paperOrientation',
    'contentMarginLeft',
    'contentMarginTop',
    'contentMarginRight',
    'contentMarginBottom',
    'colorMode',
  ]);
  const finalPaperSize = createMemo(() => {
    const paperSize = Array.isArray(localProps.paperSize)
      ? localProps.paperSize
      : pageSizeNameToCm(localProps.paperSize);
    return getOrientationBasedSize(paperSize, localProps.paperOrientation);
  });
  return (
    <Box class="PrintPreview" {...otherProps}>
      <PrintPreviewPaperConfigProvider
        paperAspectRatio={finalPaperSize().width / finalPaperSize().height}
        paperPaddingLeftPercent={(localProps.contentMarginLeft / finalPaperSize().width) * 100}
        paperPaddingTopPercent={(localProps.contentMarginTop / finalPaperSize().width) * 100}
        paperPaddingRightPercent={(localProps.contentMarginRight / finalPaperSize().width) * 100}
        paperPaddingBottomPercent={(localProps.contentMarginBottom / finalPaperSize().width) * 100}
        colorMode={localProps.colorMode}
      >
        {localProps.children}
      </PrintPreviewPaperConfigProvider>
    </Box>
  );
}
