import { ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@suid/material';
import type { JSX } from 'solid-js';

interface ListSwitchItemProps {
  icon?: JSX.Element;
  title?: string;
  summary?: string;
  checked?: boolean;
  onClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent, JSX.EventHandler<HTMLDivElement, MouseEvent>>;
}
export default function ListSwitchItem(props: ListSwitchItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={props.onClick}>
        {props.icon ? <ListItemIcon>{props.icon}</ListItemIcon> : null}
        <ListItemText primary={props.title} secondary={props.summary} />
        <Switch aria-hidden checked={props.checked} edge="end" sx={{ pointerEvents: 'none' }} tabIndex={-1} />
      </ListItemButton>
    </ListItem>
  );
}
