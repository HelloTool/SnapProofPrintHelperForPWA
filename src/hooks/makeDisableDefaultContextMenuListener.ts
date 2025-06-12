import { makeEventListener } from '@solid-primitives/event-listener';

export function makeDisableDefaultContextMenuListener(when?: (target: EventTarget) => boolean) {
  makeEventListener(
    document.documentElement,
    'contextmenu',
    (e) => {
      if (!e.target || when?.(e.target)) {
        e.preventDefault();
      }
    },
    { capture: true },
  );
}
