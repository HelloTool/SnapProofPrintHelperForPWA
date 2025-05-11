import { createContext } from 'react';
import type { Insets } from '../types';

const InsetsContext = createContext<Insets>({ left: 0, top: 0, right: 0, bottom: 0 });
export default InsetsContext;
