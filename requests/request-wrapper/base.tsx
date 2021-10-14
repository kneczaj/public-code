import React from 'react';
import { RequestStateBase } from '../models/state';
import { Errors } from '../models/errors';
import { ErrorPlaceholder } from '../components/error-placeholder';

export interface PlaceholdersProps {
  noDataPlaceholder?: (className?: string) => JSX.Element;
  errorPlaceholder?: (props: {
    error: Errors;
    className?: string;
  }) => JSX.Element;
}

export interface PropsBase<TResolvedData, TNoData = never, TData = void>
  extends PlaceholdersProps {
  /**
   * The request data or null when in progress or error data
   */
  state: RequestStateBase<
    (TData extends void ? TResolvedData : TData) | TNoData
  >;
  /**
   * The proper component
   * @param data
   */
  children:
    | ((props: { data: TResolvedData; className?: string }) => React.ReactNode)
    | React.ReactNode;
  /**
   * When true render children, when false the noDataPlaceholder
   * @param data
   */
  noDataDetector: (data: TResolvedData | TNoData) => data is TNoData;
}

export const defaultPropsBase: Required<
  Pick<PropsBase<any>, 'noDataPlaceholder' | 'errorPlaceholder'>
> = {
  noDataPlaceholder(className?: string) {
    return <>{null}</>;
  },
  errorPlaceholder({
    error,
    className
  }: {
    error: Errors;
    className?: string;
  }) {
    return <ErrorPlaceholder className={className} value={error} />;
  }
};
