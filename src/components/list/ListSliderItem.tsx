import { Box, ListItem, type Theme } from '@suid/material';
import type { SxProps } from '@suid/system';
import { useEffect, useState } from 'react';
import ListItemTitledComponent from './ListItemTitledComponent';

interface ListSliderItemProps<Value extends number | number[]> {
  title?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  value?: Value;
  onChange?: (event: Event | React.SyntheticEvent, value: Value, activeThumb: number) => void;
  commitTiming?: 'immediately' | 'releasing';
  sliderProps?: Omit<SliderOwnProps<Value>, 'value' | 'onChange' | 'onChangeCommitted'>;
}

export default function ListSliderItem<Value extends number | number[]>({
  title,
  sx,
  disabled,
  value: outsideValue,
  onChange,
  commitTiming = 'releasing',
  sliderProps,
}: ListSliderItemProps<Value>) {
  const [value, setValue] = useState<Value>(outsideValue as Value);
  useEffect(() => {
    if (typeof outsideValue !== 'undefined') {
      setValue(outsideValue);
    }
  }, [outsideValue]);

  function handleChange(event: Event, value: Value, activeThumb: number) {
    setValue((prev) => {
      if (typeof prev === 'number') {
        return value as Value;
      }
      return prev.map((v, i) => (i === activeThumb ? prev[i] : v)) as Value;
    });
    if (commitTiming === 'immediately' && onChange) {
      onChange(event, value, activeThumb);
    }
  }

  function handleChangeCommitted(event: React.SyntheticEvent | Event, value: Value) {
    if (commitTiming === 'releasing' && onChange) {
      onChange(event, value, 0);
    }
  }

  const TypedSlider = Slider as SliderComponent<Value>;
  return (
    <ListItem sx={sx}>
      <ListItemTitledComponent title={title}>
        <Box sx={{ paddingInline: 1 }}>
          <TypedSlider
            aria-label={title}
            disabled={disabled}
            onChange={handleChange}
            onChangeCommitted={handleChangeCommitted}
            sx={{
              display: 'block',
            }}
            value={value}
            valueLabelDisplay="auto"
            {...sliderProps}
          />
        </Box>
      </ListItemTitledComponent>
    </ListItem>
  );
}
