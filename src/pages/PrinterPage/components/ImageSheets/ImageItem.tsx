import { Box, Paper, Typography } from '@suid/material';
import type { BoxProps } from '@suid/system/Box';
import { splitProps } from 'solid-js';
import type { SnapImage } from '../../types/image';

interface ImageItemProps extends BoxProps {
  image: SnapImage;
}
export default function ImageItem(props: ImageItemProps) {
  const [localProps, otherProps] = splitProps(props, ['image']);
  return (
    <Box title={localProps.image.name} {...otherProps}>
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
          src={localProps.image.url}
          loading="lazy"
          decoding="async"
          alt={localProps.image.name}
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
        {localProps.image.name}
      </Typography>
    </Box>
  );
}
