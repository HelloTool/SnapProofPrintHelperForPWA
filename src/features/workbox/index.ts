import { createSignal } from 'solid-js';
import type { Workbox } from 'workbox-window';

const [isServiceWorkerWaiting, setIsServiceWorkerWaiting] = createSignal(false);
export { isServiceWorkerWaiting };

let workbox: Workbox | undefined;

export function registerServiceWorker() {
  import('workbox-window')
    .then(async ({ Workbox }) => {
      workbox = new Workbox(`${import.meta.env.BASE_URL}service-worker.js`);
      workbox.register().catch(console.error);
      workbox.addEventListener('waiting', () => {
        setIsServiceWorkerWaiting(true);
        workbox?.addEventListener('controlling', () => {
          window.location.reload();
        });
      });
    })
    .catch(console.error);
}
export function getWorkBox() {
  return workbox;
}
