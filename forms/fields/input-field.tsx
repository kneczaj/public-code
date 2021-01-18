import { OuterProps } from "../HOC/field";
import React from "react";
import { useField } from "../hooks/field";
import { TextField, TextFieldProps } from '@material-ui/core';
import { isUndefined } from "../../util";

export interface Props<FieldValue> extends OuterProps<FieldValue> {}

export function InputField<FieldValue extends string | number | string[] | undefined>({
  className,
  wrapperClassName,
  ...config
}: Props<FieldValue> & TextFieldProps) {
  const { input, formControl, errorLabel } = useField<FieldValue, HTMLInputElement, TextFieldProps>(config);
  return (
    <TextField
      {...input}
      {...formControl}
      helperText={!isUndefined(errorLabel) ? errorLabel.children : undefined}
    />
  )
}
