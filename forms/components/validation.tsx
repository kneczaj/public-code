import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import './validation.sass';
import { capitalizeFirstLetter, isUndefined } from '../../util';
import { ValidationBaseProps } from '../models/validation';
import { useCommonFieldContext } from '../hooks/field-context';
import { useT } from '../../hooks/translation';

export type Props = Pick<ValidationBaseProps<any>, 'ignoreTouched'>;

export const Validation = (props: Props) => {
  const contextProps = useCommonFieldContext();
  const {
    ignoreTouched: ignoreTouchedFromContext,
    showErrorWhen,
    ...fieldProps
  } = contextProps;
  const {
    meta: { error, submitError, touched }
  } = fieldProps;
  const displayedError = error || submitError;
  const t = useT();
  const ignoreTouched = isUndefined(props.ignoreTouched)
    ? ignoreTouchedFromContext
    : props.ignoreTouched;
  // this will be false when error comes from child element
  const isString = typeof displayedError === 'string';
  if (!isString) {
    return null;
  }
  if (!ignoreTouched && !touched) {
    return null;
  }
  if (
    !isUndefined(showErrorWhen) &&
    !showErrorWhen(fieldProps as FieldRenderProps<any, HTMLElement>)
  ) {
    return null;
  }
  return (
    <div className={'invalid-feedback'}>
      {capitalizeFirstLetter(t(displayedError))}
    </div>
  );
};
