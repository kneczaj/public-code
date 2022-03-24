import { useFormName } from '../form-name-context';
import { toId } from '../utils';

export function useId(fieldName: string): string {
  const formName: string = useFormName();
  return toId(`${formName}-${fieldName}`);
}
