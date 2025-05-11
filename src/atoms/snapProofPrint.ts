import type {
  SnapProofPaperLayout,
  SnapImage,
  SnapProofPrintConfig,
  SnapProofPrintPreviewConfig,
} from '@/types/snapProofPrint';
import { chunkArray } from '@/utils/list';
import { maybeChrome } from '@/utils/platform';
import { atom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';

export const paperLayoutAtom = atomWithImmer<SnapProofPaperLayout>({
  columns: 3,
  rows: 1,
});

export const printConfigAtom = atomWithImmer<SnapProofPrintConfig>({
  contentMarginLeftCm: 0.5,
  contentMarginTopCm: 1,
  contentMarginRightCm: 0.5,
  contentMarginBottomCm: 1,
  orientation: 'landscape',
  size: 'A4',
  aspectRatioFixed: !maybeChrome,
});

export const printPreviewConfigAtom = atomWithImmer<SnapProofPrintPreviewConfig>({
  colorMode: 'colorful',
});

export const itemsCountPerPageAtom = atom<number>((get) => get(paperLayoutAtom).columns * get(paperLayoutAtom).rows);

export const imagesAtom = atomWithImmer<SnapImage[]>([]);

export const isImagesAddedAtom = atom<boolean>((get) => get(imagesAtom).length > 0);

export const paperImagesAtom = atom((get) => chunkArray(get(imagesAtom), get(itemsCountPerPageAtom)));
