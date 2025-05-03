import { Print, PrintPaper } from '@/features/print/components';
import type { PaperLayout, Image } from '@/types/snap-proof-print';
import SnapProofPageContent from './SnapProofPrintPageContent';

interface SnapProofPrintProps {
  papers: Image[][];
  paperLayout: PaperLayout;
}

export default function SnapProofPrint({ papers, paperLayout }: SnapProofPrintProps) {
  return (
    <Print
      page={{
        marginLeft: '0.5cm',
        marginTop: '1cm',
        marginRight: '0.5cm',
        marginBottom: '1cm',
        size: `A4 ${paperLayout.orientation}`,
      }}
    >
      {papers.map((paperImages, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <PrintPaper key={index}>
          <SnapProofPageContent images={paperImages} paperLayout={paperLayout} />
        </PrintPaper>
      ))}
    </Print>
  );
}
