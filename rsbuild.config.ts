import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  html: {
    title: '快照凭证打印助手',
    meta: {
      description: '快照凭证打印助手，将多个转账记录图、电商订单图等以凭证样式打印到纸中，并添加裁切线。',
      keywords: '快照凭证打印助手, 快照凭证打印, 快照凭证, 截图凭证, 截图打印',
    },
  },
  output: {
    polyfill: 'usage',
    minify: {
      js: true,
      jsOptions: {
        minimizerOptions: {
          compress: {
            passes: 4,
          },
        },
      },
      css: true,
    },
  },
  server: {
    port: process.env.NODE_ENV === 'development' ? 3000 : 8080,
  },
  tools: {
    rspack: {
      plugins: [
        TanStackRouterRspack({
          target: 'react',
          autoCodeSplitting: true,
          generatedRouteTree: './src/configs/router/route-tree.gen.ts',
        }),
      ],
    },
    swc: {
      jsc: {
        experimental: {
          plugins: [['@swc/plugin-emotion', {}]],
        },
      },
    },
  },
  source: {
    define: {
      IS_TAURI: false,
    },
  },
  performance: {
    removeConsole: ['log'],
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
      source: {
        define: {
          IS_TAURI: true,
        },
      },
    },
  },
});
