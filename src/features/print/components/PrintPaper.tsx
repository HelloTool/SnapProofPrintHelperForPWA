import { Box } from '@suid/material';
import type { JSX } from 'solid-js';
import { usePrintPaperConfig } from '../contexts/PrintPaperConfigContext';

interface PrintPaperProps {
  children: JSX.Element;
}
export default function PrintPaper(props: PrintPaperProps) {
  const paperConfig = usePrintPaperConfig();

  return (
    <Box
      class="PrintPaper"
      sx={{
        width: paperConfig.contentAspectRatioFixed ? '100%' : '100vw',
        height: paperConfig.contentAspectRatioFixed ? undefined : '100vh',
        aspectRatio: paperConfig.contentAspectRatioFixed ? paperConfig.contentAspectRatio : undefined,
      }}
    >
      {props.children}
    </Box>
  );
}
