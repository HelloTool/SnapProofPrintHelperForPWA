export interface PaperLayout {
  columns: number;
  rows: number;
  orientation: 'landscape' | 'portrait';
}

export interface Image {
  key: string;
  url: string;
  name: string;
}
