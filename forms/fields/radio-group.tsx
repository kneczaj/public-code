import React from 'react';
import { useT } from '../../hooks/translation';
import { useField } from '../hooks/field';
import {
  Radio,
  FormControl,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  FormLabel
} from '@material-ui/core';
import { OuterProps } from 'public/forms/models/field';
import { RadioProps } from '@material-ui/core/Radio/Radio';
import { Field } from 'react-final-form';

export interface Props extends OuterProps<string[]> {
  options: Array<string>;
  label: string;
  i18nPrefix?: string;
}

export function RadioSelect({
  className,
  wrapperClassName,
  options,
  label,
  i18nPrefix,
  ...config
}: Props & RadioProps) {
  const t = useT();
  const { formControl, errorLabel } = useField<
    string[],
    HTMLInputElement,
    RadioProps
  >({
    ...config,
    type: 'radio'
  });
  return (
    <FormControl component='fieldset' {...formControl}>
      <FormLabel component='legend'>{label}</FormLabel>
      <RadioGroup>
        {options.map(option => (
          <Field key={option} type={'radio'} name={config.name} value={option}>
            {({ input }) => (
              <FormControlLabel
                {...input}
                control={<Radio />}
                label={i18nPrefix ? t(`${i18nPrefix}_${option}`) : option}
              />
            )}
          </Field>
        ))}
      </RadioGroup>
      {errorLabel && <FormHelperText {...errorLabel} />}
    </FormControl>
  );
}
