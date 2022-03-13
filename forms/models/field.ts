import { UseFieldConfig } from '../hooks/field-format-on-blur';
import { ValidationBaseProps } from './validation';

/**
 * Returns TBase with interfering prop types changed to the ones from TNew
 */
export type SubstitutePropsTypes<TBase, TNew> = Omit<TBase, keyof TNew> &
  Pick<TNew, keyof TBase & keyof TNew>;

/**
 * Outer props + Base props which do not have the same names as TOuter
 */
type OuterPropsTypes<TBase, TOuter> = Omit<TBase, keyof TOuter> & TOuter;

/**
 * Props interface of the result component
 */
interface OuterPropsBase<FieldValue, TFormPayload>
  extends UseFieldConfig<FieldValue>,
    ValidationBaseProps<FieldValue> {
  className?: string;
  wrapperClassName?: string;
  name: keyof TFormPayload;
  showLabel?: boolean;
}

export type OuterProps<TBaseProps, TFieldValue, TFormPayload> = OuterPropsTypes<
  TBaseProps,
  OuterPropsBase<TFieldValue, TFormPayload>
>;
