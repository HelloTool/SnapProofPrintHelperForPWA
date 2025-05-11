import { createContext } from 'react';
import type { PrintPreviewPaperConfig } from '../types';

const PrintPreviewPaperConfigContext = createContext<PrintPreviewPaperConfig | undefined>(undefined);

export default PrintPreviewPaperConfigContext;
