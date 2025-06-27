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
  Typography,
} from '@suid/material';
import type { DrawerProps } from '@suid/material/Drawer';
import type { SelectChangeEvent } from '@suid/material/Select';
import type { ChangeEvent } from '@suid/types';
import type { DataType } from 'csstype';
import { type Accessor, createMemo, For, type JSX, Show } from 'solid-js';
import ListSwitchItem from '@/components/list/ListSwitchItem';
import ToolbarTitle from '@/components/toolbar/ToolbarTitle';
import { useInsets } from '@/features/insets/contexts/InsetsContext';
import { getAvailablePageSizes, pageSizeNameToCm } from '@/features/print/utils/paperSize';
import { type SyncStateOptions, syncState } from '@/hooks/syncState';
import { usePreferredDarkMode } from '@/hooks/usePreferredDarkMode';
import { maybeAndroid } from '@/utils/platform';
import { mergeMultiSxProps } from '@/utils/suid';
import { useConfig } from '../../contexts/ConfigContext';
import type { PrintConfig } from '../../types/config';
import CustomMarginItems from './CustomMarginItems';

function createPositiveIntegerInputLinter(value: Accessor<string>) {
  return createMemo(() => {
    const columns = Number.parseFloat(value());
    if (Number.isNaN(columns) || !Number.isInteger(columns) || columns < 1) {
      return '请输入大于0的整数';
    }
    return null;
  });
}

const POSITIVE_INTEGER_INPUT_SYNC_STATE_OPTIONS: SyncStateOptions<number, string> = {
  flowDown: (value) => String(value),
  flowUp: (value) => Number.parseInt(value),
  canFlowUp: (value) => Number.parseInt(value) > 0,
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
                <For each={getAvailablePageSizes()}>
                  {(size) => {
                    const [widthCm, heightCm] = pageSizeNameToCm(size);
                    return (
                      <MenuItem value={size}>
                        <span>
                          {size}
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="span"
                            sx={{
                              marginLeft: 0.5,
                              alignSelf: 'center',
                            }}
                          >
                            {`(${widthCm}cm x ${heightCm}cm)`}
                          </Typography>
                        </span>
                      </MenuItem>
                    );
                  }}
                </For>
              </Select>
              <FormHelperText id="adjust-panel__size__helper">
                您可能需要在“打印”窗口中同时更改“纸张尺寸”才能正确打印。
              </FormHelperText>
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
            <CustomMarginItems />
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
