import { Box, CircularProgress, Drawer, Paper, Typography, useTheme } from '@suid/material';

import { nanoid } from 'nanoid';
import { Index, Show } from 'solid-js';
import { useInsets } from '@/features/insets/contexts/InsetsContext';
import { pickFiles, readFileAsDataURL } from '@/utils/file';
import useImages from '../../contexts/ImagesContext';
import type { LoadedSnapImage, SnapImage } from '../../types/image';
import ISToolbar from './ISToolbar';

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

  function loadImages(files: FileList | null) {
    if (files && files.length > 0) {
      const imageProcessTasks = Array.from(files).map((file) => ({
        key: nanoid(),
        url: readFileAsDataURL(file),
        file,
      }));
      const loadingImages: SnapImage[] = imageProcessTasks.map((task) => ({
        key: task.key,
        status: 'loading',
        name: task.file.name,
      }));
      imagesActions.addImages(loadingImages);
      const asyncImages = imageProcessTasks.map(async (task): Promise<SnapImage> => {
        try {
          const awaitedUrl = await task.url;
          return {
            key: task.key,
            status: 'loaded',
            name: task.file.name,
            url: awaitedUrl,
          };
        } catch (e) {
          return {
            key: task.key,
            status: 'error',
            name: task.file.name,
            reason: String(e),
          };
        }
      });
      Promise.all(asyncImages)
        .then((images) => {
          imagesActions.updateImages(images);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }
  function handleAddImagesClick() {
    pickFiles({ accept: 'image/*', multiple: true })
      .then(loadImages)
      .catch((e) => {
        console.error(e);
      });
  }

  function handleClearImagesClick() {
    imagesActions.clearImages();
  }
  const theme = useTheme();
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
          display: 'grid',
          width: '100%',
          gap: 1,
          padding: 1,
          margin: 0,
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
                transition: theme.transitions.create(['width'], {
                  duration: theme.transitions.duration.enteringScreen,
                }),
              }}
              title={image().name}
            >
              <Paper
                sx={{
                  width: '100%',
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                variant="outlined"
              >
                <Show when={image().status === 'loaded'} fallback={<CircularProgress />}>
                  <Box
                    alt={image().name}
                    component="img"
                    loading="lazy"
                    src={(image() as LoadedSnapImage).url}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Show>
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
    </Drawer>
  );
}
