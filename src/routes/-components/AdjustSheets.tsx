import { printConfigAtom, paperLayoutAtom, printPreviewConfigAtom } from '@/atoms/snapProofPrint';
import ListItemTitledComponent from '@/components/list/ListItemTitledComponent';
import ListSliderItem from '@/components/list/ListSliderItem';
import ListSwitchItem from '@/components/list/ListSwitchItem';
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
  ListItemText,
  ListSubheader,
  Radio,
  RadioGroup,
  SwipeableDrawer,
  type SwipeableDrawerProps,
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
          <ListSliderItem
            title="列数"
            value={paperLayout.columns}
            onChange={handleColumnsChange}
            sliderProps={{
              step: 1,
              marks: true,
              min: 1,
              max: 5,
            }}
          />
          <ListSliderItem
            title="行数"
            value={paperLayout.rows}
            onChange={handleRowsChange}
            sliderProps={{
              step: 1,
              marks: true,
              min: 1,
              max: 5,
            }}
          />
          <ListItem>
            <ListItemTitledComponent title="方向">
              <RadioGroup row value={printConfig.orientation} onChange={handleOrientationChange}>
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
          <ListSwitchItem
            icon={<ArticleOutlinedIcon />}
            title="固定页面比例"
            summary="在打印时使用固定的比例，而非动态测量。FireFox 需要打开此项才能正确显示页面。"
            checked={printConfig.aspectRatioFixed}
            onClick={handleAspectRatioFixedToggle}
          />
        </List>
        <Divider />
        {/* 预览配置 */}
        <List>
          <ListSubheader>预览</ListSubheader>
          <ListSwitchItem
            icon={<ContrastOutlinedIcon />}
            title="彩色打印"
            checked={previewConfig.colorMode === 'colorful'}
            onClick={handleGrayPreviewToggle}
          />
          <ListItem>
            <ListItemText secondary="预览选项不会影响最终打印效果" />
          </ListItem>
        </List>
      </Box>
    </SwipeableDrawer>
  );
}
