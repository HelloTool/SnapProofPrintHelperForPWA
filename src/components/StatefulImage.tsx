import { mergeMulitSxProps } from '@/utils/suid';
import { Box, CircularProgress, type Theme } from '@suid/material';
import type BoxProps from '@suid/material/Box/BoxProps';
import type { SxProps } from '@suid/system';
import { createSignal, Match, Switch } from 'solid-js';
import WarningAmberOutlinedIcon from '@suid/icons-material/WarningAmberOutlined';

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
  const [state, setState] = createSignal<ImageState>('loading');
  let imgRef: HTMLImageElement | undefined;
  function handleLoad(event: Event) {
    setState('loaded');
    props.onLoad?.(event);
  }
  function handleError(event: ErrorEvent) {
    setState('error');
    props.onError?.(event);
  }
  return (
    <Box
      sx={mergeMulitSxProps(
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            display: state() === 'loaded' ? 'block' : 'none',
            width: '100%',
            height: '100%',
          },
          props.imgProps?.sx,
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
      <Switch>
        <Match when={state() === 'loading'}>
          <CircularProgress />
        </Match>
        <Match when={state() === 'error'}>
          <WarningAmberOutlinedIcon />
        </Match>
      </Switch>
    </Box>
  );
}
