import React from 'react';
import { DatePicker } from '@material-ui/pickers';
import { useField } from '../hooks/field';
import { OuterProps } from '../HOC/field';
import { DatePickerProps } from '@material-ui/pickers/DatePicker/DatePicker';
import { isNullOrUndefined } from '../../util';
import { FormControl, FormHelperText } from '@material-ui/core';
import { DateTime } from 'luxon';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { dateOnly } from '../../date-utils';

type InputElementProps = Omit<
  DatePickerProps,
  'defaultValue' | 'format' | 'name' | 'value' | 'onChange'
>;

export interface Props
  extends OuterProps<MaterialUiPickersDate>,
    InputElementProps {
  dateFormat?: DatePickerProps['format'];
}

export function DateField({
  children,
  dateFormat,
  ...config
}: Props): JSX.Element {
  const {
    input,
    input: { value },
    formControl,
    errorLabel
  } = useField<any, HTMLDivElement, InputElementProps>({
    ...config,
    format: (value: DateTime | undefined) => {
      if (isNullOrUndefined(value)) {
        return value;
      }
      return dateOnly(value);
    },
    parse: (value: DateTime) => {
      return dateOnly(value);
    }
  });
  return (
    <FormControl {...formControl}>
      <DatePicker format={dateFormat} {...input} value={value || null} />
      {errorLabel && <FormHelperText {...errorLabel} />}
    </FormControl>
  );
}
