import { useContext } from 'react';
import PrintPreviewPaperConfigContext from '../contexts/PrintPreviewPaperConfigContext';

export default function usePrintPreviewPaperConfigContext() {
  return useContext(PrintPreviewPaperConfigContext);
}
