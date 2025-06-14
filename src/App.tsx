import { alpha, GlobalStyles, ThemeProvider } from '@suid/material';
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
    makeDisableDefaultContextMenuListener((target) => {
      if (
        target instanceof HTMLInputElement &&
        (target.type === 'email' ||
          target.type === 'text' ||
          target.type === 'password' ||
          target.type === 'number' ||
          target.type === 'tel' ||
          target.type === 'url' ||
          target.type === 'search')
      ) {
        return false;
      }
      return true;
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
