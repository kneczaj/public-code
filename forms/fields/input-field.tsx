import { OuterProps, SubstitutePropsTypes } from 'public/forms/models/field';
import React from 'react';
import { useField } from '../hooks/field';
import { TextField, TextFieldProps } from '@material-ui/core';
import { isUndefined } from '../../util';
import { naturalNumberFormat, naturalNumberParser } from '../parser';

export type Props<FieldValue, TFormPayload> = OuterProps<
  TextFieldProps,
  FieldValue,
  TFormPayload
>;

export function InputField<
  TFormPayload,
  FieldValue extends string | number | string[] | undefined
>({
  className,
  wrapperClassName,
  ...config
}: Props<FieldValue, TFormPayload>): JSX.Element {
  const {
    input,
    input: { value },
    formControl,
    errorLabel
  } = useField<
    TFormPayload,
    FieldValue,
    HTMLInputElement,
    SubstitutePropsTypes<TextFieldProps, Props<FieldValue, TFormPayload>>
  >(config);
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
export function NaturalNumberInputField<TFormPayload>(
  props: Omit<Props<number, TFormPayload>, 'parse' | 'type'>
) {
  return (
    <InputField<TFormPayload, number>
      {...props}
      inputProps={{
        inputMode: 'numeric'
      }}
      parse={naturalNumberParser}
      format={naturalNumberFormat}
    />
  );
}
