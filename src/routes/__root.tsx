import { createRootRoute, Outlet } from '@tanstack/react-router';
import CSSBaseline from '@mui/material/CssBaseline';
import { theme } from '@/themes/theme';
import { ThemeProvider } from '@mui/material/styles';

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider theme={theme} noSsr>
        <CSSBaseline enableColorScheme />
        <Outlet />
      </ThemeProvider>
    </>
  ),
});
