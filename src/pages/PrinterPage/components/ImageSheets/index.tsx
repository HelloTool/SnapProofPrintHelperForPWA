import { Box, CircularProgress, Drawer, Paper, Typography, useTheme } from '@suid/material';

import { nanoid } from 'nanoid';
import { Index, Show } from 'solid-js';
import { useInsets } from '@/features/insets/contexts/InsetsContext';
import { pickFiles, readFileAsDataURL } from '@/utils/file';
import useImages from '../../contexts/ImagesContext';
import type { SnapImage } from '../../types/image';
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

  function loadImages(files: FileList | null) {
    if (files && files.length > 0) {
      const newImages: SnapImage[] = Array.from(files).map((file) => ({
        key: nanoid(),
        url: URL.createObjectURL(file),
        name: file.name,
      }));
      imagesActions.addImages(newImages);
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
    </Drawer>
  );
}
