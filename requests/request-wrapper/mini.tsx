import ErrorIcon from '@material-ui/icons/Error';
import { merge } from '../../css';
import { CircularProgress } from '@material-ui/core';
import { isNotNull, isNull, maybePassProps } from '../../util';
import React from 'react';
import { Props } from './item';
import { ErrorPlaceholderProps } from 'public/requests/request-wrapper/models';
import { DefaultNoDataPlaceholder } from 'public/requests/components/no-data-placeholder';

function MiniErrorPlaceholder({ className }: ErrorPlaceholderProps) {
  return <ErrorIcon className={merge('stretch-abs', className)} />;
}

export function Mini<TData>({
  children,
  className,
  state,
  ErrorPlaceholder = MiniErrorPlaceholder,
  NoDataPlaceholder = DefaultNoDataPlaceholder,
  hasData = (data: TData | null): data is TData => isNotNull(data)
}: Props<TData>): JSX.Element {
  return (
    <div className={merge(className, 'mini-request-result-root')}>
      {state.loading ? (
        <CircularProgress size={'1em'} className={'stretch-abs'} />
      ) : isNull(state.error) ? (
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
