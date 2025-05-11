import type { DataType } from 'csstype';

export type PaperSpaces = {
  [key in DataType.PageSize]?: [number, number];
};
