import { useParams } from 'react-router-dom';
import { isUndefined } from 'public/util';
import { RouterError } from 'app/router-utils';

export function useParam<
  RoutingParams extends { [K in string]?: string },
  TOut = string
>(
  name: string,
  transformer: TOut extends string ? undefined : (original: string) => TOut
): TOut extends string ? string : TOut {
  const params = useParams<RoutingParams>();
  const value = params[name];
  if (isUndefined(value)) {
    throw new RouterError(`Required URL param "${name} not found"`);
  }
  // @ts-ignore
  return isUndefined(transformer) ? value : transformer(value);
}
