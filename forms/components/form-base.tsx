import React from 'react';
import {
  Form as FormFinal,
  FormProps,
  FormRenderProps
} from 'react-final-form';
import { FormName } from '../form-name-context';

export interface Props<FormValues> extends FormProps<FormValues> {
  formName: string;
  children: (props: FormRenderProps) => React.ReactNode;
}

export function FormBase<FormValues>({
  children,
  formName,
  ...rest
}: Props<FormValues>): JSX.Element {
  return (
    <FormName.Context.Provider value={formName}>
      <FormFinal<FormValues> {...rest}>{children}</FormFinal>
    </FormName.Context.Provider>
  );
}
