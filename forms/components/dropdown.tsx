import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useT } from '../../hooks/translation';
import { capitalizeFirstLetter } from '../../util';
import { SelectProps } from '@material-ui/core/Select/Select';

export interface Props<FieldValue extends string | number | undefined> {
  placeholder: string;
  options: FieldValue[];
  getLabel: (val: FieldValue) => string;
}

export function Dropdown<FieldValue extends string | number | undefined>({
  getLabel,
  options,
  placeholder,
  ...input
}: Props<FieldValue> & SelectProps): JSX.Element {
  const t = useT();
  return (
    <Select {...input}>
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
    </Select>
  );
}
