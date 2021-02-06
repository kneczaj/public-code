import { useSingleFieldContext } from '../hooks/field-context';
import { isUndefined } from '../../util';

export function Label(props: unknown): JSX.Element | null {
  const {
    input: { value }
  } = useSingleFieldContext();
  if (isUndefined(value)) {
    return null;
  }
  return value;
}
