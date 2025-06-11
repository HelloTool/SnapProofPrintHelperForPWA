import { useMediaQuery } from '@suid/material';

export function usePreferredDarkMode() {
  return useMediaQuery('(prefers-color-scheme: dark)');
}
