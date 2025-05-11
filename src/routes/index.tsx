import PrintIcon from '@mui/icons-material/Print';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import AdjustSheets from './-components/AdjustSheets';
import AppBar from './-components/AppBar';
import Main from './-components/Main';
import SnapProofPrint from './-components/SnapProofPrint';
import ImageSheets from './-components/image-sheets/ImageSheets';
import usePrint from '@/features/print/hooks/usePrint';
import ProvideInsets from '@/features/insets/components/ProvideInsets';
import { useAtom } from 'jotai';
import { isImagesAddedAtom } from '@/atoms/snapProofPrint';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const theme = useTheme();
  const isSmAndUp = useMediaQuery(theme.breakpoints.up('sm'));

  const [isImageSheetsOpened, setImageSheetsOpened] = useState(true);
  const [isAdjustSheetsOpened, setAdjustSheetsOpened] = useState(isSmAndUp);

  const bottomSheetsHeight = 320;
  const sideSheetsWidth = 320;

  const [isAddedImages] = useAtom(isImagesAddedAtom);
  const isPrinting = usePrint();
  function handlePrint() {
    window.print();
  }
  return (
    <>
      <Box
        sx={{
          height: '100%',
        }}
      >
        <AppBar
          isSidebarOpened={isAdjustSheetsOpened}
          onSidebarClick={() => setAdjustSheetsOpened(!isAdjustSheetsOpened)}
        />
        <ProvideInsets right={isSmAndUp && isAdjustSheetsOpened ? sideSheetsWidth : 0}>
          <ProvideInsets bottom={isImageSheetsOpened ? bottomSheetsHeight : 0}>
            <Main />
          </ProvideInsets>
          <ImageSheets
            height={bottomSheetsHeight}
            open={isImageSheetsOpened}
            onOpen={() => setImageSheetsOpened(true)}
            onClose={() => setImageSheetsOpened(false)}
          />
        </ProvideInsets>
        <AdjustSheets
          open={isAdjustSheetsOpened}
          variant={isSmAndUp ? 'persistent' : 'temporary'}
          width={isSmAndUp ? sideSheetsWidth : '100%'}
          onClose={() => setAdjustSheetsOpened(false)}
          onOpen={() => setAdjustSheetsOpened(true)}
        />
        <Fab
          variant="extended"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={handlePrint}
          disabled={!isAddedImages}
        >
          <PrintIcon sx={{ mr: 1 }} />
          打印
        </Fab>
      </Box>
      {isPrinting ? <SnapProofPrint /> : null}
    </>
  );
}
