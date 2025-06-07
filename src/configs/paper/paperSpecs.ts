import type { DataType } from 'csstype';

export type PaperSpaces = {
  [key in DataType.PageSize]?: [sortSideCm: number, longSideCm: number];
};

export const paperSpecs: PaperSpaces = {
  A4: [21, 29.7],
  A5: [14.8, 21],
};
