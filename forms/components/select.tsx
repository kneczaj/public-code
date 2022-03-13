import React from 'react';
import MuiSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useT } from '../../hooks/translation';
import { capitalizeFirstLetter } from '../../util';
import { SelectProps } from '@material-ui/core/Select/Select';

export interface Props<FieldValue extends string | number | undefined>
  extends SelectProps {
  placeholder: string;
  options: FieldValue[];
  getLabel: (val: FieldValue) => string;
}

export function Select<FieldValue extends string | number | undefined>({
  getLabel,
  options,
  placeholder,
  ...input
}: Props<FieldValue>): JSX.Element {
  const t = useT();
  return (
    <MuiSelect {...input}>
      {!input.value && (
        <MenuItem value={''} disabled={true}>
          {capitalizeFirstLetter(t(placeholder))}
        </MenuItem>
      )}
      {options.map(value => (
        <MenuItem key={value} value={value}>
          {getLabel(value)}
        </MenuItem>
      ))}
    </MuiSelect>
  );
}
