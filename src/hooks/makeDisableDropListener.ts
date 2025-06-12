import { makeEventListener } from '@solid-primitives/event-listener';

export function makeDisableDropListener() {
  makeEventListener(
    document.documentElement,
    'dragover',
    (e) => {
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'none';
      }
    },
    {
      capture: true,
    },
  );
  makeEventListener(document.documentElement, 'drop', (e) => {
    e.preventDefault();
  });
}
