import {
  FieldInputProps,
  FieldMetaState,
  FieldRenderProps
} from 'react-final-form';
import { useId } from './id';
import { useT } from '../../hooks/translation';
import { FormControlTypeMap } from '@material-ui/core';
import { capitalizeFirstLetter, isUndefined } from '../../util';
import { FormHelperTextTypeMap } from '@material-ui/core/FormHelperText/FormHelperText';
import { DefaultComponentProps } from '@material-ui/core/OverridableComponent';
import { useFieldFormatOnBlur, UseFieldConfig } from './field-format-on-blur';
import { useMemo } from 'react';
import { TranslationFunction } from 'i18next';

export interface CustomInput<FieldValue, T extends HTMLElement = HTMLElement>
  extends FieldInputProps<FieldValue, T> {
  id: string;
}

export interface Hook<
  FieldValue,
  TInputElementProps,
  T extends HTMLElement = HTMLElement
> {
  input: CustomInput<FieldValue, T> & TInputElementProps;
  meta: FieldMetaState<FieldValue>;
  formControl: Pick<FormControlTypeMap['props'], 'error' | 'hiddenLabel'>;
  /**
   * is undefined when no error produced, so the error label can be hidden
   */
  errorLabel?: DefaultComponentProps<FormHelperTextTypeMap>;
}

export interface Props<FieldValue, TFormPayload>
  extends UseFieldConfig<FieldValue> {
  name: keyof TFormPayload;
  showErrorWhen?: (props: FieldRenderProps<FieldValue>) => boolean;
  ignoreTouched?: boolean;
}

export function getDisplayedError<FieldValue>(
  {
    error,
    submitError
  }: Pick<FieldMetaState<FieldValue>, 'error' | 'submitError'>,
  t: TranslationFunction
): string | undefined {
  const displayedError = [error, submitError].filter(error => {
    // this will be false when error comes from child element
    const isString = typeof error === 'string';
    const isArray = Array.isArray(error);
    return isString || isArray;
  })[0];
  if (isUndefined(displayedError)) {
    return undefined;
  }
  // @ts-ignore
  return t(...[].concat(displayedError));
}

export function useField<
  TFormPayload,
  FieldValue = any,
  T extends HTMLElement = HTMLElement,
  TInputElementProps = any
>(
  props: Props<FieldValue, TFormPayload> & TInputElementProps
): Hook<FieldValue, TInputElementProps, T> {
  const t = useT();
  const {
    afterSubmit,
    allowNull,
    beforeSubmit,
    defaultValue,
    data,
    format,
    formatOnBlur,
    initialValue,
    isEqual,
    multiple,
    parse,
    subscription,
    type,
    validate,
    validateFields,
    value,
    // custom
    name,
    showErrorWhen,
    ignoreTouched,
    ...inputElementProps
  } = props as Required<Props<FieldValue, TFormPayload>>;
  const id = useId(name as string);
  // type checking in case UseFieldConfig interface changes, so it is sure this contains all the needed properties
  // to really check these changes artificial 'Required' is there
  const config: Required<UseFieldConfig<FieldValue>> = {
    afterSubmit,
    allowNull,
    beforeSubmit,
    data,
    defaultValue,
    format,
    formatOnBlur,
    initialValue,
    isEqual,
    multiple,
    parse,
    subscription,
    type,
    validate,
    validateFields,
    value
  };
  const field = useFieldFormatOnBlur(name as string, config);
  const helperTextId = `${id}-helper-text`;
  const errorString: string | undefined = useMemo(() => {
    if (!ignoreTouched && !field.meta.touched) {
      return undefined;
    }
    if (showErrorWhen && !showErrorWhen(field)) {
      return undefined;
    }
    return getDisplayedError(field.meta, t);
  }, [field, showErrorWhen, ignoreTouched, t]);
  return {
    ...field,
    input: {
      ...field.input,
      'aria-describedby': !!errorString ? helperTextId : undefined,
      id,
      ...(inputElementProps as unknown as TInputElementProps)
    },
    formControl: {
      error: !!errorString
    },
    errorLabel: !!errorString
      ? {
          id: helperTextId,
          children: capitalizeFirstLetter(errorString)
        }
      : undefined
  };
}
