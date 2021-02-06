import { UseFieldConfig } from '../hooks/field-format-on-blur';
import { ValidationBaseProps } from './validation';
import { UseFieldArrayConfig } from 'react-final-form-arrays';
import { ReactNode } from 'react';

/**
 * Common props for both array and single field
 */
interface CommonBaseOuterProps<T> extends ValidationBaseProps<T> {
  className?: string;
  name: string;
  showLabel?: boolean;
}

/**
 * Base outer props for any field. This contains FinalForm props as well as generic custom props.
 */
export interface BaseOuterProps<T>
  extends UseFieldConfig<T>,
    CommonBaseOuterProps<T> {}

/**
 * Base outer props for any field array. This contains FinalForm props as well as generic custom props.
 */
export interface BaseOuterArrayProps<T>
  extends UseFieldArrayConfig<T>,
    CommonBaseOuterProps<T> {}
