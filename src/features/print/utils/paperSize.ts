import type { DataType } from 'csstype';

export function pageSizeNameToCm(pageSize: DataType.PageSize): [number, number] {
  switch (pageSize) {
    case 'A3':
      return [29.7, 42.0];
    case 'A4':
      return [21.0, 29.7];
    case 'A5':
      return [14.8, 21.0];
    case 'B4':
      return [25.0, 35.3];
    case 'B5':
      return [17.6, 25.0];
    case 'letter':
      return [21.59, 27.94];
    case 'legal':
      return [21.59, 35.56];
    default:
      throw new Error(`Unknown page size: ${pageSize}`);
  }
}

export function getAvailablePageSizes(): DataType.PageSize[] {
  return ['A3', 'A4', 'A5', 'B4', 'B5', 'letter', 'legal'];
}
