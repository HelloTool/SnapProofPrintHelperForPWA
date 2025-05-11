import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export default function usePrint() {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    function handleBeforePrint() {
      // 在打印时，确保状态更新同步到视图
      flushSync(() => {
        setIsPrinting(true);
      });
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
