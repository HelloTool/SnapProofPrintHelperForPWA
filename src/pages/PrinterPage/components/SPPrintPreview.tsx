import { Box, Typography } from '@suid/material';
import PrintPreview from '@/features/print/components/PrintPreview';
import PrintPreviewPaper from '@/features/print/components/PrintPreviewPaper';
import SPPrintPageContent from './SPPrintPageContent';

export default function SPPrintPreview() {
  return (
    <PrintPreview
      colorMode={previewConfig.colorMode}
      contentMarginBottomCm={printConfig.contentMarginBottomCm}
      contentMarginLeftCm={printConfig.contentMarginLeftCm}
      contentMarginRightCm={printConfig.contentMarginRightCm}
      contentMarginTopCm={printConfig.contentMarginTopCm}
      paperOrientation={printConfig.orientation}
      paperSizeCm={typeof printConfig.size !== 'string' ? printConfig.size : [21, 29.7]}
      sx={{
        minHeight: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
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
            <SPPrintPageContent columns={paperLayout.columns} images={images} rows={paperLayout.rows} />
          </PrintPreviewPaper>
          <Typography
            align="center"
            color="textPrimary"
            sx={{
              userSelect: 'text',
            }}
            variant="subtitle1"
          >
            第 {index + 1} 页
          </Typography>
        </Box>
      ))}
    </PrintPreview>
  );
}
