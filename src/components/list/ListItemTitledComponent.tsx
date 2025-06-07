import { ListItemText } from '@suid/material';

import type {  Theme } from '@suid/material/styles';
import { SxProps } from '@suid/system';
import type { JSX } from 'solid-js';

interface SecondarySlotProps {
  children: JSX.Element;
}
function SecondarySlot(props: SecondarySlotProps) {
  return props.children;
}

interface ListItemTitledComponentProps {
  title?: JSX.Element;
  children: JSX.Element;
  sx?: SxProps<Theme>;
}

export default function ListItemTitledComponent({ title, children, sx }: ListItemTitledComponentProps) {
  return (
    <ListItemText
      primary={title}
      secondary={children}
      sx={sx}
    />
  );
}
