import { useContext } from 'react';
import InsetsContext from '../contexts/InsetsContext';

export default function useInsets() {
  return useContext(InsetsContext);
}
