import { createTheme } from '@suid/material';
import { createPalette } from '@suid/material/styles/createPalette';
import { createMemo } from 'solid-js';
import { usePreferredDarkMode } from '@/hooks/mediaQuery';

interface AppThemeOptions {
  isDarkMode?: boolean;
}
export function createAppTheme(options?: AppThemeOptions) {
  const isDarkMode = options?.isDarkMode !== undefined ? () => Boolean(options.isDarkMode) : usePreferredDarkMode();
  return createTheme({
    palette: createMemo(() => {
      if (!isDarkMode()) {
        return createPalette({
          mode: 'light',
          primary: {
            main: '#1a73e8', // Google Blue 600
          },
          secondary: {
            main: '#1a73e8', // Google Blue 600
          },
        });
      } else {
        return createPalette({
          primary: {
            main: '#aecbfa', // Google Blue 600
          },
          secondary: {
            main: '#aecbfa', // Google Blue 600
          },
          mode: 'dark',
        });
      }
    }),
    // colorSchemes: {
    //   light: {
    //     palette: {
    //       mode: 'light',
    //       primary: {
    //         main: '#1a73e8', // Google Blue 600
    //       },
    //       secondary: {
    //         main: '#1a73e8',
    //       },
    //     },
    //   },
    //   dark: {
    //     palette: {
    //       mode: 'dark',
    //       primary: {
    //         main: '#aecbfa', // Google Blue 200
    //       },
    //       secondary: {
    //         main: '#aecbfa',
    //       },
    //     },
    //   },
    // },
    components: {
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
          color: 'inherit',
        },
        // styleOverrides: {
        //   root: ({ theme }) =>
        //     theme.unstable_sx({
        //       borderBottom: 1,
        //       borderColor: 'divider',
        //     }),
        // },
      },
      MuiFab: {
        defaultProps: {
          color: 'secondary',
        },
      },
      MuiListSubheader: {
        defaultProps: {
          disableSticky: true,
        },
        // styleOverrides: {
        //   root: {
        //     zIndex: 2, //防止编辑框标题覆盖列表标题
        //   },
        // },
      },
      // MuiSlider: {
      //   styleOverrides: {
      //     // 修复断点移除轨道
      //     track: {
      //       marginLeft: '-2px',
      //     },
      //     rail: {
      //       marginLeft: '2px',
      //     },
      //   },
      // },
      MuiDrawer: {
        // styleOverrides: {
        //   paper: {
        //     variants: [
        //       {
        //         props: { variant: 'temporary' },
        //         style: {
        //           width: '100%',
        //           maxWidth: 'calc(100% - 56px)',
        //         },
        //       },
        //       {
        //         props: { variant: 'permanent' },
        //         style: {
        //           zIndex: 1,
        //         },
        //       },
        //       {
        //         props: { variant: 'persistent' },
        //         style: {
        //           zIndex: 1,
        //         },
        //       },
        //     ],
        //   },
        // },
      },
      MuiBadge: {
        defaultProps: {
          color: 'secondary',
        },
      },
    },
  });
}
