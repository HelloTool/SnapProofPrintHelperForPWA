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
        width: '100%',
        aspectRatio: `${paperConfig.contentAspectRatio}`,
        breakBefore: 'page',
      }}
    >
      {props.children}
    </Box>
  );
}
