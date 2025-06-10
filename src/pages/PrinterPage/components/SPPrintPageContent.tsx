import { Box, CircularProgress } from '@suid/material';
import { Index, Show } from 'solid-js';
import type { LoadedSnapImage, SnapImage } from '../types/image';

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
            <Show when={image().status === 'loaded'} fallback={<CircularProgress />}>
              <Box
                component="img"
                alt={image().name}
                src={(image() as LoadedSnapImage).url}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Show>
          </Box>
        )}
      </Index>
    </Box>
  );
}
