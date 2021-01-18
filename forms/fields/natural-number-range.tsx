import { InputField } from "./input-field";
import { composeValidators, isNaturalNumber } from "../../forms/validation";
import React from "react";
import { RangeField } from "./range-field";
import { FieldValidator } from "final-form";

export interface Props {
  name: string;
  validate?: FieldValidator<any>;
}

export function parse(value: any, name: string): number | undefined {
  // Number('') is 0, so no way to remove the value without this
  if (value === '') {
    return undefined;
  }
  const parsed = Number(value);
  // any number
  if (!Number.isNaN(parsed)) {
    return parsed;
  }
  // null, undefined, empty string
  if (!value) {
    return undefined;
  }
  // any other, probably string
  return value;
}

export function NaturalNumberRange({ name, validate }: Props) {
  return (
    <RangeField
      name={name}
      validate={validate}
    >{{
      minField: (name: string, wrapperClassName: string, placeholder: string) =>
        <InputField
          name={name}
          wrapperClassName={wrapperClassName}
          placeholder={placeholder}
          validate={composeValidators([isNaturalNumber, validate])}
          showLabel={false}
          parse={parse}
        />,
      maxField: (name: string, wrapperClassName: string, placeholder: string) =>
        <InputField
          name={name}
          wrapperClassName={wrapperClassName}
          placeholder={placeholder}
          validate={composeValidators([isNaturalNumber, validate])}
          showLabel={false}
          parse={parse}
        />
    }}</RangeField>
  )
}
