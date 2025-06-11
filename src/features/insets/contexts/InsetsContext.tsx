import { createContext, type JSX, useContext } from 'solid-js';

export interface Insets {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

const InsetsContext = createContext<Insets>({
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
});

interface InsetsProviderProps {
  children: JSX.Element;
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

export function InsetsProvider(props: InsetsProviderProps) {
  const insets = useInsets();
  const value = {
    get left() {
      return props.left ?? insets.left;
    },
    get top() {
      return props.top ?? insets.top;
    },
    get right() {
      return props.right ?? insets.right;
    },
    get bottom() {
      return props.bottom ?? insets.bottom;
    },
  };
  return <InsetsContext.Provider value={value}>{props.children}</InsetsContext.Provider>;
}

export function useInsets() {
  return useContext(InsetsContext);
}
