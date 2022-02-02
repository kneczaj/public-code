import React from 'react';
import { FormProps, FormRenderProps, RenderableProps } from 'react-final-form';
import { FormBase } from './form-base';
import { useCT } from '../../hooks/translation';
import { Config } from 'final-form';

/**
 * This excludes record-like part at the original FormProps
 */
interface FinalFormProps<
  FormValues = Record<string, any>,
  InitialFormValues = Partial<FormValues>
> extends Config<FormValues, InitialFormValues>,
    RenderableProps<FormRenderProps<FormValues, InitialFormValues>>,
    Pick<
      FormProps<FormValues, InitialFormValues>,
      'subscription' | 'decorators' | 'form' | 'initialValuesEqual'
    > {}

export interface Props<FormValues, InitialFormValues = FormValues>
  extends FinalFormProps<FormValues, InitialFormValues> {
  formName: string;
  className?: string;
  children: {
    main?: (props: FormRenderProps) => React.ReactNode;
    footer?: (props: FormRenderProps) => React.ReactNode;
  };
}

export function Form<
  FormValues = Record<string, any>,
  InitialFormValues = Partial<FormValues>
>({
  children: { main, footer },
  formName,
  className,
  initialValues,
  ...rest
}: Props<FormValues, InitialFormValues>): React.ReactElement {
  const ct = useCT();
  return (
    <FormBase<FormValues, InitialFormValues>
      formName={formName}
      initialValues={initialValues}
      {...rest}
    >
      {(props: FormRenderProps<any>) => (
        <form
          onSubmit={props.handleSubmit}
          className={className}
          id={`form-${formName}`}
        >
          {main && main(props)}
          {props.submitError && (
            <div className={'invalid-feedback'}>{ct(props.submitError)}</div>
          )}
          {props.error && (
            <div className={'invalid-feedback'}>{ct(props.error)}</div>
          )}
          {footer && footer(props)}
        </form>
      )}
    </FormBase>
  );
}
