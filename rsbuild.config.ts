import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
  plugins: [pluginReact(),pluginSass()],
  html: {
    title: '快照凭证打印助手',
    meta: {
      description:
        '快照凭证打印助手，将多个转账记录图、电商订单图等以凭证样式打印到纸中，并添加裁切线。',
    },
  },
  server: {
    port: process.env.NODE_ENV === 'development' ? 3000 : 8080,
  },
  tools: {
    rspack: {
      plugins: [
        TanStackRouterRspack({ target: 'react', autoCodeSplitting: true }),
      ],
    },
  },
  environments: {
    web: {
      output: {
        assetPrefix: '/',
        distPath: {
          root: 'dist/web',
        },
      },
    },
    ghPages: {
      output: {
        assetPrefix: '/SnapProofPrintHelperForTauri/',
        distPath: {
          root: 'dist/gh-pages',
        },
      },
    },
    tauri: {
      output: {
        assetPrefix: '/',
        distPath: {
          root: 'dist/tauri',
        },
      },
    },
  },
});
