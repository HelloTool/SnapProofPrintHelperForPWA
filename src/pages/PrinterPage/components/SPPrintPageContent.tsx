import { Box } from '@suid/material';
import { Index } from 'solid-js';
import { isItemColumnStart, isItemRowStart } from '@/utils/grid';
import type { SnapImage } from '../types/image';

interface SPPrintPageContentProps {
  images: SnapImage[];
  rows: number;
  columns: number;
  statefulImage?: boolean;
  mode: 'print' | 'preview';
}

export default function SPPrintPageContent(props: SPPrintPageContentProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        userSelect: 'none',
        overflow: 'hidden',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
      }}
    >
      <Index each={props.images}>
        {(image, index) => (
          <Box
            sx={{
              width: `calc(100% / ${props.columns})`,
              height: `calc(100% / ${props.rows})`,
              border: '1px dashed gray',
              borderLeft: !isItemColumnStart(index, props.columns) ? 'none' : undefined,
              borderTop: !isItemRowStart(index, props.columns) ? 'none' : undefined,
              objectFit: 'contain',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              src={image().url}
              alt={image().name}
              loading={props.mode === 'print' ? 'eager' : 'lazy'}
              decoding="async"
            />
          </Box>
        )}
      </Index>
    </Box>
  );
}
