import { useParams } from 'react-router-dom';
import { isUndefined } from 'public/util';

export class RouterError extends Error {}

export function useParam<
  RoutingParams extends { [K in string]?: string },
  TOut = string
>(name: string): TOut extends string ? string : TOut {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
  const params = useParams<RoutingParams>();
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
  const value = params[name];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (isUndefined(value)) {
    throw new RouterError(`Required URL param "${name} not found"`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return value;
}
