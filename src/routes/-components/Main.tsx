import useInsets from '@/features/insets/hooks';
import PrintPaperSimulator from '@/features/print/components/PrintPaperSimulator';
import type { PaperLayout, Image } from '@/types/snap-proof-print';
import { Box, Grid, Toolbar } from '@mui/material';
import SnapProofPrintPageContent from './SnapProofPrintPageContent';

interface MainProps {
  papers: Image[][];
  paperLayout: PaperLayout;
  grayPreview: boolean;
}

export default function Main({ papers, paperLayout, grayPreview }: MainProps) {
  const insets = useInsets();
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
      <Box
        sx={{
          padding: 2,
          flexGrow: 1,
          flexBasis: 0,
          overflow: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {papers.map((paperImages, index) => (
          <PrintPaperSimulator
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            page={{
              marginLeft: 0.5,
              marginTop: 1,
              marginRight: 0.5,
              marginBottom: 1,
              orientation: paperLayout.orientation,
              gray: grayPreview,
            }}
            sx={{
              width: '360px',
              maxWidth: '100%',
            }}
          >
            <SnapProofPrintPageContent images={paperImages} paperLayout={paperLayout} />
          </PrintPaperSimulator>
        ))}
      </Box>
    </Box>
  );
}
