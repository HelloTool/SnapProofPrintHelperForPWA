import './styles/index.scss';
import { render } from 'solid-js/web';
import { App } from './App';

document.documentElement.lang = 'zh-CN';

if (IS_TAURI) {
  document.documentElement.classList.add('tauri');
  import('@tauri-apps/api/window')
    .then(async ({ getCurrentWindow }) => {
      await getCurrentWindow().show();
    })
    .catch((e) => {
      console.error(e);
    });
}

const root = document.getElementById('root');
if (root) {
  render(() => <App />, root);
}
