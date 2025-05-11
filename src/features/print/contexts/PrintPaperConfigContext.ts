import { createContext } from 'react';
import type { PrintPaperConfig } from '../types';

const PrintPaperConfigContext = createContext<PrintPaperConfig | undefined>(undefined);

export default PrintPaperConfigContext;
