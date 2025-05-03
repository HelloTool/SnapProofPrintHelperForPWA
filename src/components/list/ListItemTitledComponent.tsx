import { Box, ListItemText, type SxProps, type Theme } from '@mui/material';

interface SecondarySlotProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}
function SecondarySlot({ children, sx }: SecondarySlotProps) {
  return (
    <Box
      sx={[
        {
          '& > *': {
            display: 'block',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
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
