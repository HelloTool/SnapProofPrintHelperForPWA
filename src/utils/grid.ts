export function isItemColumnStart(index: number, columns: number) {
  return index % columns === 0;
}

export function isItemRowStart(index: number, columns: number) {
  return index + 1 <= columns;
}
