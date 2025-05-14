import PrintPreviewPaper from '@/features/print/components/PrintPreviewPaper';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SnapProofPrintPageContent from './SnapProofPrintPageContent';
import useInsets from '@/features/insets/hooks/useInsets';
import { useAtom } from 'jotai';
import { printConfigAtom, paperImagesAtom, printPreviewConfigAtom } from '@/atoms/snapProofPrint';
import PrintPreview from '@/features/print/components/PrintPreview';

export default function Main() {
  const insets = useInsets();
  const [paperImages] = useAtom(paperImagesAtom);
  const [printConfig] = useAtom(printConfigAtom);
  const [printPreviewConfig] = useAtom(printPreviewConfigAtom);
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
        transition: (theme) =>
          theme.transitions.create(['padding'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Toolbar />

      {paperImages.length > 0 ? (
        // 直接设置alignContent: 'center'会导致图片错位，因此需要一层Box，将外层Box设置为可滚动，将子Box设置为最低高100%，最大无限高。
        <Box
          sx={{
            padding: 2,
            flexGrow: 1,
            flexBasis: 0,
            overflow: 'auto',
          }}
        >
          <PrintPreview
            sx={{
              minHeight: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              alignContent: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
            paperSizeCm={typeof printConfig.size !== 'string' ? printConfig.size : [21, 29.7]}
            paperOrientation={printConfig.orientation}
            contentMarginLeftCm={printConfig.contentMarginLeftCm}
            contentMarginTopCm={printConfig.contentMarginTopCm}
            contentMarginRightCm={printConfig.contentMarginRightCm}
            contentMarginBottomCm={printConfig.contentMarginBottomCm}
            colorMode={printPreviewConfig.colorMode}
          >
            {paperImages.map((images, index) => (
              <Box
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                sx={(theme) => ({
                  width: '360px',
                  maxWidth: '100%',
                  [theme.breakpoints.up('lg')]: {
                    width: '480px',
                  },
                  transition: theme.transitions.create(['width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
                })}
              >
                <PrintPreviewPaper
                  sx={{
                    width: '100%',
                  }}
                >
                  <SnapProofPrintPageContent images={images} />
                </PrintPreviewPaper>
                <Typography
                  variant="subtitle1"
                  color="textPrimary"
                  align="center"
                  sx={{
                    userSelect: 'text',
                  }}
                >
                  第 {index + 1} 页
                </Typography>
              </Box>
            ))}
          </PrintPreview>
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            flexBasis: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" color="textPrimary">
            暂无预览，请先添加图片 。
          </Typography>
        </Box>
      )}
    </Box>
  );
}
