import React from 'react';
import { DatePicker } from '@material-ui/pickers';
import { useField } from '../hooks/field';
import { OuterProps, SubstitutePropsTypes } from 'public/forms/models/field';
import { DatePickerProps } from '@material-ui/pickers/DatePicker/DatePicker';
import { isNullOrUndefined } from '../../util';
import { FormControl, FormHelperText } from '@material-ui/core';
import { DateTime } from 'luxon';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { dateOnly } from '../../date-utils';

export interface PropsBase extends DatePickerProps {
  dateFormat?: DatePickerProps['format'];
}

export interface Props<TFormPayload>
  extends OuterProps<DatePickerProps, MaterialUiPickersDate, TFormPayload> {}

export function DateField<TFormPayload>({
  dateFormat,
  ...config
}: Props<TFormPayload>): JSX.Element {
  const {
    input,
    input: { value },
    formControl,
    errorLabel
  } = useField<
    TFormPayload,
    DateTime | undefined,
    HTMLDivElement,
    SubstitutePropsTypes<PropsBase, Props<TFormPayload>>
  >({
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
