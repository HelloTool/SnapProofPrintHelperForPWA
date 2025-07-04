import { Meta, MetaProvider, Title } from '@solidjs/meta';
import { alpha, GlobalStyles, ThemeProvider } from '@suid/material';
import { createEffect } from 'solid-js';
import { GlobalLocaleConfigProvider } from './contexts/GlobalLocaleConfigContext';
import { createCurrentLocale } from './hooks/createCurrentLocale';
import createGlobalTranslator from './hooks/createGlobalTranslator';
import { makeDisableDefaultContextMenuListener } from './hooks/makeDisableDefaultContextMenuListener';
import { makeDisableDefaultDropListener } from './hooks/makeDisableDefaultDropListener';
import { makeDisableDefaultF5Listener } from './hooks/makeDisableDefaultF5Listener';
import { makeMeta } from './hooks/makeMeta';
import { useDisplayStandaloneMode } from './hooks/useDisplayStandaloneMode';
import PrinterPage from './pages/PrinterPage';
import { createAppTheme } from './themes/appTheme';

export function App() {
  const theme = createAppTheme();
  if (IS_TAURI) {
    makeDisableDefaultDropListener();
    makeDisableDefaultF5Listener();
    makeDisableDefaultContextMenuListener();
  } else {
    const standaloneMode = useDisplayStandaloneMode();

    createEffect(() => {
      if (standaloneMode()) {
        makeDisableDefaultDropListener();
        makeDisableDefaultContextMenuListener();
      }
    });
    // Meta 组件不稳定，所以需要手动更新
    makeMeta('theme-color', () => theme.palette.background.default);
  }

  const currentLocale = createCurrentLocale();
  const t = createGlobalTranslator(currentLocale);

  if (IS_TAURI) {
    createEffect(() => {
      const newTitle = t('app.name');
      import('@tauri-apps/api/window')
        .then(({ getCurrentWindow }) => getCurrentWindow().setTitle(newTitle))
        .catch(console.error);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalLocaleConfigProvider locale={currentLocale()} translator={t}>
        <MetaProvider>
          <Title>{t('app.name')}</Title>
          <Meta name="description" content={t('app.description')} />
          <Meta name="apple-mobile-web-app-title" content={t('app.name')} />
          {/* <Meta name="theme-color" content={theme.palette.background.default} /> */}
        </MetaProvider>
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: theme.palette.background.default,
              colorScheme: theme.palette.mode,
              color: theme.palette.text.primary,
              ...{
                '--mdc-typography-font-family': theme.typography.fontFamily,
              },
            },
            '.mdc-tooltip__surface': {
              backgroundColor: alpha(theme.palette.grey[700], 0.9),
            },
          }}
        />
        <PrinterPage />
      </GlobalLocaleConfigProvider>
    </ThemeProvider>
  );
}
