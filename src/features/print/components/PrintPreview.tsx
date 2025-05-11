import { Box, type SxProps, type Theme } from '@mui/material';
import { getSizeBasedOnOrientation } from '../utils/print';
import PrintPreviewPaperConfigContext from '../contexts/PrintPreviewPaperConfigContext';

interface PrintPreviewProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  paperSizeCm: [number, number];
  paperOrientation?: 'landscape' | 'portrait';
  contentMarginLeftCm?: number;
  contentMarginTopCm?: number;
  contentMarginRightCm?: number;
  contentMarginBottomCm?: number;
  colorMode?: 'colorful' | 'gray';
}
export default function PrintPreview({
  children,
  sx,
  paperOrientation = 'portrait',
  paperSizeCm,
  contentMarginLeftCm = 2.25,
  contentMarginTopCm = 2.25,
  contentMarginRightCm = 2.25,
  contentMarginBottomCm = 2.25,
  colorMode,
}: PrintPreviewProps) {
  const { width, height } = getSizeBasedOnOrientation(paperSizeCm, paperOrientation);
  return (
    <Box className="print-simulator" sx={sx}>
      <PrintPreviewPaperConfigContext.Provider
        value={{
          paperAspectRatio: width / height,
          paperPaddingLeftPercent: (contentMarginLeftCm / width) * 100,
          paperPaddingTopPercent: (contentMarginTopCm / width) * 100,
          paperPaddingRightPercent: (contentMarginRightCm / width) * 100,
          paperPaddingBottomPercent: (contentMarginBottomCm / width) * 100,
          colorMode: colorMode,
        }}
      >
        {children}
      </PrintPreviewPaperConfigContext.Provider>
    </Box>
  );
}
