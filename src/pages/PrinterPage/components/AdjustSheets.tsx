import ArticleOutlinedIcon from '@suid/icons-material/ArticleOutlined';
import ContrastOutlinedIcon from '@suid/icons-material/ContrastOutlined';
import {
  Box,
  Divider,
  Drawer,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Radio,
  RadioGroup,
  // SwipeableDrawer,
  // type SwipeableDrawerProps,
  Toolbar,
} from '@suid/material';
import { paperLayoutAtom, printConfigAtom, printPreviewConfigAtom } from '@/atoms/snapProofPrint';
import ListItemTitledComponent from '@/components/list/ListItemTitledComponent';
import ListSliderItem from '@/components/list/ListSliderItem';
import ListSwitchItem from '@/components/list/ListSwitchItem';
import ToolbarTitle from '@/components/toolbar/ToolbarTitle';
import { useConfig } from '../contexts/ConfigContext';
import type { DrawerProps } from '@suid/material/Drawer';

interface AdjustSheetsProps {
  open: DrawerProps['open'];
  // onOpen: SwipeableDrawerProps['onOpen'];
  // onClose: SwipeableDrawerProps['onClose'];
  variant?: DrawerProps['variant'];
  width?: number | string;
}

export default function AdjustSheets(props: AdjustSheetsProps) {
  const { state: config, actions: configActions } = useConfig();

  function handleColumnsChange(_event: React.SyntheticEvent | Event, value: number) {
    configActions.layout.setColumns(value);
  }
  function handleRowsChange(_event: React.SyntheticEvent | Event, value: number) {
    configActions.layout.setRows(value);
  }
  function handleOrientationChange(_event: React.ChangeEvent<HTMLInputElement>, value: string) {
    if (value !== 'landscape' && value !== 'portrait') {
      return;
    }
    configActions.print.setOrientation(value);
  }
  function handleGrayPreviewToggle() {
    configActions.preview.setColorMode(config.preview.colorMode === 'colorful' ? 'gray' : 'colorful');
  }

  function handleAspectRatioFixedToggle() {
    configActions.print.toggleAspectRatio();
  }

  return (
    <Drawer
      anchor="right"
      // onClose={onClose}
      // onOpen={onOpen}
      open={props.open}
      // slotProps={{
      //   paper: {
      //     sx: {
      //       width: props.width,
      //     },
      //   },
      // }}
      variant={props.variant}
    >
      <Toolbar>
        <ToolbarTitle>调整</ToolbarTitle>
      </Toolbar>
      <Box sx={{ overflow: 'auto', overflowX: 'hidden' }}>
        {/* 页面布局 */}
        <List>
          <ListSubheader>页面布局</ListSubheader>
          <ListSliderItem
            onChange={handleColumnsChange}
            sliderProps={{
              step: 1,
              marks: true,
              min: 1,
              max: 5,
            }}
            title="列数"
            value={config.layout.columns}
          />
          <ListSliderItem
            onChange={handleRowsChange}
            sliderProps={{
              step: 1,
              marks: true,
              min: 1,
              max: 5,
            }}
            title="行数"
            value={config.layout.rows}
          />
          <ListItem>
            <ListItemTitledComponent title="方向">
              <RadioGroup onChange={handleOrientationChange} row value={printConfig.orientation}>
                <FormControlLabel control={<Radio />} label="横向" value="landscape" />
                <FormControlLabel control={<Radio />} label="纵向" value="portrait" />
              </RadioGroup>
            </ListItemTitledComponent>
          </ListItem>
        </List>
        <Divider />
        {/* 打印配置 */}
        <List>
          <ListSubheader>打印</ListSubheader>
          <ListSwitchItem
            checked={printConfig.aspectRatioFixed}
            icon={<ArticleOutlinedIcon />}
            onClick={handleAspectRatioFixedToggle}
            summary="在打印时使用固定的比例，而非动态测量。FireFox 需要打开此项才能正确显示页面。"
            title="固定页面比例"
          />
        </List>
        <Divider />
        {/* 预览配置 */}
        <List>
          <ListSubheader>预览</ListSubheader>
          <ListSwitchItem
            checked={previewConfig.colorMode === 'colorful'}
            icon={<ContrastOutlinedIcon />}
            onClick={handleGrayPreviewToggle}
            title="彩色打印"
          />
          <ListItem>
            <ListItemText secondary="预览选项不会影响最终打印效果" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
