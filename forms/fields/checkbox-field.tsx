import React from 'react';
import { useT } from '../../hooks/translation';
import { useField } from '../hooks/field';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core';
import { OuterProps } from '../HOC/field';
import { CheckboxProps } from '@material-ui/core/Checkbox/Checkbox';

export type Props = OuterProps<string | string[]>;

export function CheckboxField({
  className,
  wrapperClassName,
  ...config
}: Props & CheckboxProps) {
  const t = useT();
  const { input, formControl, errorLabel } = useField<
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
