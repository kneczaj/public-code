import React from 'react';
import './request-result.sass';
import { isNull, isReturningReactNode } from '../../util';
import { CircularProgress } from '@material-ui/core';
import { defaultPropsBase, PropsBase } from './base';
import { Centered } from '../../components/centered';

interface PropsWithoutResolve<TResolvedData extends Array<any>, TNoData>
  extends PropsBase<TResolvedData, TNoData> {
  /**
   * Passed to each: children, noDataPlaceholder, errorPlaceholder
   */
  className?: string;
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
    errorPlaceholder = defaultPropsBase.errorPlaceholder,
    noDataPlaceholder = (className?: string) => (
      <div className={className}>No data</div>
    ),
    noDataDetector
  } = props;
  return (
    <>
      {noDataDetector(state.data)
        ? state.loading // show the placeholder only if not at loading state
          ? null
          : noDataPlaceholder(className)
        : isReturningReactNode(children)
        ? children({ data: state.data, className })
        : children}
      {!isNull(state.error) &&
        errorPlaceholder({ error: state.error, className })}
      {state.loading && (
        <Centered className={'p-1'}>
          <CircularProgress />
        </Centered>
      )}
    </>
  );
}
