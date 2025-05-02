import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
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
  },
});
