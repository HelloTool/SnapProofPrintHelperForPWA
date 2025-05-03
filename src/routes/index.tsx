import { createFileRoute } from '@tanstack/react-router';
import Fab from '@mui/material/Fab';
import PrintIcon from '@mui/icons-material/Print';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { chunkArray } from '@/utils/list';
import { ProvideInsets } from '@/features/insets/components';
import type { PaperLayout, Image } from '@/types/snap-proof-print';
import AppBar from './-components/AppBar';
import AdjustSheets from './-components/AdjustSheets';
import usePrint from '@/features/print/hooks';
import ImageSheets from './-components/image-sheets/ImageSheets';
import SnapProofPrint from './-components/SnapProofPrint';
import Main from './-components/Main';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const [paperLayout, setPaperLayout] = useState<PaperLayout>({
    columns: 3,
    rows: 1,
    orientation: 'landscape',
  });
  const [paperLayoutAfterChunk, setPaperLayoutAfterChunk] = useState<PaperLayout>(paperLayout);
  const [isImageSheetsOpened, setImageSheetsOpened] = useState(true);
  const [isAdjustSheetsOpened, setAdjustSheetsOpened] = useState(true);
  const [isGrayPreview, setGrayPreview] = useState(true);

  const bottomSheetsHeight = 320;
  const sideSheetsWidth = 320;

  const [images, setImages] = useState<Image[]>([]);
  const [papers, setPapers] = useState<Image[][]>([]);

  useEffect(() => {
    const newPapers: Image[][] = chunkArray(images, paperLayout.rows * paperLayout.columns);
    setPapers(newPapers);
    setPaperLayoutAfterChunk(paperLayout);
  }, [images, paperLayout]);
  function handleAddImage(image: Image) {
    setImages((prev) => [...prev, image]);
  }
  function handleClearImages() {
    setImages([]);
  }
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
        <ProvideInsets right={isAdjustSheetsOpened ? sideSheetsWidth : 0}>
          <ProvideInsets bottom={isImageSheetsOpened ? bottomSheetsHeight : 0}>
            <Main papers={papers} paperLayout={paperLayoutAfterChunk} grayPreview={isGrayPreview} />
          </ProvideInsets>
          <ImageSheets
            height={bottomSheetsHeight}
            open={isImageSheetsOpened}
            onOpen={() => setImageSheetsOpened(true)}
            onClose={() => setImageSheetsOpened(false)}
            images={images}
            onAddImage={handleAddImage}
            onClearImages={handleClearImages}
          />
        </ProvideInsets>
        <AdjustSheets
          paperLayout={paperLayout}
          onLayoutChange={setPaperLayout}
          open={isAdjustSheetsOpened}
          width={sideSheetsWidth}
          grayPreview={isGrayPreview}
          onGrayPreviewChange={setGrayPreview}
        />
        <Fab
          variant="extended"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={handlePrint}
        >
          <PrintIcon sx={{ mr: 1 }} />
          打印
        </Fab>
      </Box>
      {isPrinting ? <SnapProofPrint papers={papers} paperLayout={paperLayout} /> : null}
    </>
  );
}
