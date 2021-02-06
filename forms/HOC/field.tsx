import React, { ComponentType } from 'react';
import { ValidationBaseProps } from '../models/validation';
import { Field } from '../components/field';
import { BaseOuterProps } from '../models/field';

/**
 * Common inner and outer props
 */
export interface ControlBaseProps {
  className?: string;
  wrapperClassName?: string;
}

/**
 * Props required from a wrapped component
 */
export interface InnerProps extends ControlBaseProps {
  label?: string;
}

/**
 * Props interface of the result component
 */
export interface OuterProps<FieldValue>
  extends BaseOuterProps<FieldValue>,
    ValidationBaseProps<FieldValue>,
    ControlBaseProps {}

export const withField = <TControl extends ControlBaseProps, FieldValue = any>(
  WrappedComponent: ComponentType<InnerProps & TControl>
) => ({
  // UseFieldConfig
  afterSubmit,
  allowNull,
  beforeSubmit,
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
  value,
  // validation props
  ignoreTouched,
  showErrorWhen,
  // Other Field props
  name,
  showLabel,
  ...innerComponentProps
}: OuterProps<FieldValue> & TControl) => {
  const fieldWrapperProps = {
    afterSubmit,
    allowNull,
    beforeSubmit,
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
    value,
    // validation props
    ignoreTouched,
    showErrorWhen,
    // Other Field props
    name,
    showLabel
  };
  return (
    <Field {...fieldWrapperProps}>
      <WrappedComponent {...((innerComponentProps as unknown) as TControl)} />
    </Field>
  );
};
