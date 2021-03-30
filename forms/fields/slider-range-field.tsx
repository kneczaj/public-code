import React from 'react';
import { Props as SliderProps, SliderRange } from '../components/slider-range';
import { RangeDataFormat } from '../models/range';
import { FormControl, FormHelperText, SliderTypeMap } from '@material-ui/core';
import { OuterProps } from 'public/forms/models/field';
import { useField } from 'public/forms/hooks/field';
import { composeValidators, rangeValidator } from 'public/forms/validation';

export type Props = SliderTypeMap<OuterProps<RangeDataFormat>>['props'];

export function SliderRangeField(config: Props): JSX.Element {
  const { input, errorLabel, formControl } = useField<
    RangeDataFormat<any>,
    HTMLElement,
    SliderProps
  >({
    ...config,
    validate: composeValidators([config.validate, rangeValidator])
  });
  return (
    <FormControl component='fieldset' {...formControl}>
      <SliderRange {...input} />
      {errorLabel && <FormHelperText {...errorLabel} />}
    </FormControl>
  );
}

SliderRangeField.defaultProps = {
  color: 'secondary'
};
