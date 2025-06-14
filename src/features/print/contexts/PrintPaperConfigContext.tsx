import { createContext, type JSX, splitProps, useContext } from 'solid-js';

export interface PrintPaperConfig {
  contentAspectRatio: number;
}

const PrintPaperConfigContext = createContext<PrintPaperConfig>();

interface PrintPaperConfigProviderProps {
  children: JSX.Element;
  contentAspectRatio: number;
}
export function PrintPaperConfigProvider(props: PrintPaperConfigProviderProps) {
  const [value] = splitProps(props, ['contentAspectRatio']);
  return <PrintPaperConfigContext.Provider value={value}>{props.children}</PrintPaperConfigContext.Provider>;
}

export function usePrintPaperConfig(): PrintPaperConfig {
  const paperConfig = useContext(PrintPaperConfigContext);
  if (!paperConfig) {
    throw new Error('PrintPaper must be used within a Print');
  }
  return paperConfig;
}
