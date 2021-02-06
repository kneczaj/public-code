import React, { useContext } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { isUndefined } from '../../util';
import { ValidationBaseProps } from '../models/validation';
import { FieldArrayRenderProps } from 'react-final-form-arrays';

/**
 * For both field and field-array
 */
export interface BaseFieldContextProps<T> extends ValidationBaseProps<T> {
  id: string;
  label?: string;
}

export interface SingleFieldContext<T>
  extends BaseFieldContextProps<T>,
    FieldRenderProps<T, HTMLElement> {}

export interface ArrayFieldContext<T>
  extends BaseFieldContextProps<T>,
    FieldArrayRenderProps<T, HTMLElement> {}

export type FieldContextProps<T> = ArrayFieldContext<T> | SingleFieldContext<T>;

export const FieldContext = React.createContext<
  FieldContextProps<any> | undefined
>(undefined);

function isSingleFieldContext(
  val: FieldContextProps<any>
): val is SingleFieldContext<any> {
  return !isUndefined((val as SingleFieldContext<any>).input);
}

function isFieldArrayContext(
  val: FieldContextProps<any>
): val is ArrayFieldContext<any> {
  return !isUndefined((val as ArrayFieldContext<any>).fields);
}

/**
 * Returns the content without type checks
 */
export function useCommonFieldContext(): FieldContextProps<any> {
  const val = useContext(FieldContext);
  if (isUndefined(val)) {
    throw new Error(
      'useCommonFieldContext needs to be used inside the context provider'
    );
  }
  return val;
}

export function useSingleFieldContext() {
  const common = useCommonFieldContext();
  if (isSingleFieldContext(common)) {
    return common;
  }
  throw new Error(
    'useSingleFieldContext needs to be used inside the context provider'
  );
}

export function useArrayFieldContext() {
  const common = useCommonFieldContext();
  if (isFieldArrayContext(common)) {
    return common;
  }
  throw new Error(
    'useArrayFieldContext needs to be used inside the context provider'
  );
}
