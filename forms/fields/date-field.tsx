import React from "react";
import {DatePicker} from "@material-ui/pickers";
import {useField} from "../hooks/field";
import {OuterProps} from "../HOC/field";
import {DatePickerProps} from "@material-ui/pickers/DatePicker/DatePicker";
import {isUndefined} from "../../util";
import {FormControl, FormHelperText} from "@material-ui/core";
import {Moment} from "moment";
import {DATE_SCALAR} from "public/graphql/graphql-moment";

interface InputElementProps extends Omit<DatePickerProps, 'defaultValue' | 'format' | 'name' | 'value' | 'onChange'> {}

export interface Props extends OuterProps<string>, InputElementProps {
  dateFormat?: DatePickerProps['format'];
}

export function DateField({ children, dateFormat, ...config }: Props): JSX.Element {
  const { input, input: { value }, formControl, errorLabel } = useField<any, HTMLDivElement, InputElementProps>({
    ...config,
    format: (value: Moment | string | undefined) => {
      if (typeof value === 'string' || isUndefined(value)) {
        return value;
      }
      return DATE_SCALAR.serialize(value);
    },
    parse: (value: Moment) => {
      return DATE_SCALAR.serialize(value)
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
