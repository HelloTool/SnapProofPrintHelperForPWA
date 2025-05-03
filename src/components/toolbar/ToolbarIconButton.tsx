import { Tooltip, IconButton, type SxProps, type Theme, type IconButtonOwnProps } from '@mui/material';

interface ToolbarIconButtonProps {
  icon: React.ReactNode;
  label?: string;
  tooltip?: string;
  color?: IconButtonOwnProps['color'];
  edge?: IconButtonOwnProps['edge'];
  disabled?: boolean;
  sx?: SxProps<Theme>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export function ToolbarIconButton({ icon, tooltip, label, color = 'inherit', edge, onClick }: ToolbarIconButtonProps) {
  return (
    <Tooltip title={tooltip ?? label} placement="bottom">
      <IconButton edge={edge} color={color} aria-label={label} onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
