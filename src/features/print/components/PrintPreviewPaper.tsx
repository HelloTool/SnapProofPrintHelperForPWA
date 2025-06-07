import { Box, Paper, type Theme } from '@suid/material';
import type { SxProps } from '@suid/system';
import type { JSX } from 'solid-js';
import { usePrintPreviewPaperConfig } from '../contexts/PrintPreviewPaperConfigContext';
import { mergeMulitSxProps } from '@/utils/suid';

interface PrintPaperPreveiewProps {
  children: JSX.Element;
  sx?: SxProps<Theme>;
}
export default function PrintPreviewPaper(props: PrintPaperPreveiewProps) {
  const paperConfig = usePrintPreviewPaperConfig();

  const {
    paperAspectRatio,
    paperPaddingLeftPercent,
    paperPaddingTopPercent,
    paperPaddingRightPercent,
    paperPaddingBottomPercent,
    colorMode,
  } = paperConfig;
  return (
    <Paper
      class="print-preview-paper"
      elevation={1}
      square
      sx={mergeMulitSxProps(
        {
          overflow: 'hidden',
          aspectRatio: paperAspectRatio,
          backgroundColor: 'white',
          pointerEvents: 'none',
          filter: colorMode === 'gray' ? 'grayscale(100%)' : undefined,
        },
        props.sx,
      )}
    >
      <Box
        sx={{
          paddingLeft: `${paperPaddingLeftPercent}%`,
          paddingTop: `${paperPaddingTopPercent}%`,
          paddingRight: `${paperPaddingRightPercent}%`,
          paddingBottom: `${paperPaddingBottomPercent}%`,
          width: '100%',
          height: '100%',
        }}
      >
        {props.children}
      </Box>
    </Paper>
  );
}
