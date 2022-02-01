import React from 'react';
import './request-result.sass';
import { isNull, isReturningReactNode } from '../../util';
import { PropsBase } from './models';
import { DefaultLoadingIndicator } from 'public/requests/components/loading-indicator';
import { DefaultErrorPlaceholder } from 'public/requests/components/error-placeholder';
import { NoDataPlaceholderProps } from 'public/requests/request-wrapper/models';

interface PropsWithoutResolve<TResolvedData extends Array<any>, TNoData>
  extends PropsBase<TResolvedData, TNoData> {
  /**
   * Passed to each: children, noDataPlaceholder, errorPlaceholder
   */
  className?: string;
}

export function PaginationNoDataPlaceholder({
  className
}: NoDataPlaceholderProps): JSX.Element {
  return <div className={className}>No data</div>;
}

export type Props<
  TResolvedData extends Array<any>,
  TNoData
> = PropsWithoutResolve<TResolvedData, TNoData>;

export function Pagination<TResolvedData extends Array<any>, TNoData = never>(
  props: Props<TResolvedData, TNoData>
): JSX.Element {
  const {
    children,
    className,
    state,
    ErrorPlaceholder = DefaultErrorPlaceholder,
    NoDataPlaceholder = PaginationNoDataPlaceholder,
    LoadingIndicator = DefaultLoadingIndicator,
    hasData
  } = props;
  return (
    <>
      {hasData(state.data) ? (
        isReturningReactNode(children) ? (
          children({ data: state.data, className })
        ) : (
          children
        )
      ) : state.loading ? null : ( // show the placeholder only if not at loading state
        <NoDataPlaceholder className={className} />
      )}
      {!isNull(state.error) && (
        <ErrorPlaceholder value={state.error} className={className} />
      )}
      {state.loading && <LoadingIndicator />}
    </>
  );
}
