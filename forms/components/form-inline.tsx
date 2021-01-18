import React from "react";
import { FormBase, Props as FormBaseProps } from "./form-base";
import { FormRenderProps } from "react-final-form";
import { Form } from "./form";

export interface Props<FormValues> extends FormBaseProps<FormValues> {
  children: (props: FormRenderProps) => React.ReactNode;
}

export function FormInline({ children, ...base }: Props<any>) {
  return (
    <Form {...base} className={'form-inline'}>{{
      main: children
    }}</Form>
  );
}
