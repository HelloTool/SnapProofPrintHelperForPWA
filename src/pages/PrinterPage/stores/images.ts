import { createStore } from 'solid-js/store';
import { chunkArray } from '@/utils/list';
import type { SnapImage } from '../types/image';
import type { ConfigStore } from './config';

export interface ImagesStore {
  images: SnapImage[];
  chunkedImages: SnapImage[][];
}
export function createImagesStore(config: ConfigStore) {
  return createStore<ImagesStore>({
    images: [],
    get chunkedImages(): SnapImage[][] {
      return chunkArray(this.images, config.layout.columns * config.layout.rows);
    },
  });
}
