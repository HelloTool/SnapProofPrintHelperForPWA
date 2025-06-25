import { glob } from 'node:fs/promises';
import path from 'node:path';
import zhCNManifest from './src/locales/zh-CN/manifest';

const manifestsGlob = glob(path.join(import.meta.dirname, './src/locales/*/manifest.*'), {});
const excludedManifest = zhCNManifest;

const manifests = [];
for await (const manifestPath of manifestsGlob) {
  const manifest = (await import(manifestPath)).default;
  if (manifest !== excludedManifest) {
    manifests.push((await import(manifestPath)).default);
  }
}

function makeLocalizedManifest(...manifests: Record<string, unknown>[]): Record<string, unknown> {
  const localizedManifest: Record<string, Record<string, unknown>> = {};
  for (const manifest of manifests) {
    for (const key in manifest) {
      if (key === 'lang') {
        continue;
      }
      const languageMap = localizedManifest[`${key}_localized`] ?? {};
      if (manifest[key] !== undefined) {
        languageMap[manifest.lang as string] = manifest[key];
      }
      localizedManifest[`${key}_localized`] = languageMap;
    }
  }
  return localizedManifest;
}

export default {
  ...zhCNManifest,
  ...makeLocalizedManifest(...manifests),
};
