import { ThemeProvider } from '@suid/material';
import PrinterPage from './pages/PrinterPage';
import { theme } from './themes/appTheme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <PrinterPage />
    </ThemeProvider>
  );
}
