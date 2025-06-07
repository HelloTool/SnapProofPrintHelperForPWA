import type { SxProps } from '@suid/system';

export function mergeMulitSxProps<T>(...multiSxProps: (SxProps<T> | undefined)[]): SxProps<T> {
  return multiSxProps.flat().filter((sx) => sx !== undefined);
}
