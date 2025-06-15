import { ListItemText } from '@suid/material';

import type { Theme } from '@suid/material/styles';
import type { SxProps } from '@suid/system';
import type { JSX } from 'solid-js';

interface ListItemTitledComponentProps {
  title?: JSX.Element;
  children: JSX.Element;
  sx?: SxProps<Theme>;
}

export default function ListItemTitledComponent(props: ListItemTitledComponentProps) {
  return (
    <ListItemText
      primary={props.title}
      secondary={props.children}
      sx={props.sx}
      secondaryTypographyProps={{ component: 'div' }}
    />
  );
}
