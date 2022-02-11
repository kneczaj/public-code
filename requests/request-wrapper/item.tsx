import { isNotNull, isNull, maybePassProps } from '../../util';
import React from 'react';
import { PropsBase } from './models';
import { DefaultLoadingIndicator } from 'public/requests/components/loading-indicator';
import { DefaultErrorPlaceholder } from 'public/requests/components/error-placeholder';
import { DefaultNoDataPlaceholder } from 'public/requests/components/no-data-placeholder';
import { useCT } from 'public/hooks/translation';

export interface Props<TData, TNoData = null>
  extends Omit<PropsBase<TData, TNoData>, 'hasData'> {
  hasData?: PropsBase<TData, TNoData>['hasData'];
}

export function Item<TData, TNoData = null>({
  children,
  className = 'flex-1 d-flex flex-column',
  state,
  ErrorPlaceholder = DefaultErrorPlaceholder,
  NoDataPlaceholder = DefaultNoDataPlaceholder,
  LoadingIndicator = DefaultLoadingIndicator,
  hasData = (data: TData | TNoData): data is TData => isNotNull(data)
}: Props<TData, TNoData>) {
  const ct = useCT();
  return (
    <div className={className}>
      {state.loading && <LoadingIndicator label={`${ct('loading')}...`} />}
      {isNull(state.error) ? (
        hasData(state.data) ? (
          maybePassProps(children, { data: state.data, className })
        ) : (
          <NoDataPlaceholder className={className} />
        )
      ) : (
        <ErrorPlaceholder value={state.error} className={className} />
      )}
    </div>
  );
}
