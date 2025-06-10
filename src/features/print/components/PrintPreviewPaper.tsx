import { Box, Paper, type Theme } from '@suid/material';
import type { SxProps } from '@suid/system';
import type { JSX } from 'solid-js';
import { mergeMulitSxProps } from '@/utils/suid';
import { usePrintPreviewPaperConfig } from '../contexts/PrintPreviewPaperConfigContext';

interface PrintPaperPreveiewProps {
  children: JSX.Element;
  sx?: SxProps<Theme>;
}
export default function PrintPreviewPaper(props: PrintPaperPreveiewProps) {
  const paperConfig = usePrintPreviewPaperConfig();

  return (
    <Paper
      class="print-preview-paper"
      elevation={1}
      square
      sx={mergeMulitSxProps(
        {
          overflow: 'hidden',
          aspectRatio: `${paperConfig.paperAspectRatio}`,
          backgroundColor: 'white',
          pointerEvents: 'none',
          filter: paperConfig.colorMode === 'gray' ? 'grayscale(100%)' : undefined,
        },
        props.sx,
      )}
    >
      <Box
        sx={{
          paddingLeft: `${paperConfig.paperPaddingLeftPercent}%`,
          paddingTop: `${paperConfig.paperPaddingTopPercent}%`,
          paddingRight: `${paperConfig.paperPaddingRightPercent}%`,
          paddingBottom: `${paperConfig.paperPaddingBottomPercent}%`,
          width: '100%',
          height: '100%',
        }}
      >
        {props.children}
      </Box>
    </Paper>
  );
}
