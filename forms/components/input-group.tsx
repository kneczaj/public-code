import React from "react";
import { FormGroupWrapper } from "./form-group-wrapper";
import { useSingleFieldContext } from "../hooks/field-context";
import { merge } from "../../css";

export interface BaseProps {
  className?: string;
  children: {
    prepend: any,
    append: any
  }
}

export interface Props extends BaseProps, Omit<React.HTMLProps<HTMLInputElement>, 'children'> {}

export function InputGroup({
  children,
  className,
  type,
  ...fieldProps
}: Props) {
  const { input, id } = useSingleFieldContext();
  return (
    <FormGroupWrapper>
      <div className={'input-group'}>
        {children.prepend && <div className={'input-group-prepend'}>{children.prepend}</div>}
        <input className={merge('form-control', className)} id={id} type={type} {...fieldProps} {...input}/>
        {children.append && <div className={'input-group-append'}>{children.append}</div>}
      </div>
    </FormGroupWrapper>
  );
}
