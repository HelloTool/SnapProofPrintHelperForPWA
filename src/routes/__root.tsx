import { createRootRoute, Outlet } from '@tanstack/react-router';
import CSSBaseline from '@mui/material/CssBaseline';
import { theme } from '@/themes/theme';
import { ThemeProvider } from '@mui/material/styles';

export const Route = createRootRoute({
  component: () => (
    <>
      <CSSBaseline enableColorScheme />
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </>
  ),
});
