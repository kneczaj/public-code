import { OuterProps } from "../HOC/field";
import React, { useCallback } from "react";
import { useField } from "../hooks/field";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useT } from "../../hooks/translation";
import { capitalizeFirstLetter } from "../../util";
import { SelectProps } from "@material-ui/core/Select/Select";

export function StrDropdownField(props: Omit<Props<string>, 'getLabel'> & SelectProps) {
  const t = useT();
  const getLabel = useCallback(val => capitalizeFirstLetter(t(val)), [t]);
  return (
    <DropdownField getLabel={getLabel} {...props}/>
  );
}

export interface Props<FieldValue extends string | number | undefined> extends OuterProps<FieldValue> {
  className?: string;
  wrapperClassName?: string;
  placeholder: string;
  options: FieldValue[];
  getLabel: (val: FieldValue) => string;
}

export function DropdownField<FieldValue extends string | number | undefined>({
  className,
  getLabel,
  options,
  placeholder,
  wrapperClassName,
  ...config
}: Props<FieldValue> & SelectProps) {
  const t = useT();
  const { input, formControl, errorLabel } = useField<FieldValue, HTMLElement, SelectProps>(config);
  return (
    <FormControl {...formControl} variant={'filled'} className={wrapperClassName} fullWidth={config.fullWidth}>
      <InputLabel>{capitalizeFirstLetter(t(placeholder))}</InputLabel>
      <Select
        {...input}
      >
        {!input.value && <MenuItem value={''} disabled={true}>{capitalizeFirstLetter(t(placeholder))}</MenuItem>}
        {options.map(value => <MenuItem value={value}>{getLabel(value)}</MenuItem>)}
      </Select>
      <FormHelperText {...errorLabel}/>
    </FormControl>
  );
}
