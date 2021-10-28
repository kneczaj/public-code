import { useParams } from 'react-router-dom';
import { isUndefined } from 'public/util';
import { RouterError } from 'app/router-utils';

export function useParam(name: string): string {
  const params = useParams<{ [K in string]?: string }>();
  const value = params[name];
  if (isUndefined(value)) {
    throw new RouterError(`Required URL param "${name} not found"`);
  }
  return value;
}
