import { createContext, type JSX, useContext } from 'solid-js';
import { createConfigStore, type ConfigStore } from '../stores/config';
import { ConfigActions, createConfigActions } from '../actions/config';

const ConfigContext = createContext<{ state: ConfigStore; actions: ConfigActions }>();

interface ConfigProviderProps {
  children: JSX.Element;
}

export function ConfigProvider(props: ConfigProviderProps) {
  const [state, setState] = createConfigStore();
  const actions = createConfigActions(setState);

  return <ConfigContext.Provider value={{ state, actions }}>{props.children}</ConfigContext.Provider>;
}
export function useConfig() {
  const value = useContext(ConfigContext);
  if (!value) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return value;
}
