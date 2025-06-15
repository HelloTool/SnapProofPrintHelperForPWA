import { ToolbarIconButton } from '@/components/toolbar/ToolbarIconButton';
import ToolbarTitle from '@/components/toolbar/ToolbarTitle';
import { useInsets } from '@/features/insets/contexts/InsetsContext';
import { pickFiles } from '@/utils/file';
import { mergeMultiSxProps } from '@/utils/suid';
import AddIcon from '@suid/icons-material/Add';
import ClearAllOutlinedIcon from '@suid/icons-material/ClearAllOutlined';
import { alpha, Box, Drawer, Fade, Paper, Toolbar, Typography, useTheme } from '@suid/material';
import type { DrawerProps } from '@suid/material/Drawer';
import { createSignal, Index, Show } from 'solid-js';
import useImages from '../../contexts/ImagesContext';
import CloseIcon from '@suid/icons-material/Close';
interface ImageSheetsProps extends DrawerProps {
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'toolbarClick') => void;
  showCloseButton?: boolean;
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
      {...props}
      PaperProps={{
        ...props.PaperProps,
        sx: mergeMultiSxProps(
          {
            zIndex: 0,
            left: `${insets.left}px`,
            right: `${insets.right}px`,
            transition: theme.transitions.create(['left', 'right', 'bottom'], {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut,
            }),
            transitionProperty: 'left, right, bottom, transform !important',
          },
          props.PaperProps?.sx,
        ),
      }}
    >
      <Toolbar>
        <Show when={props.showCloseButton}>
          <ToolbarIconButton
            icon={<CloseIcon />}
            label="关闭图片面板"
            onClick={() => props.onClose?.({}, 'toolbarClick')}
            edge="start"
            sx={{ mr: 2 }}
          />
        </Show>

        <ToolbarTitle>图片（{images.images.length} 张）</ToolbarTitle>
        <ToolbarIconButton
          disabled={images.images.length === 0}
          icon={<ClearAllOutlinedIcon />}
          label={'移除所有图片'}
          onClick={handleClearImagesClick}
        />
        <ToolbarIconButton edge="end" icon={<AddIcon />} label={'添加图片'} onClick={handleAddImagesClick} />
      </Toolbar>

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
            alignContent: 'start',
            width: '100%',
            gap: 1,
            padding: 1,
            paddingBottom: `calc(${insets.bottom}px + ${theme.spacing(1)})`,
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
                  <Box
                    component="img"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    src={image().url}
                    loading="lazy"
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
              backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
            }}
            onDragLeave={handleDragLeave}
          >
            <Typography variant="body1" color="primary">
              拖到此处添加图片
            </Typography>
          </Box>
        </Fade>
      </Box>
    </Drawer>
  );
}
