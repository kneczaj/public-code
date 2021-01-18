import React from "react";
import { capitalizeFirstLetter } from "../../util";
import { useFormName } from "../form-name-context";
import { Field as FieldBase, FieldRenderProps } from "react-final-form";
import { toId } from "../utils";
import { FieldContext } from "../hooks/field-context";
import { BaseOuterProps } from "../models/field";
import { useT } from "../../hooks/translation";

export interface Props<T> extends BaseOuterProps<T> {
  children: any;
}

const defaultProps = {
  showLabel: true
};

export function Field<FieldValue = any>({
  children,
  ignoreTouched,
  name,
  showErrorWhen,
  showLabel,
  className,
  formatOnBlur,
  ...rest
}: Props<any>) {
  const t = useT();
  const formName: string = useFormName();
  const id = toId(`${formName}-${name}`);
  const label = showLabel ? capitalizeFirstLetter(t(name)) : undefined;
  return (
    <FieldBase
      name={name}
      {...rest}
    >{(props: FieldRenderProps<any, HTMLElement>) =>
      <FieldContext.Provider value={{ ignoreTouched, showErrorWhen, id, label, ...props }}>{
        children
      }</FieldContext.Provider>
    }</FieldBase>
  );
}

Field.defaultProps = defaultProps;
