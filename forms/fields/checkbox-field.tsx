import React from 'react';
import { useT } from '../../hooks/translation';
import { useField } from '../hooks/field';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core';
import { OuterProps, SubstitutePropsTypes } from 'public/forms/models/field';
import { CheckboxProps } from '@material-ui/core/Checkbox/Checkbox';

export type Props<TFormPayload> = OuterProps<
  CheckboxProps,
  string | string[],
  TFormPayload
>;

export function CheckboxField<TFormPayload>({
  className,
  wrapperClassName,
  ...config
}: Props<TFormPayload>): JSX.Element {
  const t = useT();
  const { input, formControl, errorLabel } = useField<
    TFormPayload,
    string | string[],
    HTMLInputElement,
    SubstitutePropsTypes<CheckboxProps, Props<TFormPayload>>
  >(config);
  return (
    <FormControl {...formControl}>
      <FormControlLabel
        control={<Checkbox {...input} name={config.name as string} />}
        label={t(config.name as string)}
      />
      {errorLabel && <FormHelperText {...errorLabel} />}
    </FormControl>
  );
}
