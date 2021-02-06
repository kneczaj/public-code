import React from 'react';
import { isUndefined } from '../../util';
import { useCommonFieldContext } from '../hooks/field-context';

export function FieldLabel() {
  // empty string should also return nothing
  const { id, label } = useCommonFieldContext();
  if (isUndefined(label)) {
    return null;
  }
  return <label htmlFor={id}>{label}</label>;
}
