import { mergeMulitSxProps } from '@/utils/suid';
import { Box, CircularProgress, type Theme } from '@suid/material';
import type BoxProps from '@suid/material/Box/BoxProps';
import type { SxProps } from '@suid/system';
import { createSignal, Match, onMount, Switch } from 'solid-js';
import WarningAmberIcon from '@suid/icons-material/WarningAmber';

export type ImageState = 'loading' | 'loaded' | 'error';

interface StatefulImageProps {
  sx?: SxProps<Theme>;
  src?: string;
  alt?: string;
  imgProps?: BoxProps<'img'>;
  onLoad?: (e: Event) => void;
  onError?: (e: ErrorEvent) => void;
}

export function StatefulImage(props: StatefulImageProps) {
  const [state, setState] = createSignal<ImageState>('loaded');
  let imgRef: HTMLImageElement | undefined;

  function handleLoad(event: Event) {
    setState('loaded');
    props.onLoad?.(event);
  }

  function handleError(event: ErrorEvent) {
    setState('error');
    props.onError?.(event);
  }
  onMount(() => {
    if (imgRef && !imgRef.complete) {
      setState('loading');
    }
  });
  return (
    <Box
      sx={mergeMulitSxProps(
        {
          position: 'relative',
        },
        props.sx,
      )}
    >
      <Box
        component="img"
        ref={imgRef}
        src={props.src}
        alt={props.alt}
        {...props.imgProps}
        sx={mergeMulitSxProps(
          {
            width: '100%',
            height: '100%',
            visibility: state() === 'loaded' ? 'visible' : 'hidden',
          },
          props.imgProps?.sx,
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
      <Switch>
        <Match when={state() === 'error'}>
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
            }}
          >
            <WarningAmberIcon color="warning" sx={{ fontSize: 40 }} />
          </Box>
        </Match>
        <Match when={state() === 'loading'}>
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
            }}
          >
            <CircularProgress
              sx={{
                display: 'block',
              }}
            />
          </Box>
        </Match>
      </Switch>
    </Box>
  );
}
