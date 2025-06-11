import { GlobalStyles, ThemeProvider } from '@suid/material';
import PrinterPage from './pages/PrinterPage';
import { createAppTheme } from './themes/appTheme';

export function App() {
  const theme = createAppTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
            colorScheme: theme.palette.mode,
            color: theme.palette.text.primary,
          },
        }}
      />
      <PrinterPage />
    </ThemeProvider>
  );
}
