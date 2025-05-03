import { Box } from '@mui/material';

interface PrintPaperProps {
  children: React.ReactNode;
}
export default function PrintPaper({ children }: PrintPaperProps) {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {children}
    </Box>
  );
}
