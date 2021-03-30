import { composeValidators, rangeValidator } from '../validation';
import { CustomProps, Range } from '../components/range';
import { OuterProps } from '../models/field';
import React from 'react';
import { RangeDataFormat } from '../models/range';
import { useField } from 'public/forms/hooks/field';
import { FormControl, FormHelperText } from '@material-ui/core';

const defaultProps = {
  showLabel: true
};

export interface Props extends OuterProps<RangeDataFormat<any>>, CustomProps {}

export function RangeField(config: Props): JSX.Element {
  const { input, errorLabel, formControl } = useField<
    RangeDataFormat<any>,
    HTMLElement,
    CustomProps
  >({
    ...config,
    validate: composeValidators([config.validate, rangeValidator])
  });
  return (
    <FormControl component='fieldset' {...formControl}>
      <Range {...input}>{config.children}</Range>
      {errorLabel && <FormHelperText {...errorLabel} />}
    </FormControl>
  );
}

RangeField.defaultProps = defaultProps;
