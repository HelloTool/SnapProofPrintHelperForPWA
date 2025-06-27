import { type Accessor, createEffect, onCleanup } from 'solid-js';

export function makeMeta(name: string, content: Accessor<string>) {
  let metaElement: HTMLMetaElement | undefined = document.createElement('meta');
  metaElement.name = name;
  document.head.appendChild(metaElement);
  onCleanup(() => {
    if (!metaElement) return;
    document.head.removeChild(metaElement);
    metaElement = undefined;
  });
  // Meta 组件不稳定，所以需要手动更新
  createEffect(() => {
    if (!metaElement) return;
    metaElement.content = content();
  });
}
