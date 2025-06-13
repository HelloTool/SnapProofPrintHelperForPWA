import type { SxProps } from '@suid/system';

export function mergeMultiSxProps<T>(...multiSxProps: (SxProps<T> | undefined)[]): SxProps<T> {
  return multiSxProps.flat().filter((sx) => sx !== undefined);
}
