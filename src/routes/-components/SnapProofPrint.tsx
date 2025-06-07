import { useAtom } from 'jotai';
import { paperImagesAtom, printConfigAtom } from '@/atoms/snapProofPrint';
import Print from '@/features/print/components/Print';
import PrintPaper from '@/features/print/components/PrintPaper';
import SnapProofPageContent from './SnapProofPrintPageContent';

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
      contentAspectRatioFixed={aspectRatioFixed}
      contentMarginBottomCm={contentMarginBottomCm}
      contentMarginLeftCm={contentMarginLeftCm}
      contentMarginRightCm={contentMarginRightCm}
      contentMarginTopCm={contentMarginTopCm}
      paperOrientation={orientation}
      paperSizeCm={typeof size !== 'string' ? size : [21, 29.7]}
      paperSizeName={typeof size === 'string' ? size : undefined}
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
