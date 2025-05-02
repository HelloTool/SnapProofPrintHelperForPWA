import { createFileRoute } from '@tanstack/react-router';
import Fab from '@mui/material/Fab';
import PrintIcon from '@mui/icons-material/Print';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ToolbarTitle from '@/components/Toolbar/Title';
import Grid from '@mui/material/Grid';
import PrintPaperSimulator from '@/components/Printer/PaperSimulator';
import { useRef, useState } from 'react';
import type { Theme } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import ListItemText from '@mui/material/ListItemText';
import Slider from '@mui/material/Slider';
import { ImageList, ImageListItem, Tooltip } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useInsets } from '@/components/Insets/InsetsContext';
import ProvideInsets from '@/components/Insets/ProvideInsets';
import { readFileAsDataURL } from '@/utils/file';
import { chunkArray } from '@/utils/list';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import Printer from '@/components/Printer/Printer';
import PrinterPaper from '@/components/Printer/PrinterPaper';
import { useReactToPrint } from 'react-to-print';
import usePrint from '@/hooks/print';

export const Route = createFileRoute('/')({
  component: Index,
});

interface PaperLayout {
  columns: number;
  rows: number;
}

interface Image {
  url: string;
  name: string;
}

interface ImageItem extends Image {
  id: number;
}

interface AppBarProps {
  sidebarState: boolean;
  onSidebarClick: (e: React.MouseEvent) => void;
}

