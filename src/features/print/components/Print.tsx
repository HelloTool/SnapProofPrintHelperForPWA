import { GlobalStyles } from '@suid/material';
import type { DataType } from 'csstype';
import { createMemo, type JSX, onMount } from 'solid-js';
import { mergeProps, Portal } from 'solid-js/web';
import { PrintPaperConfigProvider } from '../contexts/PrintPaperConfigContext';
import { pageSizeNameToCm } from '../utils/paperSize';
import { getOrientationBasedSize } from '../utils/print';

export interface PrintProps {
  children: JSX.Element;
  paperSize?: DataType.PageSize | [number, number];
  paperOrientation?: 'landscape' | 'portrait';
  contentMarginLeft?: number;
  contentMarginTop?: number;
  contentMarginRight?: number;
  contentMarginBottom?: number;
}

const DEFAULT_PROPS = {
  paperSize: 'A4',
  paperOrientation: 'portrait',
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
    // 使高度渐少1mm，防止高度高出浏览器指定页面的高度
    const contentHeight = finalPaperSize().height - finalProps.contentMarginTop - finalProps.contentMarginBottom - 0.1;
    return contentWidth / contentHeight;
  });
  let printPortal: HTMLDivElement | undefined;
  onMount(() => {
    if (printPortal) {
      printPortal.className = 'print';
    }
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
          body: {
            '& > *:not(.print)': {
              '@media print': {
                display: 'none',
              },
            },
            '& > .print': {
              display: 'none',
              '@media print': {
                display: 'block',
              },
            },
          },
        }}
      />
      <Portal ref={printPortal}>
        <PrintPaperConfigProvider contentAspectRatio={contentAspectRatio()}>{props.children}</PrintPaperConfigProvider>
      </Portal>
    </>
  );
}
