import { Typography } from '@mui/material';

interface ToolbarTitleProps {
  children?: React.ReactNode;
}

export default function ToolbarTitle({ children }: ToolbarTitleProps) {
  return (
    <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
      {children}
    </Typography>
  );
}
