import ArticleOutlinedIcon from '@suid/icons-material/ArticleOutlined';
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
  TextField,
  // SwipeableDrawer,
  // type SwipeableDrawerProps,
  Toolbar,
} from '@suid/material';
import type { DrawerProps } from '@suid/material/Drawer';
import type { ChangeEvent } from '@suid/types';
// import { paperLayoutAtom, printConfigAtom, printPreviewConfigAtom } from '@/atoms/snapProofPrint';
import ListItemTitledComponent from '@/components/list/ListItemTitledComponent';
import ListSwitchItem from '@/components/list/ListSwitchItem';
import ToolbarTitle from '@/components/toolbar/ToolbarTitle';
import { useInsets } from '@/features/insets/contexts/InsetsContext';
import { usePreferredDarkMode } from '@/hooks/mediaQuery';
import { syncState } from '@/hooks/syncState';
import LightbulbOutlinedIcon from '@suid/icons-material/LightbulbOutlined';
import PaletteOutlinedIcon from '@suid/icons-material/PaletteOutlined';
import { createMemo, mergeProps, Show } from 'solid-js';
import { useConfig } from '../contexts/ConfigContext';
import { mergeMultiSxProps } from '@/utils/suid';

interface AdjustSheetsProps extends DrawerProps {}

export default function AdjustSheets(props: AdjustSheetsProps) {
  const { state: config, actions: configActions } = useConfig();

  const [columnsValue, setColumnsValue] = syncState(
    () => String(config.layout.columns),
    (value) => configActions.layout.setColumns(Number.parseInt(value())),
    {
      pushWhen: (value) => {
        const columns = Number.parseInt(value);
        return columns > 0 && columns !== config.layout.columns;
      },
      pullWhen: (upstreamValue, value) => {
        return Number.parseInt(upstreamValue) !== Number.parseInt(value);
      },
    },
  );

  const [rowsValue, setRowsValue] = syncState(
    () => String(config.layout.rows),
    (value) => configActions.layout.setRows(Number.parseInt(value())),
    {
      pushWhen: (value) => {
        const rows = Number.parseInt(value);
        return rows > 0 && rows !== config.layout.rows;
      },
      pullWhen: (upstreamValue, value) => {
        return Number.parseInt(upstreamValue) !== Number.parseInt(value);
      },
    },
  );
  const columnsError = createMemo(() => {
    const columns = Number.parseFloat(columnsValue());
    if (Number.isNaN(columns) || !Number.isInteger(columns)) {
      return '请输入整数';
    } else if (!(columns > 0)) {
      return '列数必须大于0';
    }
    return null;
  });

  const rowsError = createMemo(() => {
    const rows = Number.parseFloat(rowsValue());
    if (Number.isNaN(rows) || !Number.isInteger(rows)) {
      return '请输入整数';
    } else if (!(rows > 0)) {
      return '行数必须大于0';
    }
    return null;
  });

  function handleOrientationChange(_event: ChangeEvent<HTMLInputElement>, value: string) {
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

  const isPreferredDark = usePreferredDarkMode();

  function handleLightModeToggle() {
    configActions.preview.toggleLightMode();
  }

  const insets = useInsets();

  return (
    <Drawer
      anchor="right"
      onClose={props.onClose}
      // onOpen={onOpen}
      open={props.open}
      variant={props.variant}
      {...props}
      PaperProps={{
        ...props.PaperProps,
        sx: mergeMultiSxProps(
          {
            boxSizing: 'border-box',
            paddingTop: `${insets.top}px`,
            paddingRight: `${insets.right}px`,
          },
          props.PaperProps?.sx,
        ),
      }}
    >
      <Toolbar>
        <ToolbarTitle>调整</ToolbarTitle>
      </Toolbar>
      <Box
        sx={{
          overflow: 'auto',
          overflowX: 'hidden',
          paddingBottom: `${insets.bottom}px`,
        }}
      >
        {/* 页面布局 */}
        <List>
          <ListSubheader>页面布局</ListSubheader>
          {/* <ListSliderItem
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
          /> */}
          <ListItem>
            <TextField
              label="列数"
              type="number"
              value={columnsValue()}
              onChange={(_event, value) => setColumnsValue(value)}
              fullWidth
              inputProps={{
                min: 1,
                step: 1,
              }}
              required
              error={columnsError() !== null}
              helperText={columnsError()}
            />
          </ListItem>
          <ListItem>
            <TextField
              label="行数"
              type="number"
              value={rowsValue()}
              onChange={(_event, value) => setRowsValue(value)}
              fullWidth
              inputProps={{
                min: 1,
                step: 1,
              }}
              required
              error={rowsError() !== null}
              helperText={rowsError()}
            />
          </ListItem>
          <ListItem>
            <ListItemTitledComponent title="方向">
              <RadioGroup onChange={handleOrientationChange} row value={config.print.orientation}>
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
            checked={config.print.aspectRatioFixed}
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
            checked={config.preview.colorMode === 'colorful'}
            icon={<PaletteOutlinedIcon />}
            onClick={handleGrayPreviewToggle}
            title="彩色模式"
          />
          <Show when={isPreferredDark()}>
            <ListSwitchItem
              checked={config.preview.lightMode}
              icon={<LightbulbOutlinedIcon />}
              onClick={handleLightModeToggle}
              title="亮色模式"
            />
          </Show>
          <ListItem>
            <ListItemText secondary="预览选项不会影响最终打印效果" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
