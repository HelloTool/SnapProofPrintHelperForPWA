import { alpha, GlobalStyles, ThemeProvider } from '@suid/material';
import { makeDisableDropListener } from './hooks/makeDisableDropListener';
import PrinterPage from './pages/PrinterPage';
import { createAppTheme } from './themes/appTheme';

export function App() {
  const theme = createAppTheme();
  if (IS_TAURI) {
    makeDisableDropListener();
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
