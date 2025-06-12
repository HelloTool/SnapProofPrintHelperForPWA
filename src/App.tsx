import { alpha, GlobalStyles, ThemeProvider } from '@suid/material';
import { makeDisableDefaultDropListener } from './hooks/makeDisableDefaultDropListener';
import PrinterPage from './pages/PrinterPage';
import { createAppTheme } from './themes/appTheme';
import { makeDisableDefaultF5Listener } from './hooks/makeDisableDefaultF5Listener';
import { makeDisableDefaultContextMenuListener } from './hooks/makeDisableDefaultContextMenuListener';

export function App() {
  const theme = createAppTheme();
  if (IS_TAURI) {
    makeDisableDefaultDropListener();
    makeDisableDefaultF5Listener();
    makeDisableDefaultContextMenuListener()
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
