import { GlobalStyles } from '@mui/material';
import { createPortal } from 'react-dom';
import type { DataType } from 'csstype';
import { getSizeBasedOnOrientation } from '../utils/print';
import PrintPaperConfigContext from '../contexts/PrintPaperConfigContext';

export interface PrintProps {
  children: React.ReactNode;
  paperSizeName?: DataType.PageSize | 'auto';
  paperSizeCm: [number, number];
  paperOrientation?: 'landscape' | 'portrait';
  contentAspectRatioFixed: boolean;
  contentMarginLeftCm?: number;
  contentMarginTopCm?: number;
  contentMarginRightCm?: number;
  contentMarginBottomCm?: number;
}

export default function Print({
  children,
  paperSizeName,
  paperOrientation = 'portrait',
  paperSizeCm,
  contentAspectRatioFixed = false,
  contentMarginLeftCm = 2.25,
  contentMarginTopCm = 2.25,
  contentMarginRightCm = 2.25,
  contentMarginBottomCm = 2.25,
}: PrintProps) {
  const { width, height } = getSizeBasedOnOrientation(paperSizeCm, paperOrientation);
  const contentWidth = width - contentMarginLeftCm - contentMarginRightCm;
  const contentHeight = height - contentMarginTopCm - contentMarginBottomCm;
  const contentAspectRatio = contentWidth / contentHeight;
  return (
    <>
      <GlobalStyles
        styles={{
          '.print > *': {
            width: contentAspectRatioFixed ? '100%' : '100vw',
            height: contentAspectRatioFixed ? '100%' : '100vh',
            aspectRatio: contentAspectRatioFixed ? contentWidth / contentHeight : undefined,
          },

          '@page': {
            size: paperSizeName ? `${paperSizeName} ${paperOrientation}` : `${width}cm ${height}cm`,
            margin: `${contentMarginTopCm}cm ${contentMarginRightCm}cm ${contentMarginBottomCm}cm ${contentMarginLeftCm}cm`,
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
      {createPortal(
        <div className="print">
          <PrintPaperConfigContext.Provider value={{ contentAspectRatio, contentAspectRatioFixed }}>
            {children}
          </PrintPaperConfigContext.Provider>
        </div>,
        document.body,
      )}
    </>
  );
}
