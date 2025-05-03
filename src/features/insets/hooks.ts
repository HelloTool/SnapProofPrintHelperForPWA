import { useContext } from 'react';
import { InsetsContext } from './contexts';

export default function useInsets() {
  return useContext(InsetsContext);
}
