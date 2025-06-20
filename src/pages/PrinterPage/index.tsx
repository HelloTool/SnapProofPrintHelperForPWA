import PrintIcon from '@suid/icons-material/Print';
import { Box, Fab, useMediaQuery, useTheme } from '@suid/material';
import { createDeferred, createMemo, createSignal, Show } from 'solid-js';
import { InsetsProvider } from '@/features/insets/contexts/InsetsContext';
import usePrint from '@/features/print/hooks/createPrinting';
import { createSheetOpenState } from '@/hooks/createSheetOpenedState';
import AdjustSheets from './components/AdjustSheets';
import AppBarArea from './components/AppBarArea';
import ImageSheets from './components/ImageSheets';
import MainArea from './components/MainArea';
import SPPrint from './components/SPPrint';
import { ConfigProvider } from './contexts/ConfigContext';
import useImages, { ImagesProvider } from './contexts/ImagesContext';
import AboutDialog from '@/dialogs/AboutDialog';

function PrinterPageContent() {
  const theme = useTheme();
  const isSmAndUp = createDeferred(useMediaQuery(theme.breakpoints.up('sm')));
  const isMdAndUp = createDeferred(useMediaQuery(theme.breakpoints.up('md')));
  const isHeight600AndUp = createDeferred(useMediaQuery('(min-height: 600px)'));

  const isAdjustSheetsPersistent = isMdAndUp;
  const isImageSheetsPersistent = isHeight600AndUp;

  const [isAdjustSheetsOpened, setAdjustSheetsOpened] = createSheetOpenState(isAdjustSheetsPersistent);
  const [isImageSheetsOpened, setImageSheetsOpened] = createSheetOpenState(isImageSheetsPersistent);

  function toggleAdjustSheets() {
    setAdjustSheetsOpened((prev) => !prev);
  }
  function toggleImageSheets() {
    setImageSheetsOpened((prev) => !prev);
  }

  const adjustSheetsWidth = 320;
  const imagesSheetsHeight = 320;

  const adjustSheetsInsetWidth = createMemo(() =>
    isAdjustSheetsPersistent() && isAdjustSheetsOpened() ? adjustSheetsWidth : 0,
  );
  const imagesSheetsInsetWidth = createMemo(() =>
    isImageSheetsPersistent() && isImageSheetsOpened() ? imagesSheetsHeight : 0,
  );

  const fabInsetWidth = 48 + 16;

  const isPrinting = usePrint();
  function handlePrint() {
    window.print();
  }

  const { state: images } = useImages();

  const [isAboutDialogOpened, setAboutDialogOpened] = createSignal(false);
  return (
    <Box
      class="printer-page"
      sx={{
        height: '100%',
      }}
    >
      <AppBarArea
        imageSheetsButtonActive={isImageSheetsOpened() && isImageSheetsPersistent()}
        adjustSheetsButtonActive={isAdjustSheetsOpened() && isAdjustSheetsPersistent()}
        onToggleAdjustSheets={toggleAdjustSheets}
        onToggleImageSheets={toggleImageSheets}
        onAboutClick={() => setAboutDialogOpened(true)}
      />
      <InsetsProvider right={adjustSheetsInsetWidth()} bottom={imagesSheetsInsetWidth()}>
        <MainArea />
      </InsetsProvider>
      <InsetsProvider
        right={isImageSheetsPersistent() ? adjustSheetsInsetWidth() : undefined}
        bottom={isImageSheetsPersistent() && adjustSheetsInsetWidth() <= 0 ? fabInsetWidth : undefined}
      >
        <ImageSheets
          onClose={() => setImageSheetsOpened(false)}
          // onOpen={() => setImageSheetsOpened(true)}
          open={isImageSheetsOpened()}
          variant={isImageSheetsPersistent() ? 'persistent' : 'temporary'}
          showCloseButton={!isImageSheetsPersistent()}
          PaperProps={{
            sx: {
              height: isImageSheetsPersistent() ? `${imagesSheetsHeight}px` : '100%',
            },
          }}
        />
      </InsetsProvider>
      <InsetsProvider bottom={isAdjustSheetsPersistent() ? fabInsetWidth : undefined}>
        <AdjustSheets
          onClose={() => setAdjustSheetsOpened(false)}
          // onOpen={() => setAdjustSheetsOpened(true)}
          open={isAdjustSheetsOpened()}
          variant={isAdjustSheetsPersistent() ? 'persistent' : 'temporary'}
          PaperProps={{
            sx: {
              width: isSmAndUp() ? adjustSheetsWidth : '100%',
              maxWidth: 'calc(100% - 56px)',
              zIndex: isAdjustSheetsPersistent() ? 0 : undefined,
            },
          }}
        />
      </InsetsProvider>
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
      <Show when={isPrinting()}>
        <SPPrint />
      </Show>
      <AboutDialog open={isAboutDialogOpened()} onClose={() => setAboutDialogOpened(false)} />
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
