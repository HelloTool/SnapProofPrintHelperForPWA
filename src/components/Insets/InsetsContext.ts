import { createContext, useContext } from 'react';

export interface Insets {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export const InsetsContext = createContext<Insets>({ left: 0, top: 0, right: 0, bottom: 0 });

export function useInsets() {
  return useContext(InsetsContext);
}
