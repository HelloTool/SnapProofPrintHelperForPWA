import { IconButton } from '@suid/material';
import type { IconButtonProps } from '@suid/material/IconButton';
import type { Theme } from '@suid/material/styles';
import type { SxProps } from '@suid/system';
import type { JSX } from 'solid-js';

interface ToolbarIconButtonProps {
  icon: JSX.Element;
  label?: string;
  tooltip?: string;
  color?: IconButtonProps['color'];
  edge?: IconButtonProps['edge'];
  disabled?: boolean;
  sx?: SxProps<Theme>;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent, JSX.EventHandler<HTMLButtonElement, MouseEvent>>;
}
export function ToolbarIconButton(props: ToolbarIconButtonProps) {
  return (
    <IconButton
      aria-label={props.label}
      color={props.color}
      disabled={props.disabled}
      edge={props.edge}
      onClick={props.onClick}
      sx={props.sx}
      title={props.tooltip ?? props.label}
    >
      {props.icon}
    </IconButton>
    // <Tooltip sx={sx} title={tooltip ?? label} placement="bottom" describeChild={false}>
    //   {/* 添加span元素，允许禁用时显示tooltip */}
    //   <span>
    //     <IconButton edge={edge} color={color} aria-label={label} onClick={onClick} disabled={disabled}>
    //       {icon}
    //     </IconButton>
    //   </span>
    // </Tooltip>
  );
}
