import PrintIcon from '@mui/icons-material/Print';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { isImagesAddedAtom } from '@/atoms/snapProofPrint';
import ProvideInsets from '@/features/insets/components/InsetsProvider';
import usePrint from '@/features/print/hooks/createPrinting';
import AdjustSheets from './-components/AdjustSheets';
import AppBar from './-components/AppBar';
import ImageSheets from './-components/ImageSheets';
import Main from './-components/MainArea';
import SnapProofPrint from './-components/SnapProofPrint';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const theme = useTheme();
  const isSmAndUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdAndUp = useMediaQuery(theme.breakpoints.up('md'));

  const [isImageSheetsOpened, setImageSheetsOpened] = useState(true);
  const [isAdjustSheetsOpened, setAdjustSheetsOpened] = useState(isMdAndUp);

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
        <ProvideInsets right={isMdAndUp && isAdjustSheetsOpened ? sideSheetsWidth : 0}>
          <ProvideInsets bottom={isImageSheetsOpened ? bottomSheetsHeight : 0}>
            <Main />
          </ProvideInsets>
          <ImageSheets
            height={bottomSheetsHeight}
            onClose={() => setImageSheetsOpened(false)}
            onOpen={() => setImageSheetsOpened(true)}
            open={isImageSheetsOpened}
          />
        </ProvideInsets>
        <AdjustSheets
          onClose={() => setAdjustSheetsOpened(false)}
          onOpen={() => setAdjustSheetsOpened(true)}
          open={isAdjustSheetsOpened}
          variant={isMdAndUp ? 'persistent' : 'temporary'}
          width={isSmAndUp ? sideSheetsWidth : '100%'}
        />
        <Fab
          disabled={!isAddedImages}
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
      </Box>
      {isPrinting ? <SnapProofPrint /> : null}
    </>
  );
}
