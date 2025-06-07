import { createStore } from 'solid-js/store';
import type { SnapImage } from '../types/image';

export interface ImagesStore {
  images: SnapImage[];
  chunkedImages: SnapImage[][];
}
export function createImagesStore() {
  return createStore<ImagesStore>({
    images: [],
    chunkedImages: [],
  });
}
