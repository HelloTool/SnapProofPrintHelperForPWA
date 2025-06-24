import LightbulbOutlinedIcon from '@suid/icons-material/LightbulbOutlined';
import PaletteOutlinedIcon from '@suid/icons-material/PaletteOutlined';
import {
  Box,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  // SwipeableDrawer,
  // type SwipeableDrawerProps,
  Toolbar,
} from '@suid/material';
import type { DrawerProps } from '@suid/material/Drawer';
import type { SelectChangeEvent } from '@suid/material/Select';
import type { ChangeEvent } from '@suid/types';
import type { DataType } from 'csstype';
import { type Accessor, createMemo, For, type JSX, Show } from 'solid-js';
import ListSwitchItem from '@/components/list/ListSwitchItem';
import ToolbarTitle from '@/components/toolbar/ToolbarTitle';
import { useInsets } from '@/features/insets/contexts/InsetsContext';
import { getAvailablePageSizes } from '@/features/print/utils/paperSize';
import { usePreferredDarkMode } from '@/hooks/mediaQuery';
import { type SyncStateOptions, syncState } from '@/hooks/syncState';
import { maybeAndroid, maybeChrome } from '@/utils/platform';
import { mergeMultiSxProps } from '@/utils/suid';
import { useConfig } from '../contexts/ConfigContext';
import type { PrintConfig } from '../types/config';

function createPositiveIntegerInputLinter(value: Accessor<string>) {
  return createMemo(() => {
    const columns = Number.parseFloat(value());
    if (Number.isNaN(columns) || !Number.isInteger(columns) || columns < 1) {
      return '请输入大于0的整数';
    }
    return null;
  });
}
function createMarginInputLinter(value: Accessor<string>) {
  return createMemo(() => {
    const columns = Number.parseFloat(value());
    if (Number.isNaN(columns) || columns < 0) {
      return '请输入大于0的数字';
    }
    return null;
  });
}

const POSITIVE_INTEGER_INPUT_SYNC_STATE_OPTIONS: SyncStateOptions<number, string> = {
  flowDown: (value) => String(value),
  flowUp: (value) => Number.parseInt(value),
  canFlowUp: (value) => Number.parseInt(value) > 0,
};

const MARGIN_INPUT_SYNC_STATE_OPTIONS: SyncStateOptions<number, string> = {
  flowDown: (value) => String(value),
  flowUp: (value) => Number.parseFloat(value),
  canFlowUp: (value) => Number.parseFloat(value) > 0,
};

interface AdjustSheetsProps extends DrawerProps {}

