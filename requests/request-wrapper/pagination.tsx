import React from 'react';
import './request-result.sass';
import { isNull, maybePassProps } from '../../util';
import { PropsBase } from './models';
import { DefaultLoadingIndicator } from 'public/requests/components/loading-indicator';
import { DefaultErrorPlaceholder } from 'public/requests/components/error-placeholder';
import { NoDataPlaceholderProps } from 'public/requests/request-wrapper/models';

interface Props<TData extends Array<any>, TNoData = null | TData>
  extends PropsBase<TData, TNoData> {
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

export function Pagination<TData extends Array<any>, TNoData = null | TData>(
  props: Props<TData, TNoData>
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
        maybePassProps(children, { data: state.data, className })
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
