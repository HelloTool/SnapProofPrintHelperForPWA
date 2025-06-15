import { MDCTooltip } from '@material/tooltip';
import { IconButton } from '@suid/material';
import type { IconButtonProps } from '@suid/material/IconButton';
import type { Theme } from '@suid/material/styles';
import type { SxProps } from '@suid/system';
import { createUniqueId, onCleanup, onMount, type JSX } from 'solid-js';
import '@material/tooltip/dist/mdc.tooltip.min.css';

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
  const tooltipId = createUniqueId();
  let tooltipRef: HTMLDivElement | undefined;
  let mdcTooltip: MDCTooltip | undefined;
  onMount(() => {
    if (tooltipRef) {
      mdcTooltip = new MDCTooltip(tooltipRef);
    }
  });
  onCleanup(() => {
    if (tooltipRef) {
      if (mdcTooltip) {
        mdcTooltip.destroy();
      }
    }
  });
  return (
    <>
      {/* TODO: 等待suid官方支持Tooltip */}
      {/* <div ref={tooltipRef} id={tooltipId} class="mdc-tooltip" role="tooltip" aria-hidden="true">
        <div class="mdc-tooltip__surface mdc-tooltip__surface-animation">{props.tooltip ?? props.label}</div>
      </div> */}
      <span aria-describedby={tooltipId} title={props.tooltip ?? props.label}>
        <IconButton
          aria-label={props.label}
          color={props.color}
          disabled={props.disabled}
          edge={props.edge}
          onClick={props.onClick}
          sx={props.sx}
        >
          {props.icon}
        </IconButton>
      </span>
    </>

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
