import { printConfigAtom, paperLayoutAtom, printPreviewConfigAtom } from '@/atoms/snapProofPrint';
import ListItemTitledComponent from '@/components/list/ListItemTitledComponent';
import ToolbarTitle from '@/components/toolbar/ToolbarTitle';
import type { SnapProofPrintConfig } from '@/types/snapProofPrint';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import {
  Box,
  Divider,
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
  SwipeableDrawer,
  type SwipeableDrawerProps,
  Switch,
  Toolbar,
} from '@mui/material';
import { useAtom } from 'jotai';

interface AdjustSheetsProps {
  open: SwipeableDrawerProps['open'];
  onOpen: SwipeableDrawerProps['onOpen'];
  onClose: SwipeableDrawerProps['onClose'];
  variant?: SwipeableDrawerProps['variant'];
  width?: number | string;
}

export default function AdjustSheets({ open, onOpen, onClose, variant, width }: AdjustSheetsProps) {
  const [paperLayout, setPaperLayout] = useAtom(paperLayoutAtom);
  const [printConfig, setPrintConfig] = useAtom(printConfigAtom);
  const [previewConfig, setPreviewConfig] = useAtom(printPreviewConfigAtom);

  function handleColumnsChange(_event: React.SyntheticEvent | Event, value: number) {
    setPaperLayout((draft) => {
      draft.columns = value;
    });
  }
  function handleRowsChange(_event: React.SyntheticEvent | Event, value: number) {
    setPaperLayout((draft) => {
      draft.rows = value;
    });
  }
  function handleOrientationChange(_event: React.ChangeEvent<HTMLInputElement>, value: string) {
    setPrintConfig((draft) => {
      draft.orientation = value as SnapProofPrintConfig['orientation'];
    });
  }
  function handleGrayPreviewToggle() {
    setPreviewConfig((draft) => {
      draft.colorMode = draft.colorMode === 'colorful' ? 'gray' : 'colorful';
    });
  }

  function handleAspectRatioFixedToggle() {
    setPrintConfig((draft) => {
      draft.aspectRatioFixed = !draft.aspectRatioFixed;
    });
  }

  return (
    <SwipeableDrawer
      variant={variant}
      anchor="right"
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width,
          },
        },
      }}
    >
      <Toolbar>
        <ToolbarTitle>调整</ToolbarTitle>
      </Toolbar>
      <Box sx={{ overflow: 'auto', overflowX: 'hidden' }}>
        {/* 页面布局 */}
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
                defaultValue={paperLayout.columns}
                onChangeCommitted={handleColumnsChange}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
                sx={{
                  display: 'block',
                }}
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
                defaultValue={paperLayout.rows}
                onChangeCommitted={handleRowsChange}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
                sx={{
                  display: 'block',
                }}
              />
            </ListItemTitledComponent>
          </ListItem>
          <ListItem>
            <ListItemTitledComponent title="方向">
              <RadioGroup row value={printConfig.orientation} onChange={handleOrientationChange} content="span">
                <FormControlLabel value="landscape" control={<Radio />} label="横向" />
                <FormControlLabel value="portrait" control={<Radio />} label="纵向" />
              </RadioGroup>
            </ListItemTitledComponent>
          </ListItem>
        </List>
        <Divider />
        {/* 打印配置 */}
        <List>
          <ListSubheader>打印</ListSubheader>
          <ListItemButton onClick={handleAspectRatioFixedToggle}>
            <ListItemIcon>
              <ArticleOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="固定页面比例"
              secondary="在打印时使用固定的比例，而非动态测量。FireFox 需要打开此项才能正确显示页面。"
            />
            <Switch
              checked={printConfig.aspectRatioFixed}
              edge="end"
              tabIndex={-1}
              aria-hidden
              sx={{ pointerEvents: 'none' }}
            />
          </ListItemButton>
        </List>
        <Divider />
        {/* 预览配置 */}
        <List>
          <ListSubheader>预览</ListSubheader>
          <ListItemButton onClick={handleGrayPreviewToggle}>
            <ListItemIcon>
              <ContrastOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="彩色打印" />
            <Switch
              checked={previewConfig.colorMode === 'colorful'}
              edge="end"
              tabIndex={-1}
              aria-hidden
              sx={{ pointerEvents: 'none' }}
            />
          </ListItemButton>
          <ListItem>
            <ListItemText secondary="预览选项不会影响最终打印效果" />
          </ListItem>
        </List>
      </Box>
    </SwipeableDrawer>
  );
}
