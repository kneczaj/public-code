import {
  FieldInputProps,
  FieldMetaState,
  FieldRenderProps
} from "react-final-form";
import { useId } from "./id";
import { useT } from "../../hooks/translation";
import { FormControlTypeMap } from "@material-ui/core";
import { capitalizeFirstLetter, isUndefined } from "../../util";
import { FormHelperTextTypeMap } from "@material-ui/core/FormHelperText/FormHelperText";
import { DefaultComponentProps } from "@material-ui/core/OverridableComponent";
import { useFieldFormatOnBlur, UseFieldConfig } from "./field-format-on-blur";

interface CustomInput<FieldValue, T extends HTMLElement = HTMLElement> extends FieldInputProps<FieldValue, T> {
  id: string;
}

export interface Hook<FieldValue, TInputElementProps, T extends HTMLElement = HTMLElement> {
  input: CustomInput<FieldValue, T> & TInputElementProps;
  meta: FieldMetaState<FieldValue>;
  formControl: Pick<FormControlTypeMap['props'], 'error' | 'hiddenLabel'>;
  /**
   * is undefined when no error produced, so the error label can be hidden
   */
  errorLabel?: DefaultComponentProps<FormHelperTextTypeMap>
}

export interface Props<FieldValue> extends UseFieldConfig<FieldValue> {
  name: string;
  showErrorWhen?: (props: FieldRenderProps<FieldValue>) => boolean;
  ignoreTouched?: boolean;
}

function shouldShowError<FieldValue>(
  { error, submitError, touched }: FieldMetaState<FieldValue>,
  ignoreTouched?: boolean
): boolean {
  const displayedError = error || submitError;
  // this will be false when error comes from child element
  const isString = typeof displayedError === "string";
  if (!isString) {
    return false;
  }
  if (!ignoreTouched && !touched) {
    return false;
  }
  return !!displayedError;
}

export function useField<FieldValue = any, T extends HTMLElement = HTMLElement, TInputElementProps = any>(
  props: Props<FieldValue> & TInputElementProps
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
  } = props as Required<Props<FieldValue>>;
  const id = useId(name);
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
  const field = useFieldFormatOnBlur(name, config);
  const helperTextId = `${id}-helper-text`;
  const showError = shouldShowError(field.meta) && (!isUndefined(showErrorWhen) ? showErrorWhen(field) : true);
  return {
    ...field,
    input: {
      ...field.input,
      'aria-describedby': showError ? helperTextId : undefined,
      id,
      ...inputElementProps as unknown as TInputElementProps
    },
    formControl: {
      error: showError
    },
    errorLabel: showError
      ? {
        id: helperTextId,
        children: capitalizeFirstLetter(t(field.meta.error || field.meta.submitError))
      }
      : undefined
  }
}
