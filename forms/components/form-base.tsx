import React from 'react';
import {
  Form as FormFinal,
  FormProps,
  FormRenderProps
} from 'react-final-form';
import { FormName } from '../form-name-context';

export interface Props<
  FormValues = Record<string, any>,
  InitialFormValues = Partial<FormValues>
> extends FormProps<FormValues, InitialFormValues> {
  formName: string;
  children: (props: FormRenderProps) => React.ReactNode;
}

export function FormBase<
  FormValues = Record<string, any>,
  InitialFormValues = Partial<FormValues>
>({
  children,
  formName,
  ...rest
}: Props<FormValues, InitialFormValues>): JSX.Element {
  return (
    <FormName.Context.Provider value={formName}>
      <FormFinal<FormValues, InitialFormValues> {...rest}>{children}</FormFinal>
    </FormName.Context.Provider>
  );
}
