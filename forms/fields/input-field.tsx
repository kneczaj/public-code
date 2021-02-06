import { OuterProps } from '../HOC/field';
import React from 'react';
import { useField } from '../hooks/field';
import { TextField, TextFieldProps } from '@material-ui/core';
import { isUndefined } from '../../util';
import { naturalNumberFormat, naturalNumberParser } from '../parser';

type PropsBase<FieldValue> = OuterProps<FieldValue>;

export type Props<FieldValue> = PropsBase<FieldValue> & TextFieldProps;

export function InputField<
  FieldValue extends string | number | string[] | undefined
>({ className, wrapperClassName, ...config }: Props<FieldValue>) {
  const {
    input,
    input: { value },
    formControl,
    errorLabel
  } = useField<FieldValue, HTMLInputElement, TextFieldProps>(config);
  return (
    <TextField
      {...input}
      {...formControl}
      value={value || ''}
      helperText={!isUndefined(errorLabel) ? errorLabel.children : undefined}
    />
  );
}

/**
 * WARNING: This should be always used together with isNaturalNumber validator,
 * so only real numbers will pass validation.
 *
 * This should not be used with type prop, because it messes keys restrictions.
 *
 * It shows numeric keyboard on mobile
 * @param props
 */
export function NaturalNumberInputField(
  props: Omit<Props<number>, 'parse' | 'type'>
) {
  return (
    <InputField
      {...props}
      inputProps={{
        inputMode: 'numeric'
      }}
      parse={naturalNumberParser}
      format={naturalNumberFormat}
    />
  );
}
