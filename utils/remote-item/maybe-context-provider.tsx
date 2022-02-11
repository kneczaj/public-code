import { Context, ReactNode } from 'react';
import { isUndefined } from 'public/util';

export interface Props<T> {
  Context: Context<T> | undefined;
  value: T;
  children: ReactNode;
}

export function MaybeContextProvider<T>({
  children,
  Context,
  value
}: Props<T>): JSX.Element {
  if (isUndefined(Context)) {
    return <>{children}</>;
  }
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
