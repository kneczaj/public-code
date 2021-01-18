import React from "react";
import { useT } from "../../hooks/translation";
import { useField } from "../hooks/field";
import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormGroup, FormLabel } from "@material-ui/core";
import { OuterProps } from "../HOC/field";
import { CheckboxProps } from "@material-ui/core/Checkbox/Checkbox";
import { Field } from "react-final-form";

export interface Props extends OuterProps<string[]> {
  options: Array<string>,
  label: string;
  i18nPrefix?: string;
}

export function CheckboxArray({
  className,
  wrapperClassName,
  options,
  label,
  i18nPrefix,
  ...config
}: Props & CheckboxProps) {
  const t = useT();
  const { formControl, errorLabel } = useField<string[], HTMLInputElement, CheckboxProps>({
    ...config,
    type: 'checkbox'
  });
  return (
    <FormControl component='fieldset' {...formControl}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {options.map(option => <Field
          key={option}
          type={'checkbox'}
          name={config.name}
          value={option}
        >{({ input }) =>
          <FormControlLabel
            {...input}
            control={<Checkbox />}
            label={i18nPrefix ? t(`${i18nPrefix}_${option}`) : option}
          />
          }</Field>)
        }
      </FormGroup>
      {errorLabel && <FormHelperText {...errorLabel} />}
    </FormControl>
  );
}
