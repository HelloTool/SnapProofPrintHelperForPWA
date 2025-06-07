import './styles/index.scss';
import { render } from 'solid-js/web';
import { App } from './App';

if (IS_TAURI) {
  document.documentElement.classList.add('tauri');
}
document.documentElement.lang = 'zh-CN';

const root = document.getElementById('root');
if (root) {
  render(() => <App />, root);
}
