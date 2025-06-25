import type { NullableTranslator } from '@solid-primitives/i18n';
import { type Accessor, createContext, type JSX, useContext } from 'solid-js';
import type { GlobalDictionary, Locale } from '@/locales';

const GlobalLocaleConfigContext = createContext<{
  locale: Accessor<Locale>;
  translator: NullableTranslator<GlobalDictionary>;
}>();

interface GlobalLocaleConfigProviderProps {
  children: JSX.Element;
  locale: Locale;
  translator: NullableTranslator<GlobalDictionary>;
}
export function GlobalLocaleConfigProvider(props: GlobalLocaleConfigProviderProps) {
  return (
    <GlobalLocaleConfigContext.Provider
      value={{
        locale: () => props.locale,
        translator: props.translator,
      }}
    >
      {props.children}
    </GlobalLocaleConfigContext.Provider>
  );
}

export function useGlobalLocaleConfig() {
  const value = useContext(GlobalLocaleConfigContext);
  if (!value) {
    throw new Error('useGlobalLocale must be used within an GlobalLocaleProvider');
  }
  return value;
}

export function useGlobalLocale() {
  const config = useGlobalLocaleConfig();
  return config.locale;
}

export function useGlobalTranslator(): NullableTranslator<GlobalDictionary> {
  const config = useGlobalLocaleConfig();
  return config.translator;
}
