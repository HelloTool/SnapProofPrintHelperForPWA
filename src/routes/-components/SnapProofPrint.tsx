import Print from '@/features/print/components/Print';
import SnapProofPageContent from './SnapProofPrintPageContent';
import { useAtom } from 'jotai';
import { printConfigAtom, paperImagesAtom } from '@/atoms/snapProofPrint';
import PrintPaper from '@/features/print/components/PrintPaper';

export default function SnapProofPrint() {
  const [
    {
      contentMarginLeftCm,
      contentMarginTopCm,
      contentMarginRightCm,
      contentMarginBottomCm,
      orientation,
      size,
      aspectRatioFixed,
    },
  ] = useAtom(printConfigAtom);
  const [paperImages] = useAtom(paperImagesAtom);
  return (
    <Print
      paperSizeCm={typeof size !== 'string' ? size : [21, 29.7]}
      paperSizeName={typeof size === 'string' ? size : undefined}
      paperOrientation={orientation}
      contentMarginLeftCm={contentMarginLeftCm}
      contentMarginTopCm={contentMarginTopCm}
      contentMarginRightCm={contentMarginRightCm}
      contentMarginBottomCm={contentMarginBottomCm}
      contentAspectRatioFixed={aspectRatioFixed}
    >
      {paperImages.map((images, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <PrintPaper key={index}>
          <SnapProofPageContent images={images} />
        </PrintPaper>
      ))}
    </Print>
  );
}
