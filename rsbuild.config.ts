import { execSync } from 'node:child_process';
import { GenerateSW } from '@aaroon/workbox-rspack-plugin';
import { defineConfig, type RsbuildPlugin } from '@rsbuild/core';
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
    template: './src/index.html',
    title: '',
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
      plugins: [
        {
          name: 'web-manifest-plugin',
          setup(api) {
            api.processAssets({ stage: 'additional' }, async ({ sources, compilation }) => {
              const manifest = await import('./manifest.json');
              delete manifest.$schema;
              const localeManifest = (await import('./localizedManifest')).default;
              const mergedManifest = Object.assign(manifest, localeManifest);
              const source = new sources.RawSource(
                JSON.stringify(mergedManifest).replaceAll(
                  '<%= process.env.BASE_URL %>',
                  api.getRsbuildConfig('current').output.assetPrefix,
                ),
              );
              compilation.emitAsset('manifest.json', source);
            });
          },
        } satisfies RsbuildPlugin,
      ],
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
    },
  },
});
