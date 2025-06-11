import PrintIcon from '@suid/icons-material/Print';
import ViewSidebarIcon from '@suid/icons-material/ViewSidebar';
import ViewSidebarOutlinedIcon from '@suid/icons-material/ViewSidebarOutlined';
import { AppBar, Box, Fab, Toolbar, useMediaQuery, useTheme } from '@suid/material';
import { createDeferred, createSignal } from 'solid-js';
import { ToolbarIconButton } from '@/components/toolbar/ToolbarIconButton';
import ToolbarTitle from '@/components/toolbar/ToolbarTitle';
import { InsetsProvider } from '@/features/insets/contexts/InsetsContext';
import usePrint from '@/features/print/hooks/createPrinting';
import AdjustSheets from './components/AdjustSheets';
import ImageSheets from './components/ImageSheets';
import MainArea from './components/MainArea';
import SPPrint from './components/SPPrint';
import { ConfigProvider } from './contexts/ConfigContext';
import useImages, { ImagesProvider } from './contexts/ImagesContext';

function PrinterPageContent() {
  const theme = useTheme();
  const isSmAndUp = createDeferred(useMediaQuery(theme.breakpoints.up('sm')));
  const isMdAndUp = createDeferred(useMediaQuery(theme.breakpoints.up('md')));

  const [isImageSheetsOpened, setImageSheetsOpened] = createSignal(true);
  const [isAdjustSheetsOpened, setAdjustSheetsOpened] = createSignal(isMdAndUp());
  function toggleAdjustSheets() {
    setAdjustSheetsOpened((prev) => !prev);
  }
  function toggleImageSheets() {
    setImageSheetsOpened((prev) => !prev);
  }

  const imagesSheetsHeight = 320;
  const adjustSheetsWidth = 320;

  const isPrinting = usePrint();
  function handlePrint() {
    window.print();
  }

  const { state: images } = useImages();
  return (
    <Box
      class="printer-page"
      sx={{
        height: '100%',
      }}
    >
      <AppBar>
        <Toolbar sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
          <ToolbarTitle>快照凭证打印助手</ToolbarTitle>
          <ToolbarIconButton
            edge="end"
            icon={isAdjustSheetsOpened() ? <ViewSidebarIcon /> : <ViewSidebarOutlinedIcon />}
            label={!isAdjustSheetsOpened() ? '打开调整面板' : '关闭调整面板'}
            onClick={toggleAdjustSheets}
          />
        </Toolbar>
      </AppBar>
      <InsetsProvider right={isMdAndUp() && isAdjustSheetsOpened() ? adjustSheetsWidth : 0}>
        <InsetsProvider bottom={isImageSheetsOpened() ? imagesSheetsHeight : 0}>
          <MainArea />
        </InsetsProvider>
        <ImageSheets
          height={imagesSheetsHeight}
          onClose={() => setImageSheetsOpened(false)}
          onOpen={() => setImageSheetsOpened(true)}
          open={isImageSheetsOpened()}
        />
      </InsetsProvider>
      <AdjustSheets
        onClose={() => setAdjustSheetsOpened(false)}
        // onOpen={() => setAdjustSheetsOpened(true)}
        open={isAdjustSheetsOpened()}
        variant={isMdAndUp() ? 'persistent' : 'temporary'}
        width={isSmAndUp() ? adjustSheetsWidth : '100%'}
      />
      <Fab
        disabled={images.images.length === 0}
        onClick={handlePrint}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        variant="extended"
      >
        <PrintIcon sx={{ mr: 1 }} />
        打印
      </Fab>
      {isPrinting() ? <SPPrint /> : null}
    </Box>
  );
}

export default function PrinterPage() {
  return (
    <ConfigProvider>
      <ImagesProvider>
        <PrinterPageContent />
      </ImagesProvider>
    </ConfigProvider>
  );
}
