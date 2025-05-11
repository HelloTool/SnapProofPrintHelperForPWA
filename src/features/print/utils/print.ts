interface SizeBasedOnOrientation {
  width: number;
  height: number;
}
export function getSizeBasedOnOrientation(
  size: [number, number],
  orientation: 'landscape' | 'portrait',
): SizeBasedOnOrientation {
  const isPortrait = orientation === 'portrait';
  const width = (isPortrait ? Math.min : Math.max)(...size);
  const height = (isPortrait ? Math.max : Math.min)(...size);
  return { width, height };
}
