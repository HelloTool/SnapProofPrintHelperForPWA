import { GlobalStyles } from '@suid/material';
import type { DataType } from 'csstype';
import { createMemo, type JSX } from 'solid-js';
import { mergeProps, Portal } from 'solid-js/web';
import { getOrientationBasedSize } from '../utils/print';
import { PrintPaperConfigProvider } from '../contexts/PrintPaperConfigContext';
import { pageSizeNameToCm } from '../utils/paperSize';

export interface PrintProps {
  children: JSX.Element;
  paperSize?: DataType.PageSize | [number, number];
  paperOrientation?: 'landscape' | 'portrait';
  contentAspectRatioFixed?: boolean;
  contentMarginLeft?: number;
  contentMarginTop?: number;
  contentMarginRight?: number;
  contentMarginBottom?: number;
}

const DEFAULT_PROPS = {
  paperSize: 'A4',
  paperOrientation: 'portrait',
  contentAspectRatioFixed: false,
  contentMarginLeft: 2.25,
  contentMarginTop: 2.25,
  contentMarginRight: 2.25,
  contentMarginBottom: 2.25,
} as const satisfies Partial<PrintProps>;

export default function Print(props: PrintProps) {
  const finalProps = mergeProps(DEFAULT_PROPS, props);
  const finalPaperSize = createMemo(() => {
    const paperSize = Array.isArray(finalProps.paperSize)
      ? finalProps.paperSize
      : pageSizeNameToCm(finalProps.paperSize);
    return getOrientationBasedSize(paperSize, finalProps.paperOrientation);
  });

  const contentAspectRatio = createMemo(() => {
    const contentWidth = finalPaperSize().width - finalProps.contentMarginLeft - finalProps.contentMarginRight;
    const contentHeight = finalPaperSize().height - finalProps.contentMarginTop - finalProps.contentMarginBottom;
    return contentWidth / contentHeight;
  });
  return (
    <>
      <GlobalStyles
        styles={{
          '@page': {
            size: (typeof finalProps.paperSize === 'string'
              ? `${finalProps.paperSize} ${finalProps.paperOrientation}`
              : // biome-ignore lint/suspicious/noExplicitAny: false
                `${finalPaperSize().width}cm ${finalPaperSize().height}cm`) as any,
            margin: `${finalProps.contentMarginTop}cm ${finalProps.contentMarginRight}cm ${finalProps.contentMarginBottom}cm ${finalProps.contentMarginLeft}cm`,
          },
          'body > .print': {
            display: 'none',
          },
          '@media print': {
            'body > *:not(.print)': {
              display: 'none',
            },
            'body > .print': {
              display: 'block',
            },
          },
        }}
      />
      <Portal>
        <div class="print">
          <PrintPaperConfigProvider
            contentAspectRatio={contentAspectRatio()}
            contentAspectRatioFixed={finalProps.contentAspectRatioFixed}
          >
            {props.children}
          </PrintPaperConfigProvider>
        </div>
      </Portal>
    </>
  );
}
