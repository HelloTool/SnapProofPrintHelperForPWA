import { Box, CircularProgress, Paper, SwipeableDrawer, type Theme, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { useRef } from 'react';
import { imagesAtom } from '@/atoms/snapProofPrint';
import useInsets from '@/features/insets/hooks/useInsets';
import type { SnapImage } from '@/types/snapProofPrint';
import { readFileAsDataURL } from '@/utils/file';
import Toolbar from './Toolbar';

interface ImageSheetsProps {
  height: number;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function ImageSheets({ open, onClose, onOpen, height }: ImageSheetsProps) {
  const sheetsBleeding = 56;
  const insets = useInsets();
  const [images, setImages] = useAtom(imagesAtom);
  const imageInputRef = useRef<HTMLInputElement>(null);

  function clearImages() {
    setImages(() => []);
  }

  function updateImages(newImages: SnapImage[]) {
    setImages((draft) => {
      for (const newImage of newImages) {
        const index = draft.findIndex((image) => image.key === newImage.key);
        if (index >= 0) {
          draft[index] = newImage;
        }
      }
    });
  }
  function pushImages(newImages: SnapImage[]) {
    setImages((draft) => {
      draft.push(...newImages);
    });
  }

  function handleAddImagesClick() {
    imageInputRef.current?.click();
  }
  function handleImageInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (files) {
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
      pushImages(loadingImages);

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
          updateImages(images);
        })
        .catch((e) => {
          console.error(e);
        });
    }
    event.target.value = '';
  }

  function handleClearImagesClick() {
    clearImages();
  }

  return (
    <SwipeableDrawer
      anchor="bottom"
      disableSwipeToOpen={false}
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      swipeAreaWidth={sheetsBleeding}
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
      variant="permanent"
    >
      <Toolbar
        imagesCount={images.length}
        onAddImageClick={handleAddImagesClick}
        onClearImagesClick={handleClearImagesClick}
      />
      <input
        accept="image/*"
        multiple
        onChange={handleImageInputChange}
        ref={imageInputRef}
        style={{ display: 'none' }}
        type="file"
      />
      <Box
        sx={(theme) => ({
          display: 'grid',
          width: '100%',
          gap: 1,
          padding: 1,
          margin: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(auto-fill, 120px)',
          },
        })}
      >
        {images.map((item) => (
          <Box
            key={item.key}
            sx={{
              width: '100%',
              transition: (theme: Theme) =>
                theme.transitions.create(['width'], {
                  duration: theme.transitions.duration.enteringScreen,
                }),
            }}
            title={item.name}
          >
            <Paper
              sx={{
                width: '100%',
                aspectRatio: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              variant="outlined"
            >
              {item.status === 'loaded' ? (
                <Box
                  alt={item.name}
                  component="img"
                  loading="lazy"
                  src={item.url}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <CircularProgress />
              )}
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
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </SwipeableDrawer>
  );
}
