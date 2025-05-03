import { Box, Paper } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

interface PrintPaperSimulatorProps {
  page: {
    marginLeft?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    size?: [number, number];
    height?: number;
    orientation?: 'landscape' | 'portrait';
    gray?: boolean;
  };
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}
export default function PrintPaperSimulator({
  page: {
    marginLeft = 2.54,
    marginTop = 2.54,
    marginRight = 2.54,
    marginBottom = 2.54,
    size = [21, 29.7],
    orientation = 'landscape',
    gray = true,
  },
  children,
  sx,
}: PrintPaperSimulatorProps) {
  const sortLength = Math.min(size[0], size[1]);
  const longLength = Math.max(size[0], size[1]);
  const width = orientation === 'landscape' ? longLength : sortLength;
  const height = orientation === 'landscape' ? sortLength : longLength;
  return (
    <Paper
      sx={[
        {
          overflow: 'hidden',
          aspectRatio: width / height,
          backgroundColor: 'white',
          pointerEvents: 'none',
          filter: gray ? 'grayscale(100%)' : undefined,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      elevation={1}
      square
    >
      <Box
        sx={{
          paddingLeft: `${(marginLeft / width) * 100}%`,
          paddingTop: `${(marginTop / width) * 100}%`,
          paddingRight: `${(marginRight / width) * 100}%`,
          paddingBottom: `${(marginBottom / width) * 100}%`,
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}
