import { merge } from '../../css';
import { isNotNull, isNull, isReturningReactNode } from '../../util';
import React from 'react';
import { PropsBase } from './models';
import { DefaultLoadingIndicator } from 'public/requests/components/loading-indicator';
import { DefaultErrorPlaceholder } from 'public/requests/components/error-placeholder';
import { DefaultNoDataPlaceholder } from 'public/requests/components/no-data-placeholder';

export interface Props<TData, TNoData = null>
  extends PropsBase<TData, TNoData> {}

export function Item<TData, TNoData = null>({
  children,
  className,
  state,
  ErrorPlaceholder = DefaultErrorPlaceholder,
  NoDataPlaceholder = DefaultNoDataPlaceholder,
  LoadingIndicator = DefaultLoadingIndicator,
  hasData = (data: TData | TNoData): data is TData => isNotNull(data)
}: Props<TData, TNoData>) {
  return (
    <div className={merge(className, 'flex-1 d-flex flex-column')}>
      {state.loading && <LoadingIndicator />}
      {isNull(state.error) ? (
        hasData(state.data) ? (
          isReturningReactNode(children) ? (
            children({ data: state.data, className })
          ) : (
            children
          )
        ) : (
          <NoDataPlaceholder className={className} />
        )
      ) : (
        <ErrorPlaceholder value={state.error} className={className} />
      )}
    </div>
  );
}
