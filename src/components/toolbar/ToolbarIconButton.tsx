import { IconButton, type IconButtonOwnProps, Tooltip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

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
export function ToolbarIconButton({
  icon,
  tooltip,
  label,
  color = 'inherit',
  edge,
  onClick,
  disabled,
  sx,
}: ToolbarIconButtonProps) {
  return (
    <Tooltip sx={sx} title={tooltip ?? label} placement="bottom" describeChild={false}>
      {/* 添加span元素，允许禁用时显示tooltip */}
      <span>
        <IconButton edge={edge} color={color} aria-label={label} onClick={onClick} disabled={disabled}>
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}
