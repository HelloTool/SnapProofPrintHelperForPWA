export const maybeChrome = navigator.userAgent.indexOf('Chrome') !== -1;
export const maybeAndroid = navigator.userAgent.indexOf('Android') !== -1;

export function isServiceWorkerSupported() {
  return 'serviceWorker' in navigator;
}
