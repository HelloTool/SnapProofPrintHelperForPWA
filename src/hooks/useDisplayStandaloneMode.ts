import { useMediaQuery } from '@suid/material';

export function useDisplayStandaloneMode() {
  return useMediaQuery('(display-mode: standalone)');
}
