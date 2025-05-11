import { RouterProvider, createRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';

import { routeTree } from './configs/router/route-tree.gen';

if (IS_TAURI) {
  document.documentElement.classList.add('tauri');
}
document.documentElement.lang = 'zh-CN';

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
    </React.StrictMode>,
  );
}
