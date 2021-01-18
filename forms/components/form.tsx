import React from "react";
import { FormProps, FormRenderProps } from "react-final-form";
import { FormBase } from "./form-base";
import { useT } from "../../hooks/translation";

export interface Props<FormValues> extends FormProps<FormValues> {
  formName: string;
  className?: string;
  children: {
    main?: (props: FormRenderProps) => React.ReactNode,
    footer?: (props: FormRenderProps) => React.ReactNode
  };
}

export function Form<FormValues = any>({
  children: {
    main,
    footer },
  formName,
  className,
  initialValues,
  ...rest
}: Props<FormValues>): React.ReactElement {
  const t = useT();
  return (
    <FormBase<FormValues> formName={formName} initialValues={initialValues as FormValues} {...rest}>{(props: FormRenderProps<any>) =>
      <form onSubmit={props.handleSubmit} className={className} id={`form-${formName}`}>
        {main && main(props)}
        {props.submitError && <div className={'invalid-feedback'}>{t(props.submitError)}</div>}
        {props.error && <div className={'invalid-feedback'}>{t(props.error)}</div>}
        {footer && footer(props)}
      </form>
    }</FormBase>
  );
}
