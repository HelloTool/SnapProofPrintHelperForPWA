import { makeEventListener } from '@solid-primitives/event-listener';

const ALLOW_INPUT_TYPES = new Set();
ALLOW_INPUT_TYPES.add('email');
ALLOW_INPUT_TYPES.add('text');
ALLOW_INPUT_TYPES.add('password');
ALLOW_INPUT_TYPES.add('number');
ALLOW_INPUT_TYPES.add('tel');
ALLOW_INPUT_TYPES.add('url');
ALLOW_INPUT_TYPES.add('search');
const DEFAULT_WHEN = (target: EventTarget): boolean => {
  if (target instanceof HTMLInputElement && ALLOW_INPUT_TYPES.has(target.type)) {
    return false;
  }
  return true;
};
export function makeDisableDefaultContextMenuListener(when: (target: EventTarget) => boolean = DEFAULT_WHEN) {
  makeEventListener(
    document.documentElement,
    'contextmenu',
    (e) => {
      if (!e.target || when(e.target)) {
        e.preventDefault();
      }
    },
    { capture: true },
  );
}
