import React, { ComponentType } from 'react';
import {
  Form as FormFinal,
  FormProps,
  FormRenderProps,
  RenderableProps
} from 'react-final-form';
import { useCT } from '../../hooks/translation';
import { Config } from 'final-form';
import { MaybeChildrenAsFn, maybePassProps } from 'public/util';
import { FormNameContext } from '../form-name-context';

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
  children: MaybeChildrenAsFn<FormRenderProps<FormValues, InitialFormValues>>;
  Footer?: ComponentType<FormRenderProps<FormValues, InitialFormValues>>;
}

export function Form<
  FormValues = Record<string, any>,
  InitialFormValues = Partial<FormValues>
>({
  children,
  Footer,
  formName,
  className,
  initialValues,
  ...rest
}: Props<FormValues, InitialFormValues>): React.ReactElement {
  const ct = useCT();
  return (
    <FormNameContext.Provider value={formName}>
      <FormFinal<FormValues, InitialFormValues>
        formName={formName}
        initialValues={initialValues}
        {...rest}
      >
        {(props: FormRenderProps<FormValues, InitialFormValues>) => (
          <form
            onSubmit={props.handleSubmit}
            className={className}
            id={`form-${formName}`}
          >
            {maybePassProps(children, props)}
            {props.submitError && (
              <div className={'invalid-feedback'}>{ct(props.submitError)}</div>
            )}
            {props.error && (
              <div className={'invalid-feedback'}>{ct(props.error)}</div>
            )}
            {Footer && <Footer {...props} />}
          </form>
        )}
      </FormFinal>
    </FormNameContext.Provider>
  );
}
