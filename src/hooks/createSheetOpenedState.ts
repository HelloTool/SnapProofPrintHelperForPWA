import { type Accessor, createMemo, createRenderEffect, createSignal, on, onCleanup, type Setter } from 'solid-js';

const FORGET_PREVIOUS_TIMEOUT = 15 * 1000;
const DEFAULT_PERSISTENT_OPENED = true;
const DEFAULT_TEMPORARY_OPENED = false;

/**
 * 创建边栏开启状态
 *
 * 边栏开开启状态分为持久状态和临时状态。如果 {@linkcode isPersistent} 为 true，则使用持久状态，否则使用临时状态。
 *
 * 持久状态默认为 true，临时状态默认为 false。如果持久状态变为 false，则重置临时状态到 false；如果临时状态变为 true，则重置持久状态到 true。
 *
 * 当前状态持续超过 {@linkcode FORGET_PREVIOUS_TIMEOUT}ms 后，自动重置另一状态
 *
 * @param isPersistent 访问器函数，返回当前应使用的状态类型
 * @returns [状态, 状态更新函数]
 */
export function createSheetOpenState(isPersistent: Accessor<boolean>): [Accessor<boolean>, Setter<boolean>] {
  const [isPersistentOpened, setPersistentOpened] = createSignal(DEFAULT_PERSISTENT_OPENED);
  const [isTemporaryOpened, setTemporaryOpened] = createSignal(DEFAULT_TEMPORARY_OPENED);
  createRenderEffect(
    on(
      isPersistent,
      (isPersistent, isPrevPersistent) => {
        let timeoutId: number | undefined;
        const isPrevStateOpened = isPrevPersistent ? isPersistentOpened : isTemporaryOpened;
        const setPrevStateOpened = isPrevPersistent ? setPersistentOpened : setTemporaryOpened;
        const prevDefaultStateOpened = isPrevPersistent ? DEFAULT_PERSISTENT_OPENED : DEFAULT_TEMPORARY_OPENED;

        const isNowStateOpened = isPersistent ? isPersistentOpened : isTemporaryOpened;
        const setNowStateOpened = isPersistent ? setPersistentOpened : setTemporaryOpened;
        const nowDefaultStateOpened = isPersistent ? DEFAULT_PERSISTENT_OPENED : DEFAULT_TEMPORARY_OPENED;

        if (isPrevStateOpened() === nowDefaultStateOpened && isNowStateOpened() !== nowDefaultStateOpened) {
          setNowStateOpened(nowDefaultStateOpened);
        }
        if (isPrevStateOpened() !== prevDefaultStateOpened) {
          timeoutId = window.setTimeout(() => {
            setPrevStateOpened(prevDefaultStateOpened);
          }, FORGET_PREVIOUS_TIMEOUT);
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
