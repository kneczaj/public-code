import { composeValidators, rangeValidator } from "../validation";
import { Range, Props as BaseProps } from "../components/range";
import { BaseOuterProps } from "../models/field";
import { Field } from "../components/field";
import React from "react";
import { RangeDataFormat } from "../models/range";

const defaultProps = {
  showLabel: true
}

export interface Props extends BaseOuterProps<boolean>, BaseProps {}

export function RangeField({ children, validate, ...props }: Props) {
  return (
    <Field<RangeDataFormat> {...props} validate={composeValidators([validate, rangeValidator])}>
      <Range>{children}</Range>
    </Field>
  );
}

RangeField.defaultProps = defaultProps;
