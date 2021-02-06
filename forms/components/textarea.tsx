import React from 'react';
import { useSingleFieldContext } from '../hooks/field-context';
import { FormGroupWrapper } from './form-group-wrapper';
import { merge } from '../../css';

/**
 * This props are not provided by Final Form and should be filled by user externally
 */
export interface BaseProps
  extends Omit<React.HTMLProps<HTMLTextAreaElement>, 'id'> {
  className?: string;
  wrapperClassName?: string;
}

export type Props = BaseProps;

export function Textarea({
  children,
  className,
  label,
  type,
  wrapperClassName,
  ...rest
}: Props) {
  const { input, id } = useSingleFieldContext();
  return (
    <FormGroupWrapper className={wrapperClassName}>
      <textarea
        className={merge('form-control', className)}
        id={id}
        {...input}
        {...rest}
      />
    </FormGroupWrapper>
  );
}
