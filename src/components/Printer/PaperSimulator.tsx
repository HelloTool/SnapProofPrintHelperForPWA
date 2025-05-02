import Paper from '@mui/material/Paper';
import type { SxProps, Theme } from '@mui/material/styles';

interface PrintPaperSimulatorProps {
  marginLeft?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  width?: number;
  height?: number;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}
export default function PrintPaperSimulator({
  marginLeft = 2.54,
  marginTop = 2.54,
  marginRight = 2.54,
  marginBottom = 2.54,
  width = 29.7,
  height = 21,
  children,
  sx,
}: PrintPaperSimulatorProps) {
  return (
    <Paper
      sx={[
        {
          boxShadow: 1,
          overflow: 'hidden',
          paddingLeft: `${(marginLeft / width) * 100}%`,
          paddingTop: `${(marginTop / height) * 100}%`,
          paddingRight: `${(marginRight / width) * 100}%`,
          paddingBottom: `${(marginBottom / height) * 100}%`,
          aspectRatio: width / height,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Paper>
  );
}
