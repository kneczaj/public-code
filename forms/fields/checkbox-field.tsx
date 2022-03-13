import React from 'react';
import { useT } from '../../hooks/translation';
import { useField } from '../hooks/field';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core';
import { OuterProps } from 'public/forms/models/field';
import { CheckboxProps } from '@material-ui/core/Checkbox/Checkbox';

export type Props<TFormPayload> = OuterProps<string | string[], TFormPayload>;

export function CheckboxField<TFormPayload>({
  className,
  wrapperClassName,
  ...config
}: Props<TFormPayload> & CheckboxProps): JSX.Element {
  const t = useT();
  const { input, formControl, errorLabel } = useField<
    TFormPayload,
    string | string[],
    HTMLInputElement,
    CheckboxProps
  >(config);
  return (
    <FormControl {...formControl}>
      <FormControlLabel
        control={<Checkbox {...input} name={config.name} />}
        label={t(config.name)}
      />
      {errorLabel && <FormHelperText {...errorLabel} />}
    </FormControl>
  );
}
