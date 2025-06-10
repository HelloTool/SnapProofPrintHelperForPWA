import { createContext, createEffect, type JSX, useContext } from 'solid-js';
import { createImagesActions, type ImagesActions } from '../actions/images';
import { createImagesStore, type ImagesStore } from '../stores/images';
import { useConfig } from './ConfigContext';

const ImagesContext = createContext<{ state: ImagesStore; actions: ImagesActions }>();

interface ImagesProviderProps {
  children: JSX.Element;
}

export function ImagesProvider(props: ImagesProviderProps) {
  const { state: config } = useConfig();
  const [state, setState] = createImagesStore();
  const actions = createImagesActions(setState, config);

  createEffect(() => {
    config.layout.columns;
    config.layout.rows;
    actions.updateChunkedImages();
  });

  return <ImagesContext.Provider value={{ state, actions }}>{props.children}</ImagesContext.Provider>;
}

export default function useImages() {
  const value = useContext(ImagesContext);
  if (!value) {
    throw new Error('useImages must be used within an ImagesProvider');
  }
  return value;
}
