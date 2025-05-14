import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  html: {
    template: './src/index.browser.html',
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
    publicDir: false,
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
    browser: {
      output: {
        distPath: {
          root: 'dist/browser',
        },
        copy: [{ from: './public', to: '.' }],
      },
    },
    tauri: {
      output: {
        distPath: {
          root: 'dist/tauri',
        },
        copy: [],
      },
      source: {
        define: {
          IS_TAURI: true,
        },
      },
      html: {
        template: './src/index.tauri.html',
        title: '',
      },
    },
  },
});
