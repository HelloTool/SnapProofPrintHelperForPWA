import { atom } from 'jotai';
import { itemsCountPerPageAtom } from '@/atoms/snapProofPrint';
import { chunkArray } from '@/utils/list';

export interface BaseImage {
  key: string;
  name: string;
  status: 'loading' | 'loaded' | 'error';
}

export interface LoadedImage extends BaseImage {
  url: string;
  status: 'loaded';
}
export interface ErrorImage extends BaseImage {
  status: 'error';
  reason: string;
}

export interface LoadingImage extends BaseImage {
  status: 'loading';
}

export type Image = LoadedImage | ErrorImage | LoadingImage;

export const imagesAtom = atom<Image[]>([]);

export const isImagesAddedAtom = atom<boolean>((get) => get(imagesAtom).length > 0);

export const paperImagesAtom = atom((get) => chunkArray(get(imagesAtom), get(itemsCountPerPageAtom)));
