import type { DataType } from 'csstype';

export function pageSizeNameToCm(pageSize: DataType.PageSize): [number, number] {
  switch (pageSize) {
    case 'A4':
      return [21.0, 29.7];
    case 'A3':
      return [29.7, 42.0];
    case 'letter':
      return [21.59, 27.94];
    case 'legal':
      return [21.59, 35.56];
    default:
      throw new Error(`Unknown page size: ${pageSize}`);
  }
}
