import Box from '@mui/material/Box';

interface PrinterPaperProps {
  children: React.ReactNode;
}
export default function PrinterPaper({ children }: PrinterPaperProps) {
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