export default function AdjustSheets(props: AdjustSheetsProps) {
  const { state: config, actions: configActions } = useConfig();

  const [columnsValue, setColumnsValue] = syncState(
    () => config.layout.columns,
    (value) => configActions.layout.setColumns(value()),
    POSITIVE_INTEGER_INPUT_SYNC_STATE_OPTIONS,
  );

  const [rowsValue, setRowsValue] = syncState(
    () => config.layout.rows,
    (value) => configActions.layout.setRows(value()),
    POSITIVE_INTEGER_INPUT_SYNC_STATE_OPTIONS,
  );

  const columnsError = createPositiveIntegerInputLinter(columnsValue);
  const rowsError = createPositiveIntegerInputLinter(rowsValue);

  function handleOrientationChange(_event: ChangeEvent<HTMLInputElement>, value: string) {
    if (value !== 'landscape' && value !== 'portrait') {
      return;
    }
    configActions.print.setOrientation(value);
  }

  function handleGrayPreviewToggle() {
    configActions.preview.setColorMode(config.preview.colorMode === 'colorful' ? 'gray' : 'colorful');
  }

  function handlePageSizeChange(event: SelectChangeEvent<DataType.PageSize | 'custom'>, _child: JSX.Element) {
    if (event.target.value !== 'custom') {
      configActions.print.setPaperSize(event.target.value);
    }
  }
  function handleMarginPresetChange(event: SelectChangeEvent<PrintConfig['contentMarginPreset']>, _child: JSX.Element) {
    configActions.print.setMarginPreset(event.target.value);
  }

  const [marginTopValue, setMarginTopValue] = syncState(
    () => config.print.contentMarginTop,
    (value) => configActions.print.setMarginTop(value()),
    MARGIN_INPUT_SYNC_STATE_OPTIONS,
  );
  const [marginBottomValue, setMarginBottomValue] = syncState(
    () => config.print.contentMarginBottom,
    (value) => configActions.print.setMarginBottom(value()),
    MARGIN_INPUT_SYNC_STATE_OPTIONS,
  );
  const [marginLeftValue, setMarginLeftValue] = syncState(
    () => config.print.contentMarginLeft,
    (value) => configActions.print.setMarginLeft(value()),
    MARGIN_INPUT_SYNC_STATE_OPTIONS,
  );
  const [marginRightValue, setMarginRightValue] = syncState(
    () => config.print.contentMarginRight,
    (value) => configActions.print.setMarginRight(value()),
    MARGIN_INPUT_SYNC_STATE_OPTIONS,
  );

  const marginTopError = createMarginInputLinter(marginTopValue);
  const marginBottomError = createMarginInputLinter(marginBottomValue);
  const marginLeftError = createMarginInputLinter(marginLeftValue);
  const marginRightError = createMarginInputLinter(marginRightValue);

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
            transitionProperty: 'right, bottom, transform, width !important',
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
        </List>
        <Divider />
        {/* 打印配置 */}
        <List>
          <ListSubheader>打印</ListSubheader>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="adjust-panel__size__label" for="adjust-panel__size__select">
                纸张尺寸
              </InputLabel>
              <Select<DataType.PageSize | 'custom'>
                id="adjust-panel__size__select"
                aria-describedby="adjust-panel__size__helper"
                labelId="adjust-panel__size__label"
                label="纸张尺寸"
                value={typeof config.print.size === 'string' ? config.print.size : 'custom'}
                onChange={handlePageSizeChange}
              >
                <For each={getAvailablePageSizes()}>{(size) => <MenuItem value={size}>{size}</MenuItem>}</For>
              </Select>
              <Show when={!maybeChrome || maybeAndroid}>
                <FormHelperText id="adjust-panel__size__helper">
                  您可能需要在“打印”窗口中同时更改“纸张尺寸”才能正确打印。
                </FormHelperText>
              </Show>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="adjust-panel__margin__label" for="adjust-panel__margin__select">
                页边距
              </InputLabel>
              <Select<PrintConfig['contentMarginPreset']>
                id="adjust-panel__margin__select"
                aria-describedby="adjust-panel__margin__helper"
                labelId="adjust-panel__margin__label"
                label="页边距"
                value={config.print.contentMarginPreset}
                onChange={handleMarginPresetChange}
              >
                <MenuItem value="default">默认</MenuItem>
                <MenuItem value="custom">自定义</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <Show when={config.print.contentMarginPreset === 'custom'}>
            <ListItem>
              <TextField
                label="上边距"
                type="number"
                fullWidth
                inputProps={{
                  min: 0,
                  step: 0.1,
                }}
                required
                value={marginTopValue()}
                onChange={(_event, value) => setMarginTopValue(value)}
                error={marginTopError() !== null}
                helperText={marginTopError()}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
              />
              <TextField
                label="下边距"
                type="number"
                fullWidth
                inputProps={{
                  min: 0,
                  step: 0.1,
                }}
                sx={{
                  marginLeft: 2,
                }}
                required
                value={marginBottomValue()}
                onChange={(_event, value) => setMarginBottomValue(value)}
                error={marginBottomError() !== null}
                helperText={marginBottomError()}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
              />
            </ListItem>
            <ListItem>
              <TextField
                label="左边距"
                type="number"
                fullWidth
                inputProps={{
                  min: 0,
                  step: 0.1,
                }}
                required
                value={marginLeftValue()}
                onChange={(_event, value) => setMarginLeftValue(value)}
                error={marginLeftError() !== null}
                helperText={marginLeftError()}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
              />
              <TextField
                label="右边距"
                type="number"
                fullWidth
                inputProps={{
                  min: 0,
                  step: 0.1,
                }}
                sx={{
                  marginLeft: 2,
                }}
                required
                value={marginRightValue()}
                onChange={(_event, value) => setMarginRightValue(value)}
                error={marginRightError() !== null}
                helperText={marginRightError()}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
              />
            </ListItem>
          </Show>
          <ListItem>
            <FormControl fullWidth variant="standard">
              <FormLabel id="adjust-panel__orientation__label">方向</FormLabel>
              <RadioGroup
                aria-labelledby="adjust-panel__orientation__label"
                aria-describedby="adjust-panel__orientation__helper"
                onChange={handleOrientationChange}
                row
                value={config.print.orientation}
              >
                <FormControlLabel control={<Radio />} label="横向" value="landscape" />
                <FormControlLabel control={<Radio />} label="纵向" value="portrait" />
              </RadioGroup>
              <Show when={maybeAndroid}>
                <FormHelperText id="adjust-panel__orientation__helper">
                  您可能需要在“打印”窗口中同时更改“纸张方向”才能正确打印。
                </FormHelperText>
              </Show>
            </FormControl>
          </ListItem>
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
