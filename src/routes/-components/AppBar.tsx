import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import { AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { ToolbarIconButton } from '@/components/toolbar/ToolbarIconButton';
import ToolbarTitle from '@/components/toolbar/ToolbarTitle';

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
          icon={isSidebarOpened ? <ViewSidebarIcon /> : <ViewSidebarOutlinedIcon />}
          label={!isSidebarOpened ? '打开调整面板' : '关闭调整面板'}
          onClick={onSidebarClick}
        />
      </Toolbar>
    </MuiAppBar>
  );
}
