import ToolbarTitle from '@/components/toolbar/ToolbarTitle';
import { IconButton, Toolbar, Tooltip, AppBar as MuiAppBar } from '@mui/material';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import { ToolbarIconButton } from '@/components/toolbar/ToolbarIconButton';
interface AppBarProps {
  isSidebarOpened: boolean;
  onSidebarClick: (e: React.MouseEvent) => void;
}

export default function AppBar({ isSidebarOpened, onSidebarClick }: AppBarProps) {
  return (
    <MuiAppBar>
      <Toolbar>
        <ToolbarTitle>快照凭证打印助手</ToolbarTitle>
        <ToolbarIconButton
          edge="end"
          onClick={onSidebarClick}
          label={!isSidebarOpened ? '打开调节面板' : '关闭调节面板'}
          icon={isSidebarOpened ? <ViewSidebarIcon /> : <ViewSidebarOutlinedIcon />}
        />
      </Toolbar>
    </MuiAppBar>
  );
}
