import { Box, CircularProgress } from '@suid/material';
import { Index, Show } from 'solid-js';
import type { SnapImage } from '../types/image';
import { StatefulImage } from '@/components/StatefulImage';

interface SPPrintPageContentProps {
  images: SnapImage[];
  rows: number;
  columns: number;
}

export default function SPPrintPageContent(props: SPPrintPageContentProps) {
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
      <Index each={props.images}>
        {(image) => (
          <Box
            sx={{
              width: `calc(100% / ${props.columns})`,
              height: `calc(100% / ${props.rows})`,
              border: '1px dashed gray',
              objectFit: 'contain',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StatefulImage
              sx={{
                width: '100%',
                height: '100%',
              }}
              src={image().url}
              alt={image().name}
              imgProps={{
                sx: {
                  objectFit: 'contain',
                },
              }}
            />
          </Box>
        )}
      </Index>
    </Box>
  );
}
