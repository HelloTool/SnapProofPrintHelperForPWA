import { produce, type SetStoreFunction } from 'solid-js/store';
import { chunkArray } from '@/utils/list';
import type { ConfigStore } from '../stores/config';
import type { ImagesStore } from '../stores/images';
import type { SnapImage } from '../types/image';

export interface ImagesActions {
  addImages: (images: SnapImage[]) => void;
  updateImages: (images: SnapImage[]) => void;
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
    updateImages: (images) => {
      setState(
        produce((state) => {
          for (const newImage of images) {
            const index = state.images.findIndex((image) => image.key === newImage.key);
            if (index >= 0) {
              state.images[index] = newImage;
            }
          }
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
