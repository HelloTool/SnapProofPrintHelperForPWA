import { type Accessor, createEffect } from 'solid-js';

export function makeMeta(name: string, content: Accessor<string>) {
  let metaElement = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!metaElement) {
    metaElement = document.createElement('meta');
    metaElement.name = name;
    document.head.appendChild(metaElement);
  }
  // Meta 组件不稳定，所以需要手动更新
  createEffect(() => {
    metaElement.content = content();
  });
}
