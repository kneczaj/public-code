import { FieldRenderProps } from 'react-final-form';

export interface ValidationBaseProps<T> {
  ignoreTouched?: boolean;
  showErrorWhen?: (props: FieldRenderProps<T, HTMLElement>) => boolean;
}
