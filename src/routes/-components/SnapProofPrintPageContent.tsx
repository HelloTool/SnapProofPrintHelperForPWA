import { Box, CircularProgress } from '@mui/material';
import { useAtom } from 'jotai';
import { paperLayoutAtom } from '@/atoms/snapProofPrint';
import type { SnapImage } from '@/types/snapProofPrint';

interface SnapProofPrintPageContentProps {
  images: SnapImage[];
}

export default function SnapProofPrintPageContent({ images }: SnapProofPrintPageContentProps) {
  const [paperLayout] = useAtom(paperLayoutAtom);
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
            width: `calc(100% / ${paperLayout.columns})`,
            height: `calc(100% / ${paperLayout.rows})`,
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
