import { Errors } from '../models/errors';
import ErrorIcon from '@material-ui/icons/Error';
import { merge } from '../../css';
import { CircularProgress } from '@material-ui/core';
import { isNull, isReturningReactNode } from '../../util';
import React from 'react';
import { Props, defaultProps as itemDefaultProps } from './item';

function errorPlaceholder({
  error,
  className
}: {
  error: Errors;
  className?: string;
}) {
  return <ErrorIcon className={'stretch-abs'} />;
}

const defaultProps: typeof itemDefaultProps = {
  ...itemDefaultProps,
  errorPlaceholder
};

export function Mini<TData>(props: Props<TData>): JSX.Element {
  const {
    children,
    className,
    state,
    errorPlaceholder,
    noDataPlaceholder,
    noDataDetector
  } = props as Props<TData> & typeof defaultProps;

  return (
    <div className={merge(className, 'mini-request-result-root')}>
      {state.loading ? (
        <CircularProgress size={'1em'} className={'stretch-abs'} />
      ) : isNull(state.error) ? (
        noDataDetector(state.data) ? (
          noDataPlaceholder(className)
        ) : (
          isReturningReactNode(children) ? children({ data: state.data, className }) : children
        )
      ) : (
        errorPlaceholder({ error: state.error, className })
      )}
    </div>
  );
}

Mini.defaultProps = defaultProps;
