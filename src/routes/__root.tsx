import { theme } from '@/themes/theme';
import CSSBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Outlet, createRootRoute } from '@tanstack/react-router';

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
