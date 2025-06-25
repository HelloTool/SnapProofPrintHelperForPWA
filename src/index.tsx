import './styles/index.scss';
import { render } from 'solid-js/web';
import { App } from './App';
import { registerServiceWorker } from './features/workbox';
import { isServiceWorkerSupported } from './utils/platform';

document.documentElement.lang = 'zh-CN';

if (IS_TAURI) {
  document.documentElement.classList.add('tauri');
  import('@tauri-apps/api/window').then(({ getCurrentWindow }) => getCurrentWindow().show()).catch(console.error);
}

if (CONFIG_ENABLE_PWA && import.meta.env.PROD && isServiceWorkerSupported()) {
  registerServiceWorker();
}

const root = document.getElementById('root');
if (root) {
  render(() => <App />, root);
}
