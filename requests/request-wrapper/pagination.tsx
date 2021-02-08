import React from 'react';
import './request-result.sass';
import { isNull } from '../../util';
import { CircularProgress } from '@material-ui/core';
import { defaultPropsBase, PropsBase } from './base';
import { Centered } from '../../components/centered';
import { AddResolve } from 'public/requests/models/with-resolve';

interface PropsWithoutResolve<TResolvedData extends Array<any>, TNoData>
  extends PropsBase<TResolvedData, TNoData> {
  /**
   * Passed to each: children, noDataPlaceholder, errorPlaceholder
   */
  className?: string;
}

export type Props<
  TResolvedData extends Array<any>,
  TNoData,
  TData = void
> = AddResolve<
  PropsWithoutResolve<TResolvedData, TNoData>,
  TResolvedData,
  TNoData,
  TData
>;

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
        : children({ data: state.data, className })}
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
