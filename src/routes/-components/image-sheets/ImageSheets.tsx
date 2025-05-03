import useInsets from '@/features/insets/hooks';
import { readFileAsDataURL } from '@/utils/file';
import { SwipeableDrawer, ImageList, ImageListItem, type Theme, Box, Paper, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { useRef } from 'react';
import type { Image } from '@/types/snap-proof-print';
import Toolbar from './Toolbar';
interface ImageSheetsProps {
  height: number;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  images: Image[];
  onAddImage: (image: Image) => void;
  onClearImages: () => void;
}

export default function ImageSheets({
  open,
  onClose,
  onOpen,
  height,
  images,
  onAddImage,
  onClearImages,
}: ImageSheetsProps) {
  const sheetsBleeding = 56;
  const insets = useInsets();
  const imageInputRef = useRef<HTMLInputElement>(null);

  function handleAddImagesClick() {
    imageInputRef.current?.click();
  }
  function handleImageInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (files) {
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        readFileAsDataURL(file).then((result) => {
          onAddImage({
            key: nanoid(),
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
      <Toolbar imagesCount={images.length} onAddImageClick={handleAddImagesClick} onClearImagesClick={onClearImages} />
      <input
        ref={imageInputRef}
        type="file"
        style={{ display: 'none' }}
        accept="image/*"
        multiple
        onChange={handleImageInputChange}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 90px)',
          gap: 1,
          padding: 1,
          margin: 0,
          overflow: 'auto',
        }}
      >
        {images.map((item) => (
          <Box key={item.key} sx={{ width: '100%' }} title={item.name}>
            <Paper
              variant="outlined"
              sx={{
                width: '100%',
                aspectRatio: 1,
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src={item.url}
                alt={item.name}
                loading="lazy"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Paper>
            <Typography
              variant="caption"
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
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </SwipeableDrawer>
  );
}
