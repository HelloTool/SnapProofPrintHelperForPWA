import Typography from '@suid/material/Typography';
import type { JSX } from 'solid-js';

interface ToolbarTitleProps {
  children?: JSX.Element;
}

export default function ToolbarTitle(props: ToolbarTitleProps) {
  return (
    <Typography component="h1" sx={{ flexGrow: 1 }} variant="h6">
      {props.children}
    </Typography>
  );
}
