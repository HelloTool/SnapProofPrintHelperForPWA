import type { PaperLayout, Image } from '@/types/snap-proof-print';
import { Box } from '@mui/material';

interface SnapProofPrintPageContentProps {
  images: Image[];
  paperLayout: PaperLayout;
}

export default function SnapProofPrintPageContent({ images, paperLayout }: SnapProofPrintPageContentProps) {
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
          key={image.key}
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
