import { Box, CircularProgress } from '@suid/material';
import type { SnapImage } from '../types/image';

interface SPPrintPageContentProps {
  images: SnapImage[];
  rows: number;
  columns: number;
}

export default function SPPrintPageContent({ images, rows, columns }: SPPrintPageContentProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        userSelect: 'none',
        fontSize: 0,
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {images.map((image) => (
        <Box
          key={image.key}
          sx={{
            width: `calc(100% / ${columns})`,
            height: `calc(100% / ${rows})`,
            border: '1px dashed gray',
            objectFit: 'contain',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {image.status === 'loaded' ? (
            <Box
              alt={image.name}
              component="img"
              key={image.key}
              src={image.url}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          ) : (
            <CircularProgress />
          )}
        </Box>
      ))}
    </Box>
  );
}
