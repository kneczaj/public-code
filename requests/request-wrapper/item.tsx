import { merge } from '../../css';
import { isNotNull, isNull, isReturningReactNode } from '../../util';
import React from 'react';
import { defaultPropsBase, PropsBase } from './base';
import { LoadingIndicator } from 'public/requests/components/loading-indicator';

export interface Props<TResolvedData, TNoData = null, TData = void>
  extends PropsBase<TResolvedData, TNoData, TData> {
  className?: string;
}

export const defaultProps: Required<
  Pick<Props<any>, 'noDataPlaceholder' | 'errorPlaceholder' | 'hasData'>
> = {
  ...defaultPropsBase,
  hasData: isNotNull
};

export function Item<TData, TNoData = null>(props: Props<TData, TNoData>) {
  const {
    children,
    className,
    state,
    errorPlaceholder,
    noDataPlaceholder,
    hasData
  } = { ...defaultProps, ...props };

  return (
    <div className={merge(className, 'flex-1 d-flex flex-column')}>
      {state.loading && <LoadingIndicator />}
      {isNull(state.error)
        ? hasData(state.data)
          ? isReturningReactNode(children)
            ? children({ data: state.data, className })
            : children
          : noDataPlaceholder(className)
        : errorPlaceholder({ error: state.error, className })}
    </div>
  );
}
