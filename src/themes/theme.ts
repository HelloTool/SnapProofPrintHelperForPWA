import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: {
          main: '#1a73e8', // Google Blue 600
        },
        secondary: {
          main: '#1a73e8',
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#aecbfa', // Google Blue 200
        },
        secondary: {
          main: '#aecbfa',
        },
      },
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: 'inherit',
      },
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            borderBottom: 1,
            borderColor: 'divider',
          }),
      },
    },
    MuiFab: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          zIndex: 2, //防止编辑框标题覆盖列表标题
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        // 修复断点移除轨道
        track: {
          marginLeft: '-2px',
        },
        rail: {
          marginLeft: '2px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          variants: [
            {
              props: { variant: 'temporary' },
              style: {
                width: '100%',
                maxWidth: 'calc(100% - 56px)',
              },
            },
            {
              props: { variant: 'permanent' },
              style: {
                zIndex: 1,
              },
            },
            {
              props: { variant: 'persistent' },
              style: {
                zIndex: 1,
              },
            },
          ],
        },
      },
    },
  },
});
