import { InputAdornment, ListItem, TextField } from '@suid/material';
import type { Accessor } from 'solid-js';
import { type SyncStateOptions, syncState } from '@/hooks/syncState';
import { useConfig } from '../../contexts/ConfigContext';

function createMarginInputLinter(value: Accessor<string>) {
  return () => {
    const columns = Number.parseFloat(value());
    if (Number.isNaN(columns) || columns < 0) {
      return '请输入大于0的数字';
    }
    return null;
  };
}

const MARGIN_INPUT_SYNC_STATE_OPTIONS: SyncStateOptions<number, string> = {
  flowDown: (value) => String(value),
  flowUp: (value) => Number.parseFloat(value),
  canFlowUp: (value) => Number.parseFloat(value) >= 0,
};
export default function CustomMarginItems() {
  const { state: config, actions: configActions } = useConfig();
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

  return (
    <>
      <ListItem
        sx={{
          alignItems: 'flex-start',
        }}
      >
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
      <ListItem
        sx={{
          alignItems: 'flex-start',
        }}
      >
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
    </>
  );
}
