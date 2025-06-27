import type { DataType } from 'csstype';

export function pageSizeNameToCm(pageSize: DataType.PageSize): [number, number] {
  switch (pageSize) {
    case 'A3':
      return [42.0, 29.7];
    case 'A4':
      return [29.7, 21.0];
    case 'A5':
      return [21.0, 14.8];
    case 'B4':
      return [35.3, 25.0];
    case 'B5':
      return [25.0, 17.6];
    case 'letter':
      return [27.94, 21.59];
    case 'legal':
      return [35.56, 21.59];
    default:
      throw new Error(`Unknown page size: ${pageSize}`);
  }
}

export function getAvailablePageSizes(): DataType.PageSize[] {
  return ['A3', 'A4', 'A5', 'B4', 'B5', 'letter', 'legal'];
}
