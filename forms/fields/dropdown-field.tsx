import React, { useCallback } from 'react';
import { useField } from '../hooks/field';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useT } from '../../hooks/translation';
import { capitalizeFirstLetter } from '../../util';
import { OuterProps, SubstitutePropsTypes } from 'public/forms/models/field';
import { Select, Props as PropsBase } from 'public/forms/components/select';

export function StrDropdownField<TFormPayload>(
  props: Omit<Props<string, TFormPayload>, 'getLabel'>
): JSX.Element {
  const t = useT();
  const getLabel = useCallback(val => capitalizeFirstLetter(t(val)), [t]);
  return <DropdownField getLabel={getLabel} {...props} />;
}

export interface Props<
  FieldValue extends string | number | undefined,
  TFormPayload
> extends OuterProps<PropsBase<FieldValue>, FieldValue, TFormPayload> {}

export function DropdownField<
  FieldValue extends string | number | undefined,
  TFormPayload
>({
  className,
  wrapperClassName,
  ...config
}: Props<FieldValue, TFormPayload>): JSX.Element {
  const t = useT();
  const { input, formControl, errorLabel } = useField<
    TFormPayload,
    FieldValue,
    HTMLElement,
    SubstitutePropsTypes<PropsBase<FieldValue>, Props<FieldValue, TFormPayload>>
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
