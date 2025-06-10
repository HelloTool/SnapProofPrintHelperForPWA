import { type Accessor, createEffect, createSignal, on, type Signal } from 'solid-js';

interface Options<T> {
  pushWhen?: (value: T, upstreamValue: T) => boolean;
  pullWhen?: (upstreamValue: T, value: T) => boolean;
}
export function syncState<T>(
  upstreamValue: Accessor<T>,
  setUpstreamValue?: (value: Accessor<T>) => void,
  options?: Options<T>,
): Signal<T> {
  const { pushWhen = () => true, pullWhen = () => true } = options ?? {};
  const [value, setValue] = createSignal<T>(upstreamValue());

  createEffect(
    on(
      upstreamValue,
      (v) => {
        if (pullWhen(v, value())) {
          setValue(() => v);
        }
      },
      { defer: true },
    ),
  );

  if (setUpstreamValue) {
    createEffect(
      on(value, (v) => {
        if (pushWhen(v, upstreamValue())) {
          setUpstreamValue(() => v);
        }
      }),
    );
  }
  return [value, setValue];
}
