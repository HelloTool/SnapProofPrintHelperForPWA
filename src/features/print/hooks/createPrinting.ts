import { createEffect, createSignal } from 'solid-js';

export default function createPrinting() {
  const [isPrinting, setIsPrinting] = createSignal(false);

  createEffect(() => {
    function handleBeforePrint() {
      // 在打印时，确保状态更新同步到视图

      setIsPrinting(true);
    }
    function handleAfterPrint() {
      setIsPrinting(false);
    }

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  return isPrinting;
}