function AppBar({ sidebarState, onSidebarClick }: AppBarProps) {
  return (
    <MuiAppBar>
      <Toolbar>
        <ToolbarTitle>快照凭证打印助手</ToolbarTitle>
        <Tooltip title={!sidebarState ? '打开调节面板' : '关闭调节面板'} placement="bottom">
          <IconButton size="large" color="inherit" aria-label="menu" edge="end" onClick={onSidebarClick}>
            {sidebarState ? <ViewSidebarIcon /> : <ViewSidebarOutlinedIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </MuiAppBar>
  );
}

interface AdjustSheetsProps {
  paperLayout: PaperLayout;
  onLayoutChange: (paperLayout: PaperLayout) => void;
  open: boolean;
  width: number;
}

function AdjustSheets({ paperLayout, onLayoutChange, open, width }: AdjustSheetsProps) {
  function handleColumnsChange(_event: Event, value: number, _activeThumb: number) {
    onLayoutChange({ ...paperLayout, columns: value });
  }
  function handleRowsChange(_event: Event, value: number, _activeThumb: number) {
    onLayoutChange({ ...paperLayout, rows: value });
  }
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          zIndex: 0,
          width: width,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', overflowX: 'hidden' }}>
        <List>
          <ListSubheader>页面布局</ListSubheader>
          <ListItem>
            <ListItemText
              primary="列数"
              secondary={
                <Slider
                  aria-label="列数"
                  value={paperLayout.columns}
                  onChange={handleColumnsChange}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={5}
                />
              }
              sx={{
                '& .MuiListItemText-secondary': {
                  paddingInline: 1,
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="行数"
              secondary={
                <Slider
                  aria-label="行数"
                  value={paperLayout.rows}
                  onChange={handleRowsChange}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={5}
                />
              }
              sx={{
                '& .MuiListItemText-secondary': {
                  paddingInline: 1,
                },
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

interface PageContentProps {
  images: ImageItem[];
  paperLayout: PaperLayout;
}

function SnapProofPageContent({ images, paperLayout }: PageContentProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        userSelect: 'none',
        fontSize: 0,
        overflow: 'hidden',
      }}
    >
      {images.map((image) => (
        <Box
          key={image.id}
          sx={{
            width: `calc(100% / ${paperLayout.columns})`,
            height: `calc(100% / ${paperLayout.rows})`,
            border: '1px dashed gray',
            objectFit: 'contain',
          }}
          component="img"
          src={image.url}
          alt=""
        />
      ))}
    </Box>
  );
}

interface PreviewPanelProps {
  images: ImageItem[];
  paperLayout: PaperLayout;
}
function PreviewPanel({ images, paperLayout }: PreviewPanelProps) {
  const papers: ImageItem[][] = chunkArray(images, paperLayout.rows * paperLayout.columns);
  return (
    <Grid
      container
      spacing={{ xs: 2 }}
      columns={{ xs: 1, md: 2, lg: 3, xl: 4 }}
      sx={{
        padding: 2,
      }}
    >
      {papers.map((paperImages, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Grid size={1} key={index}>
          <PrintPaperSimulator marginLeft={0.5} marginTop={1} marginRight={0.5} marginBottom={1}>
            <SnapProofPageContent images={paperImages} paperLayout={paperLayout} />
          </PrintPaperSimulator>
        </Grid>
      ))}
    </Grid>
  );
}

interface SnapProofPrinterProps {
  images: ImageItem[];
  paperLayout: PaperLayout;
}

function SnapProofPrinter({ images, paperLayout }: SnapProofPrinterProps) {
  const papers: ImageItem[][] = chunkArray(images, paperLayout.rows * paperLayout.columns);
  return (
    <Printer marginLeft="0.5cm" marginTop="1cm" marginRight="0.5cm" marginBottom="1cm">
      {papers.map((paperImages, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <PrinterPaper key={index}>
          <SnapProofPageContent images={paperImages} paperLayout={paperLayout} />
        </PrinterPaper>
      ))}
    </Printer>
  );
}

interface ImagePickerSheetsProps {
  height: number;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  images: ImageItem[];
  onAddImage: (image: Image) => void;
  onClearImages: () => void;
}

function ImageSheets({ open, onClose, onOpen, height, images, onAddImage, onClearImages }: ImagePickerSheetsProps) {
  const sheetsBleeding = 56;
  const insets = useInsets();
  const imageInputRef = useRef<HTMLInputElement>(null);

  function handleAddImagesClick() {
    imageInputRef.current?.click();
  }
  function handleImageInputSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (files) {
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        readFileAsDataURL(file).then((result) => {
          onAddImage({
            url: result,
            name: file.name,
          });
        });
      }
    }
    event.target.value = '';
  }

  return (
    <SwipeableDrawer
      variant="permanent"
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      swipeAreaWidth={sheetsBleeding}
      disableSwipeToOpen={false}
      sx={{
        '& .MuiDrawer-paper': {
          zIndex: 0,
          height: height,
          left: `${insets.left}px`,
          right: `${insets.right}px`,
          bottom: `${insets.bottom}px`,
          transition: (theme: Theme) =>
            theme.transitions.create(['left', 'right', 'bottom'], {
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      <Toolbar>
        <ToolbarTitle>图片（{images.length} 张）</ToolbarTitle>
        <Tooltip title="移除所有图片" placement="bottom">
          <IconButton onClick={onClearImages} disabled={images.length === 0}>
            <ClearAllOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="添加图片" placement="bottom">
          <IconButton edge="end" onClick={handleAddImagesClick}>
            <AddOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <ImageList cols={8} rowHeight="auto" sx={{ margin: 0, padding: 1 }}>
        {images.map((item) => (
          <ImageListItem key={item.id}>
            <img src={item.url} aria-label={item.name} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
      <input
        ref={imageInputRef}
        type="file"
        style={{ display: 'none' }}
        accept="image/*"
        multiple
        onChange={handleImageInputSelection}
      />
    </SwipeableDrawer>
  );
}

interface MainProps {
  images: ImageItem[];
  paperLayout: PaperLayout;
}

function Main({ images, paperLayout }: MainProps) {
  const insets = useInsets();
  return (
    <Box
      component="main"
      sx={{
        paddingLeft: `${insets.left}px`,
        paddingTop: `${insets.top}px`,
        paddingRight: `${insets.right}px`,
        paddingBottom: `${insets.bottom}px`,
        transition: (theme) =>
          theme.transitions.create(['padding'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Toolbar />
      <PreviewPanel images={images} paperLayout={paperLayout} />
    </Box>
  );
}

function Index() {
  const [paperLayout, setPaperLayout] = useState<PaperLayout>({
    columns: 3,
    rows: 1,
  });
  const [imageSheetsOpened, setImageSheetsOpened] = useState(true);
  const [adjustSheetsOpen, setAdjustSheetsOpen] = useState(true);

  const bottomSheetsHeight = 320;
  const sideSheetsWidth = 320;

  const [images, setImages] = useState<ImageItem[]>([]);
  function handleAddImage(image: Image) {
    setImages((prev) => [
      ...prev,
      {
        id: (prev[prev.length - 1]?.id ?? 0) + 1,
        ...image,
      },
    ]);
  }
  function handleClearImages() {
    setImages([]);
  }
  // const printContentRef = useRef<HTMLDivElement>(null);
  // const handlePrint = useReactToPrint({
  //   documentTitle: '凭证',
  //   contentRef: printContentRef,
  // });
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
        <AppBar sidebarState={adjustSheetsOpen} onSidebarClick={() => setAdjustSheetsOpen(!adjustSheetsOpen)} />
        <ProvideInsets right={adjustSheetsOpen ? sideSheetsWidth : 0}>
          <ProvideInsets bottom={adjustSheetsOpen ? bottomSheetsHeight : 0}>
            <Main images={images} paperLayout={paperLayout} />
          </ProvideInsets>
          <ImageSheets
            height={bottomSheetsHeight}
            open={imageSheetsOpened}
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
          open={adjustSheetsOpen}
          width={sideSheetsWidth}
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
      {isPrinting ? <SnapProofPrinter images={images} paperLayout={paperLayout} /> : null}
    </>
  );
}
