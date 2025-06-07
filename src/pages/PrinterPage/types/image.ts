export interface BaseSnapImage {
  key: string;
  name: string;
  status: 'loading' | 'loaded' | 'error';
}

export interface LoadedSnapImage extends BaseSnapImage {
  url: string;
  status: 'loaded';
}
export interface ErrorSnapImage extends BaseSnapImage {
  status: 'error';
  reason: string;
}

export interface LoadingSnapImage extends BaseSnapImage {
  status: 'loading';
}

export type SnapImage = LoadedSnapImage | ErrorSnapImage | LoadingSnapImage;
