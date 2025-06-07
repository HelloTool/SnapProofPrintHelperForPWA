import { createContext, type JSX, splitProps, useContext } from 'solid-js';

export interface PrintPaperConfig {
  contentAspectRatioFixed: boolean;
  contentAspectRatio: number;
}

const PrintPaperConfigContext = createContext<PrintPaperConfig>();

interface PrintPaperConfigProviderProps {
  children: JSX.Element;
  contentAspectRatioFixed: boolean;
  contentAspectRatio: number;
}
export function PrintPaperConfigProvider(props: PrintPaperConfigProviderProps) {
  const [value] = splitProps(props, ['contentAspectRatioFixed', 'contentAspectRatio']);
  return <PrintPaperConfigContext.Provider value={value}>{props.children}</PrintPaperConfigContext.Provider>;
}

export function usePrintPaperConfig(): PrintPaperConfig {
  const paperConfig = useContext(PrintPaperConfigContext);
  if (!paperConfig) {
    throw new Error('PrintPaper must be used within a Print');
  }
  return paperConfig;
}
