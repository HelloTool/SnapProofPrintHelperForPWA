import Box from '@mui/material/Box';
import { styled, type SxProps, type Theme } from '@mui/material/styles';

const DragIcon = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.divider,
  borderRadius: 3,
}));

interface BottomSheetsDragBarProps {
  sx?: SxProps<Theme>;
}

export default function BottomSheetsDragBar({ sx }: BottomSheetsDragBarProps) {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 32,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <DragIcon />
    </Box>
  );
}
