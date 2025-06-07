import { produce, type SetStoreFunction } from 'solid-js/store';
import type { ConfigStore } from '../stores/config';
import type { ImagesStore } from '../stores/images';
import type { SnapImage } from '../types/image';
import { chunkArray } from '@/utils/list';

export interface ImagesActions {
  addImages: (images: SnapImage[]) => void;
  updateChunkedImages: () => void;
  clearImages: () => void;
}
export function createImagesActions(setState: SetStoreFunction<ImagesStore>, config: ConfigStore): ImagesActions {
  function updateChunkedImages() {
    setState(
      produce((state) => {
        state.chunkedImages = chunkArray(state.images, config.layout.columns * config.layout.rows);
      }),
    );
  }
  return {
    addImages: (images: SnapImage[]) => {
      setState(
        produce((state) => {
          state.images.push(...images);
        }),
      );
      updateChunkedImages();
    },
    updateChunkedImages,
    clearImages: () => {
      setState(
        produce((state) => {
          state.images = [];
          state.chunkedImages = [];
        }),
      );
    },
  };
}
