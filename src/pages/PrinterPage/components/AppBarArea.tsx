import MoreVertIcon from '@suid/icons-material/MoreVert';
import PhotoLibraryIcon from '@suid/icons-material/PhotoLibrary';
import PhotoLibraryOutlinedIcon from '@suid/icons-material/PhotoLibraryOutlined';
import ViewSidebarIcon from '@suid/icons-material/ViewSidebar';
import ViewSidebarOutlinedIcon from '@suid/icons-material/ViewSidebarOutlined';
import { AppBar, Badge, Menu, MenuItem, Toolbar, useTheme } from '@suid/material';
import { createSignal, Show } from 'solid-js';
import { ToolbarIconButton } from '@/components/toolbar/ToolbarIconButton';
import ToolbarTitle from '@/components/toolbar/ToolbarTitle';
import { getWorkBox, isServiceWorkerWaiting } from '@/features/workbox';

interface AppBarAreaProps {
  onToggleAdjustSheets?: () => void;
  onToggleImageSheets?: () => void;
  imageSheetsButtonActive?: boolean;
  adjustSheetsButtonActive?: boolean;
  onAboutClick?: () => void;
}
export default function AppBarArea(props: AppBarAreaProps) {
  const theme = useTheme();

  const [isMoreOptionsOpened, setMoreOptionsOpened] = createSignal(false);
  let moreOptionsRef: HTMLButtonElement | undefined;

  function handleUpdateMenuItemClick() {
    setMoreOptionsOpened(false);
    getWorkBox()?.messageSkipWaiting();
  }

  function handleAboutMenuIteClick() {
    setMoreOptionsOpened(false);
    props.onAboutClick?.();
  }
  return (
    <AppBar>
      <Toolbar sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
        <ToolbarTitle>快照凭证打印助手</ToolbarTitle>
        <ToolbarIconButton
          icon={props.imageSheetsButtonActive ? <PhotoLibraryIcon /> : <PhotoLibraryOutlinedIcon />}
          label={!props.imageSheetsButtonActive ? '打开图片面板' : '关闭图片面板'}
          onClick={props.onToggleImageSheets}
          color={props.imageSheetsButtonActive ? 'primary' : undefined}
        />
        <ToolbarIconButton
          icon={props.adjustSheetsButtonActive ? <ViewSidebarIcon /> : <ViewSidebarOutlinedIcon />}
          label={!props.adjustSheetsButtonActive ? '打开调整面板' : '关闭调整面板'}
          onClick={props.onToggleAdjustSheets}
          color={props.adjustSheetsButtonActive ? 'primary' : undefined}
        />
        <ToolbarIconButton
          aria-controls={isMoreOptionsOpened() ? 'more-options-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isMoreOptionsOpened() ? 'true' : undefined}
          edge="end"
          icon={
            <Badge variant="dot" invisible={!isServiceWorkerWaiting()}>
              <MoreVertIcon />
            </Badge>
          }
          label={'更多选项'}
          onClick={() => setMoreOptionsOpened(true)}
          ref={moreOptionsRef}
        />
        <Menu
          id="more-options-menu"
          anchorEl={moreOptionsRef}
          open={isMoreOptionsOpened()}
          onClose={() => setMoreOptionsOpened(false)}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          PaperProps={{
            sx: {
              minWidth: '168px',
              [theme.breakpoints.up('sm')]: {
                width: '192px',
              },
            },
          }}
        >
          {CONFIG_ENABLE_PWA ? (
            <Show when={isServiceWorkerWaiting()}>
              <MenuItem onClick={handleUpdateMenuItemClick}>重启以应用更新</MenuItem>
            </Show>
          ) : undefined}
          <MenuItem onClick={handleAboutMenuIteClick}>关于</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
