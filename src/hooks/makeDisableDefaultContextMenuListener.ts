import { makeEventListener } from '@solid-primitives/event-listener';

export function makeDisableDefaultContextMenuListener() {
  makeEventListener(
    document.documentElement,
    'contextmenu',
    (e) => {
      e.preventDefault();
    },
    { capture: true },
  );
}
