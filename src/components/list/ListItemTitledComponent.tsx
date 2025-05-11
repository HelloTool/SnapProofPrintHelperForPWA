import { Box, ListItemText } from '@mui/material';

import type { SxProps, Theme } from '@mui/material/styles';

interface SecondarySlotProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}
function SecondarySlot({ children, sx }: SecondarySlotProps) {
  return <Box sx={sx}>{children}</Box>;
}
interface ListItemTitledComponentProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  slotSx?: SxProps<Theme>;
}

export default function ListItemTitledComponent({ title, children, sx, slotSx }: ListItemTitledComponentProps) {
  return (
    <ListItemText
      primary={title}
      secondary={children}
      sx={sx}
      slots={{
        secondary: SecondarySlot,
      }}
      slotProps={{
        secondary: {
          sx: slotSx,
        },
      }}
    />
  );
}
