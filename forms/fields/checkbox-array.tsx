import React from 'react';
import { useT } from '../../hooks/translation';
import { useField } from '../hooks/field';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  FormLabel
} from '@material-ui/core';
import { OuterProps } from 'public/forms/models/field';
import { CheckboxProps } from '@material-ui/core/Checkbox/Checkbox';
import { Field } from 'react-final-form';
import { isUndefined } from '../../util';

type TData = { [key: string]: boolean };

export interface Props extends OuterProps<TData> {
  options: Array<string>;
  label: string;
  i18nPrefix?: string;
}

export function getInitialValues(options: Props['options']): {
  [key: string]: boolean;
} {
  return options.reduce((acc, val) => ({ ...acc, [val]: false }), {});
}

export function CheckboxArray({
  // eslint-disable-next-line
  className,
  // eslint-disable-next-line
  wrapperClassName,
  options,
  label,
  i18nPrefix,
  ...config
}: Props & CheckboxProps): JSX.Element {
  const t = useT();
  const { formControl, errorLabel } = useField<
    TData,
    HTMLInputElement,
    CheckboxProps
  >({
    ...config,
    initialValue: undefined // initial values should be set at the inner level
  });
  return (
    <FormControl component='fieldset' {...formControl}>
      <FormLabel component='legend'>{label}</FormLabel>
      <FormGroup>
        {options.map(option => (
          <Field
            key={option}
            type={'checkbox'}
            name={`${config.name}.${option}`}
            initialValue={
              isUndefined(config.initialValue)
                ? false
                : config.initialValue[option] || false
            }
          >
            {({ input }) => (
              <FormControlLabel
                {...input}
                control={<Checkbox />}
                label={i18nPrefix ? t(`${i18nPrefix}_${option}`) : option}
              />
            )}
          </Field>
        ))}
      </FormGroup>
      {errorLabel && <FormHelperText {...errorLabel} />}
    </FormControl>
  );
}
