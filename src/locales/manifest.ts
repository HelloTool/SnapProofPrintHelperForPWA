import enManifest from './en/manifest';
import zhCNManifest from './zh-CN/manifest';

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
  ...makeLocalizedManifest(enManifest),
};
