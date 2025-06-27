import { Box, ThemeProvider, Toolbar, Typography, useTheme } from '@suid/material';
import { createMemo, Index, Show } from 'solid-js';
import { useInsets } from '@/features/insets/contexts/InsetsContext';
import PrintPreview from '@/features/print/components/PrintPreview';
import PrintPreviewPaper from '@/features/print/components/PrintPreviewPaper';
import { pageSizeNameToCm } from '@/features/print/utils/paperSize';
import { getOrientationBasedSize } from '@/features/print/utils/print';
import { usePreferredDarkMode } from '@/hooks/usePreferredDarkMode';
import { createAppTheme } from '@/themes/appTheme';
import { useConfig } from '../contexts/ConfigContext';
import useImages from '../contexts/ImagesContext';
import SPPrintPageContent from './SPPrintPageContent';

export default function MainArea() {
  const insets = useInsets();
  const { state: images } = useImages();
  const { state: config } = useConfig();
  const theme = useTheme();
  const isPreferredDark = usePreferredDarkMode();
  const previewTheme = createMemo(() => {
    if (isPreferredDark() && config.preview.lightMode) {
      return createAppTheme({ isDarkMode: false });
    }
    return theme;
  });
  const paperAspectRatio = createMemo(() => {
    const pageSize = Array.isArray(config.print.size) ? config.print.size : pageSizeNameToCm(config.print.size);
    const { width, height } = getOrientationBasedSize(pageSize, config.print.orientation);
    return width / height;
  });
  const longSideWidth = {
    xs: 360,
    lg: 480,
  } as const;
  const previewPaperWidthSx = createMemo(() => {
    return config.print.orientation === 'landscape'
      ? {
          xs: `${longSideWidth.xs}px`,
          lg: `${longSideWidth.lg}px`,
        }
      : {
          xs: `${longSideWidth.xs * paperAspectRatio()}px`,
          lg: `${longSideWidth.lg * paperAspectRatio()}px`,
        };
  });
  return (
    <Box
      component="main"
      sx={{
        height: '100%',
        width: '100%',
        paddingLeft: `${insets.left}px`,
        paddingTop: `${insets.top}px`,
        paddingRight: `${insets.right}px`,
        paddingBottom: `${insets.bottom}px`,
        transition: theme.transitions.create(['padding'], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut,
        }),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Toolbar />
      <Show
        when={images.images.length > 0}
        fallback={
          <Box
            sx={{
              flexGrow: 1,
              flexBasis: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="textPrimary" variant="body2">
              暂无预览，请先添加图片 。
            </Typography>
          </Box>
        }
      >
        <Box
          sx={{
            padding: 2,
            flexGrow: 1,
            flexBasis: 0,
            overflow: 'auto',
          }}
        >
          <PrintPreview
            colorMode={config.preview.colorMode}
            contentMarginTop={config.print.contentMarginTop}
            contentMarginBottom={config.print.contentMarginBottom}
            contentMarginLeft={config.print.contentMarginLeft}
            contentMarginRight={config.print.contentMarginRight}
            paperOrientation={config.print.orientation}
            paperSize={config.print.size}
            sx={{
              minHeight: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              alignContent: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Index each={images.chunkedImages}>
              {(images, index) => (
                <Box
                  sx={{
                    maxWidth: '100%',
                    transition: theme.transitions.create(['width'], {
                      easing: theme.transitions.easing.easeInOut,
                      duration: theme.transitions.duration.shorter,
                    }),
                  }}
                >
                  <ThemeProvider theme={previewTheme}>
                    <PrintPreviewPaper
                      sx={{
                        maxWidth: '100%',
                        width: previewPaperWidthSx(),
                      }}
                    >
                      <SPPrintPageContent
                        columns={config.layout.columns}
                        rows={config.layout.rows}
                        images={images()}
                        mode="preview"
                      />
                    </PrintPreviewPaper>
                  </ThemeProvider>
                  <Typography
                    align="center"
                    color="textPrimary"
                    sx={{
                      userSelect: 'text',
                      marginTop: 1,
                    }}
                    variant="subtitle1"
                  >
                    第 {index + 1} 页
                  </Typography>
                </Box>
              )}
            </Index>
          </PrintPreview>
        </Box>
      </Show>
    </Box>
  );
}
