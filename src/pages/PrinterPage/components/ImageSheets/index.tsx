import { Box, Drawer, Fade, Paper, Typography, useTheme } from '@suid/material';
import { createSignal, Index } from 'solid-js';
import { useInsets } from '@/features/insets/contexts/InsetsContext';
import { pickFiles } from '@/utils/file';
import useImages from '../../contexts/ImagesContext';
import ISToolbar from './ISToolbar';
import { StatefulImage } from '@/components/StatefulImage';

interface ImageSheetsProps {
  height: number;
  open: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export default function ImageSheets(props: ImageSheetsProps) {
  const sheetsBleeding = 56;
  const insets = useInsets();

  const { state: images, actions: imagesActions } = useImages();

  function handleAddImagesClick() {
    pickFiles({ accept: 'image/*', multiple: true })
      .then((files) => {
        if (files) {
          imagesActions.addImageFiles(files);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function handleClearImagesClick() {
    imagesActions.clearImages();
  }
  const theme = useTheme();

  const [dragEntered, setDragEntered] = createSignal(false);

  let isSelfDrag: boolean = false;
  function handleDragStart(_event: DragEvent) {
    isSelfDrag = true;
  }

  function handleDragEnd(_event: DragEvent) {
    isSelfDrag = false;
  }

  function handleDragEnter(event: DragEvent) {
    if (!isSelfDrag && event.dataTransfer?.types.includes('Files')) {
      setDragEntered(true);
    }
  }

  function handleDragOver(event: DragEvent) {
    if (!isSelfDrag && event.dataTransfer) {
      event.preventDefault();
      event.dataTransfer.dropEffect = event.dataTransfer.types.includes('Files') ? 'copy' : 'none';
    }
  }
  function handleDragLeave(_event: DragEvent) {
    setDragEntered(false);
  }
  function handleDrop(event: DragEvent) {
    event.preventDefault();
    setDragEntered(false);
    if (event.dataTransfer?.files) {
      imagesActions.addImageFiles(event.dataTransfer.files);
    }
  }
  return (
    <Drawer
      anchor="bottom"
      // disableSwipeToOpen={false}
      onClose={props.onClose}
      // onOpen={onOpen}
      open={props.open}
      // swipeAreaWidth={sheetsBleeding}
      sx={{
        '& .MuiDrawer-paper': {
          zIndex: 0,
          height: props.height,
          left: `${insets.left}px`,
          right: `${insets.right}px`,
          bottom: `${insets.bottom}px`,
          transition: theme.transitions.create(['left', 'right', 'bottom'], {
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
      variant="permanent"
    >
      <ISToolbar
        imagesCount={images.images.length}
        onAddImageClick={handleAddImagesClick}
        onClearImagesClick={handleClearImagesClick}
      />

      <Box
        sx={{
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            display: 'grid',
            width: '100%',
            gap: 1,
            padding: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            [theme.breakpoints.up('sm')]: {
              gridTemplateColumns: 'repeat(auto-fill, 90px)',
            },
          }}
        >
          <Index each={images.images}>
            {(image) => (
              <Box
                sx={{
                  width: '100%',
                }}
                title={image().name}
              >
                <Paper
                  sx={{
                    width: '100%',
                    aspectRatio: '1',
                    overflow: 'hidden',
                  }}
                  variant="outlined"
                >
                  <StatefulImage
                    src={image().url}
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}
                    imgProps={{
                      loading: 'lazy',
                      sx: {
                        objectFit: 'cover',
                      },
                    }}
                    alt={image().name}
                  />
                </Paper>
                <Typography
                  component="div"
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 1,
                    userSelect: 'text',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  variant="caption"
                >
                  {image().name}
                </Typography>
              </Box>
            )}
          </Index>
        </Box>
        <Fade in={dragEntered()}>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onDragLeave={handleDragLeave}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                backgroundColor: theme.palette.primary.main,
                opacity: theme.palette.action.hoverOpacity,
              }}
            />
            <Typography variant="body1" color="primary">
              拖到此处添加图片
            </Typography>
          </Box>
        </Fade>
      </Box>
    </Drawer>
  );
}
