import { createContext, type JSX, splitProps, useContext } from 'solid-js';

export interface PrintPreviewPaperConfig {
  paperAspectRatio: number;
  paperPaddingLeftPercent: number;
  paperPaddingTopPercent: number;
  paperPaddingRightPercent: number;
  paperPaddingBottomPercent: number;
  colorMode: 'colorful' | 'gray';
}

const PrintPreviewPaperConfigContext = createContext<PrintPreviewPaperConfig>();

interface PrintPreviewPaperConfigProviderProps {
  children: JSX.Element;
  paperAspectRatio: number;
  paperPaddingLeftPercent: number;
  paperPaddingTopPercent: number;
  paperPaddingRightPercent: number;
  paperPaddingBottomPercent: number;
  colorMode: 'colorful' | 'gray';
}

export function PrintPreviewPaperConfigProvider(props: PrintPreviewPaperConfigProviderProps) {
  const [value] = splitProps(props, [
    'paperAspectRatio',
    'paperPaddingLeftPercent',
    'paperPaddingTopPercent',
    'paperPaddingRightPercent',
    'paperPaddingBottomPercent',
    'colorMode',
  ]);

  return (
    <PrintPreviewPaperConfigContext.Provider value={value}>{props.children}</PrintPreviewPaperConfigContext.Provider>
  );
}

export function usePrintPreviewPaperConfig(): PrintPreviewPaperConfig {
  const paperConfig = useContext(PrintPreviewPaperConfigContext);
  if (!paperConfig) {
    throw new Error('PrintPreviewPaper must be used within a PrintPreview');
  }
  return paperConfig;
}
