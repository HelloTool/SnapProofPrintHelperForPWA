import type { Manifest } from '../base/manifest.types';
import app from './app.json';

export default {
  lang: 'en',
  name: app.appName,
  short_name: app.appShortName,
  description: app.appDescription,
} satisfies Manifest;
