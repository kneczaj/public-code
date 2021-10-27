import { FormName } from '../form-name-context';
import { toId } from '../utils';

export function useId(fieldName: string): string {
  const formName: string = FormName.useContext();
  return toId(`${formName}-${fieldName}`);
}
