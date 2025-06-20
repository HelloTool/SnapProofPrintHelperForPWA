import { execSync } from 'node:child_process';
import { GenerateSW } from '@aaroon/workbox-rspack-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSolid } from '@rsbuild/plugin-solid';

const GIT_REFERENCE =
  process.env.NODE_ENV === 'development'
    ? 'main'
    : (() => {
        try {
          return execSync('git describe --tags --exact-match HEAD').toString().trim();
        } catch (_e) {
          console.warn('Failed to get git tags, using commit hash instead');
          try {
            return execSync('git rev-parse HEAD').toString().trim();
          } catch (_e) {
            console.warn('Failed to get git commit hash');
            return 'main';
          }
        }
      })();

export default defineConfig({
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginSolid(),
    pluginSass(),
  ],
  html: {
    template: './src/index.browser.html',
  },
  output: {
    polyfill: 'usage',
    minify: {
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
  tools: {},
  source: {
    define: {
      IS_TAURI: false,
      CONFIG_ENABLE_PWA: true,
      'import.meta.env.GIT_REFERENCE': JSON.stringify(GIT_REFERENCE),
      'import.meta.env.APP_VERSION': JSON.stringify(process.env.npm_package_version),
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
      tools: {
        rspack: {
          plugins: [
            ...(process.env.NODE_ENV === 'development'
              ? []
              : [
                  new GenerateSW({
                    cacheId: 'snap-proof-print-helper',
                    cleanupOutdatedCaches: true,
                  }),
                ]),
          ],
        },
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
          CONFIG_ENABLE_PWA: false,
        },
      },
      html: {
        template: './src/index.tauri.html',
        title: '',
      },
    },
  },
});
