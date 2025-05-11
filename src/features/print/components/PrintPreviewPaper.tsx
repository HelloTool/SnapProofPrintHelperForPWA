import { Box, Paper, type SxProps, type Theme } from '@mui/material';
import usePrintPreviewPaperConfigContext from '../hooks/usePrintPreviewPaperConfigContext';

interface PrintPaperPreveiewProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}
export default function PrintPreviewPaper({ children, sx }: PrintPaperPreveiewProps) {
  const paperConfig = usePrintPreviewPaperConfigContext();
  if (!paperConfig) {
    throw new Error('PrintPreviewPaper must be used within a PrintPreviewPaperConfigProvider');
  }
  const {
    paperAspectRatio,
    paperPaddingLeftPercent = 0,
    paperPaddingTopPercent = 0,
    paperPaddingRightPercent = 0,
    paperPaddingBottomPercent = 0,
    colorMode = 'gray',
  } = paperConfig;
  return (
    <Paper
      sx={[
        {
          overflow: 'hidden',
          aspectRatio: paperAspectRatio,
          backgroundColor: 'white',
          pointerEvents: 'none',
          filter: colorMode === 'gray' ? 'grayscale(100%)' : undefined,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      elevation={1}
      square
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
        {children}
      </Box>
    </Paper>
  );
}
