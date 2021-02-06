import { isNotUndefined } from 'public/util';

export interface WithResolve<TResolvedData, TNoData, TData> {
  resolveFn: (data: TData | TNoData) => TResolvedData;
}

export type AddResolve<
  BaseInterface,
  TResolvedData,
  TNoData,
  TData
> = TData extends void
  ? BaseInterface
  : BaseInterface & WithResolve<TResolvedData, TNoData, TData>;

export function isWithResolve<
  BaseInterface,
  TResolvedData,
  TNoData,
  TData = void
>(
  props: AddResolve<BaseInterface, TResolvedData, TNoData, TData>
  // @ts-ignore
): props is WithResolve<TResolvedData, TNoData, TData> {
  return isNotUndefined(
    (props as WithResolve<TResolvedData, TNoData, TData>).resolveFn
  );
}
