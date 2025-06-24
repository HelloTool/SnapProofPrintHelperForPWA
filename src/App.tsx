import { alpha, GlobalStyles, ThemeProvider, useMediaQuery } from '@suid/material';
import { createEffect } from 'solid-js';
import { makeDisableDefaultContextMenuListener } from './hooks/makeDisableDefaultContextMenuListener';
import { makeDisableDefaultDropListener } from './hooks/makeDisableDefaultDropListener';
import { makeDisableDefaultF5Listener } from './hooks/makeDisableDefaultF5Listener';
import PrinterPage from './pages/PrinterPage';
import { createAppTheme } from './themes/appTheme';

export function App() {
  const theme = createAppTheme();
  if (IS_TAURI) {
    makeDisableDefaultDropListener();
    makeDisableDefaultF5Listener();
    makeDisableDefaultContextMenuListener();
  } else {
    const standaloneMode = useMediaQuery('(display-mode: standalone)');

    createEffect(() => {
      if (standaloneMode()) {
        makeDisableDefaultDropListener();
        makeDisableDefaultContextMenuListener();
      }
    });
  }

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
