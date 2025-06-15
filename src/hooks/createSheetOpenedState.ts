import { type Accessor, createMemo, createRenderEffect, createSignal, on, onCleanup, type Setter } from 'solid-js';

const FORGET_PREVIOUS_TIMEOUT = 15 * 1000;

export function createSheetOpenState(isPersistent: Accessor<boolean>): [Accessor<boolean>, Setter<boolean>] {
  const [isPersistentOpened, setPersistentOpened] = createSignal(true);
  const [isTemporaryOpened, setTemporaryOpened] = createSignal(false);
  // 持久状态开启为默认，临时状态关闭为默认，所以持久状态下的关闭同步到临时状态，临时状态下的打开同步到持久状态。
  // 如果当前状态经过很长的时间，需要重置前一状态。
  createRenderEffect(
    on(
      isPersistent,
      (isPersistent) => {
        let timeoutId: number | undefined;
        if (isPersistent) {
          if (isTemporaryOpened()) {
            setPersistentOpened(true);
            timeoutId = window.setTimeout(() => {
              setTemporaryOpened(false);
            }, FORGET_PREVIOUS_TIMEOUT);
          }
        } else {
          if (!isPersistentOpened()) {
            setTemporaryOpened(false);
            timeoutId = window.setTimeout(() => {
              setPersistentOpened(true);
            }, FORGET_PREVIOUS_TIMEOUT);
          }
        }
        if (timeoutId) {
          onCleanup(() => {
            clearTimeout(timeoutId);
          });
        }
      },
      { defer: true },
    ),
  );

  const isOpened = createMemo(() => (isPersistent() ? isPersistentOpened() : isTemporaryOpened()));
  const setOpened: Setter<boolean> = (value) =>
    isPersistent() ? setPersistentOpened(value) : setTemporaryOpened(value);
  return [isOpened, setOpened];
}
