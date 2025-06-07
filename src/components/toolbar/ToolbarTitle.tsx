import Typography from '@mui/material/Typography';

interface ToolbarTitleProps {
  children?: React.ReactNode;
}

export default function ToolbarTitle({ children }: ToolbarTitleProps) {
  return (
    <Typography component="h1" sx={{ flexGrow: 1 }} variant="h6">
      {children}
    </Typography>
  );
}
