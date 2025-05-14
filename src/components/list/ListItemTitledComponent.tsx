import { ListItemText } from '@mui/material';

import type { SxProps, Theme } from '@mui/material/styles';

interface SecondarySlotProps {
  children: React.ReactNode;
}
function SecondarySlot({ children }: SecondarySlotProps) {
  return children;
}

interface ListItemTitledComponentProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function ListItemTitledComponent({ title, children, sx }: ListItemTitledComponentProps) {
  return (
    <ListItemText
      primary={title}
      secondary={children}
      sx={sx}
      slots={{
        secondary: SecondarySlot,
      }}
    />
  );
}
