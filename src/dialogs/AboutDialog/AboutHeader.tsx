import { Box, type Theme, Typography, useTheme } from '@suid/material';
import type { SxProps } from '@suid/system';

interface AboutHeaderProps {
  icon: string;
  name: string;
  version: string;
  sx?: SxProps<Theme>;
}
export default function AboutHeader(props: AboutHeaderProps) {
  const theme= useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'block',
          width: theme.spacing(5),
          height: theme.spacing(5),
        }}
        component="img"
        src={props.icon}
        alt="应用图标"
      />
      <Box>
        <Typography variant="subtitle1">{props.name}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          v{props.version}
        </Typography>
      </Box>
    </Box>
  );
}
