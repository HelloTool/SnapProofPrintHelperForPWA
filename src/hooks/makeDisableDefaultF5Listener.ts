import { makeEventListener } from '@solid-primitives/event-listener';

export function makeDisableDefaultF5Listener() {
  makeEventListener(
    document.documentElement,
    'keydown',
    (e) => {
      if (e.key === 'F5') {
        e.preventDefault();
      }
    },
    { capture: true },
  );
}
