import './styles/index.scss';
import { render } from 'solid-js/web';
import { App } from './App';

document.documentElement.lang = 'zh-CN';

if (IS_TAURI) {
  document.documentElement.classList.add('tauri');
  import('@tauri-apps/api/window')
    .then(async ({ getCurrentWindow }) => {
      const currentWindow = getCurrentWindow();
      currentWindow.setTitle('快照凭证打印助手').catch(console.error);
      currentWindow.show().catch(console.error);
    })
    .catch(console.error);
}

const root = document.getElementById('root');
if (root) {
  render(() => <App />, root);
}
