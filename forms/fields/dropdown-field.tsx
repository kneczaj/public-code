import React, { useCallback } from 'react';
import { useField } from '../hooks/field';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useT } from '../../hooks/translation';
import { capitalizeFirstLetter } from '../../util';
import { SelectProps } from '@material-ui/core/Select/Select';
import { OuterProps } from 'public/forms/models/field';
import { Select, Props as PropsBase } from 'public/forms/components';

export function StrDropdownField(
  props: Omit<Props<string>, 'getLabel'> & SelectProps
): JSX.Element {
  const t = useT();
  const getLabel = useCallback(val => capitalizeFirstLetter(t(val)), [t]);
  return <DropdownField getLabel={getLabel} {...props} />;
}

export interface Props<FieldValue extends string | number | undefined>
  extends OuterProps<FieldValue>,
    PropsBase<FieldValue> {
  className?: string;
  wrapperClassName?: string;
}

export function DropdownField<FieldValue extends string | number | undefined>({
  className,
  wrapperClassName,
  ...config
}: Props<FieldValue> & SelectProps): JSX.Element {
  const t = useT();
  const { input, formControl, errorLabel } = useField<
    FieldValue,
    HTMLElement,
    SelectProps
  >(config);
  return (
    <FormControl
      {...formControl}
      variant={'filled'}
      className={wrapperClassName}
      fullWidth={config.fullWidth}
    >
      <InputLabel>{capitalizeFirstLetter(t(input.placeholder))}</InputLabel>
      <Select {...input} />
      <FormHelperText {...errorLabel} />
    </FormControl>
  );
}
