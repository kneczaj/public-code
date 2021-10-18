import { merge } from '../../css';
import { isNull, isReturningReactNode } from '../../util';
import React from 'react';
import { defaultPropsBase, PropsBase } from './base';
import { LoadingIndicator } from 'public/requests/components/loading-indicator';

export interface Props<TResolvedData, TNoData = null, TData = void>
  extends PropsBase<TResolvedData, TNoData, TData> {
  className?: string;
}

export const defaultProps: Required<
  Pick<Props<any>, 'noDataPlaceholder' | 'errorPlaceholder' | 'noDataDetector'>
> = {
  ...defaultPropsBase,
  noDataDetector: isNull
};

export function Item<TData, TNoData = null>(props: Props<TData, TNoData>) {
  const {
    children,
    className,
    state,
    errorPlaceholder,
    noDataPlaceholder,
    noDataDetector
  } = props as Props<TData, TNoData> & typeof defaultProps;

  return (
    <div className={merge(className, 'flex-1 d-flex flex-column')}>
      {state.loading && <LoadingIndicator />}
      {isNull(state.error)
        ? noDataDetector(state.data)
          ? noDataPlaceholder(className)
          : isReturningReactNode(children)
          ? children({ data: state.data, className })
          : children
        : errorPlaceholder({ error: state.error, className })}
    </div>
  );
}

Item.defaultProps = defaultProps;
