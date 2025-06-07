import Print from '@/features/print/components/Print';
import PrintPaper from '@/features/print/components/PrintPaper';
import type { SnapImage } from '../types/image';
import SnapProofPageContent from './SPPrintPageContent';
import { Index, splitProps } from 'solid-js';
import { useConfig } from '../contexts/ConfigContext';
import useImages from '../contexts/ImagesContext';

export default function SPPrint() {
  const { state: config } = useConfig();
  const { state: images } = useImages();
  return (
    <Print>
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
