import { UseFieldConfig } from '../hooks/field-format-on-blur';
import { ValidationBaseProps } from './validation';

/**
 * Props interface of the result component
 */
export interface OuterProps<FieldValue, TFormPayload>
  extends UseFieldConfig<FieldValue>,
    ValidationBaseProps<FieldValue> {
  className?: string;
  wrapperClassName?: string;
  name: keyof TFormPayload;
  showLabel?: boolean;
}
