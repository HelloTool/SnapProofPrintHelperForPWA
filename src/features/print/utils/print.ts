interface OrientationBasedSize {
  width: number;
  height: number;
}
export function getOrientationBasedSize(
  size: [number, number],
  orientation: 'landscape' | 'portrait',
): OrientationBasedSize {
  const isPortrait = orientation === 'portrait';
  const width = (isPortrait ? Math.min : Math.max)(...size);
  const height = (isPortrait ? Math.max : Math.min)(...size);
  return { width, height };
}
