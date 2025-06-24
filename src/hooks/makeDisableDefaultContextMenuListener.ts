import { makeEventListener } from '@solid-primitives/event-listener';

const DEFAULT_WHEN = (target: EventTarget): boolean => {
  if (
    target instanceof HTMLInputElement &&
    (target.type === 'email' ||
      target.type === 'text' ||
      target.type === 'password' ||
      target.type === 'number' ||
      target.type === 'tel' ||
      target.type === 'url' ||
      target.type === 'search')
  ) {
    return false;
  }
  return true;
};
export function makeDisableDefaultContextMenuListener(when: (target: EventTarget) => boolean = DEFAULT_WHEN) {
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
