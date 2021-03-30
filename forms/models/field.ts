import { UseFieldConfig } from '../hooks/field-format-on-blur';
import { ValidationBaseProps } from './validation';

/**
 * Props interface of the result component
 */
export interface OuterProps<FieldValue>
  extends UseFieldConfig<FieldValue>,
    ValidationBaseProps<FieldValue> {
  className?: string;
  wrapperClassName?: string;
  name: string;
  showLabel?: boolean;
}
