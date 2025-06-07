import CSSBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { theme } from '@/themes/appTheme';

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider noSsr theme={theme}>
        <CSSBaseline enableColorScheme />
        <Outlet />
      </ThemeProvider>
    </>
  ),
});
