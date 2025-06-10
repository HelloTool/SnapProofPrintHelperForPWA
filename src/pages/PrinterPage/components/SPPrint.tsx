import { Index } from 'solid-js';
import Print from '@/features/print/components/Print';
import PrintPaper from '@/features/print/components/PrintPaper';
import { useConfig } from '../contexts/ConfigContext';
import useImages from '../contexts/ImagesContext';
import SnapProofPageContent from './SPPrintPageContent';

export default function SPPrint() {
  const { state: config } = useConfig();
  const { state: images } = useImages();
  return (
    <Print
      paperOrientation={config.print.orientation}
      paperSize={config.print.size}
      contentAspectRatioFixed={config.print.aspectRatioFixed}
      contentMarginLeft={config.print.contentMarginLeft}
      contentMarginTop={config.print.contentMarginTop}
      contentMarginRight={config.print.contentMarginRight}
      contentMarginBottom={config.print.contentMarginBottom}
    >
      <Index each={images.chunkedImages}>
        {(images) => (
          <PrintPaper>
            <SnapProofPageContent images={images()} columns={config.layout.columns} rows={config.layout.rows} />
          </PrintPaper>
        )}
      </Index>
    </Print>
  );
}
