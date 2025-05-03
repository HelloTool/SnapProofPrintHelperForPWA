import ListItemTitledComponent from '@/components/list/ListItemTitledComponent';
import type { PaperLayout } from '@/types/snap-proof-print';
import {
  Box,
  Divider,
  Drawer,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  Toolbar,
} from '@mui/material';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';

interface AdjustSheetsProps {
  paperLayout: PaperLayout;
  onLayoutChange: (paperLayout: PaperLayout) => void;
  open: boolean;
  width: number;
  grayPreview: boolean;
  onGrayPreviewChange: (grayPreview: boolean) => void;
}

export default function AdjustSheets({
  paperLayout,
  onLayoutChange,
  open,
  width,
  grayPreview,
  onGrayPreviewChange,
}: AdjustSheetsProps) {
  function handleColumnsChange(_event: Event, value: number, _activeThumb: number) {
    onLayoutChange({ ...paperLayout, columns: value });
  }
  function handleRowsChange(_event: Event, value: number, _activeThumb: number) {
    onLayoutChange({ ...paperLayout, rows: value });
  }
  function handleOrientationChange(_event: React.ChangeEvent<HTMLInputElement>, value: string) {
    onLayoutChange({ ...paperLayout, orientation: value as PaperLayout['orientation'] });
  }
  function handleGrayPreviewToggle() {
    onGrayPreviewChange(!grayPreview);
  }

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          zIndex: 0,
          width: width,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', overflowX: 'hidden' }}>
        <List>
          <ListSubheader>页面布局</ListSubheader>
          <ListItem>
            <ListItemTitledComponent
              title="列数"
              slotSx={{
                paddingInline: 1,
              }}
            >
              <Slider
                aria-label="列数"
                value={paperLayout.columns}
                onChange={handleColumnsChange}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
              />
            </ListItemTitledComponent>
          </ListItem>
          <ListItem>
            <ListItemTitledComponent
              title="行数"
              slotSx={{
                paddingInline: 1,
              }}
            >
              <Slider
                aria-label="行数"
                value={paperLayout.rows}
                onChange={handleRowsChange}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
              />
            </ListItemTitledComponent>
          </ListItem>
          <ListItem>
            <ListItemTitledComponent title="方向">
              <RadioGroup row value={paperLayout.orientation} onChange={handleOrientationChange} content="span">
                <FormControlLabel value="landscape" control={<Radio />} label="横向" />
                <FormControlLabel value="portrait" control={<Radio />} label="纵向" />
              </RadioGroup>
            </ListItemTitledComponent>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListSubheader>预览</ListSubheader>
          <ListItemButton onClick={handleGrayPreviewToggle}>
            <ListItemIcon>
              <ContrastOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="彩色打印" />
            <Switch checked={!grayPreview} onChange={handleGrayPreviewToggle} edge="end" />
          </ListItemButton>
          <ListItem>
            <ListItemText secondary="预览选项不会影响最终打印效果" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
