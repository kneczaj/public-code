import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { useField } from "../hooks/field";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { OuterProps } from "../HOC/field";
import { DatePickerProps } from "@material-ui/pickers/DatePicker/DatePicker";
import { isNullOrUndefined } from "../../util";
import { FormControl, FormHelperText } from "@material-ui/core";

interface InputElementProps extends Omit<DatePickerProps, 'defaultValue' | 'format' | 'name' | 'value' | 'onChange'> {}

export interface Props extends OuterProps<MaterialUiPickersDate>, InputElementProps {
  dateFormat?: DatePickerProps['format'];
}

export function DateField({ children, dateFormat, ...config }: Props): JSX.Element {
  const { input, input: { value }, formControl, errorLabel } = useField<MaterialUiPickersDate, HTMLDivElement, InputElementProps>({
    ...config,
    format: value => {
      if (isNullOrUndefined(value)) {
        return value;
      }
      return value.utc().startOf('day').toISOString();
    }
  });
  return (
    <FormControl {...formControl}>
      <DatePicker
        format={dateFormat}
        {...input}
        value={value || null}
      />
      {errorLabel && <FormHelperText {...errorLabel}/>}
    </FormControl>
  );
}
