import { ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material';

interface ListSwitchItemProps {
  icon?: React.ReactNode;
  title?: string;
  summary?: string;
  checked?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export default function ListSwitchItem({ icon, title, summary, checked, onClick }: ListSwitchItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={title} secondary={summary} />
        <Switch aria-hidden checked={checked} edge="end" sx={{ pointerEvents: 'none' }} tabIndex={-1} />
      </ListItemButton>
    </ListItem>
  );
}
