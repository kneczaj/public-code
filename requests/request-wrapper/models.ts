import { Errors as ErrorModel } from 'public/requests/models/errors';
import React, { ComponentType } from 'react';
import { RequestStateBase } from 'public/requests/models/state';

export interface ErrorPlaceholderProps {
  value: ErrorModel;
  className?: string;
  showGoBack?: boolean;
  retry?: () => void;
  children?: React.ReactNode;
}

export interface NoDataPlaceholderProps {
  className?: string;
}

export interface LoadingIndicatorProps {
  className?: string;
}

export interface PropsBase<TData, TNoData = null> {
  /**
   * Passed to each: children, noDataPlaceholder, errorPlaceholder
   */
  className?: string;
  NoDataPlaceholder?: ComponentType<NoDataPlaceholderProps>;
  ErrorPlaceholder?: ComponentType<ErrorPlaceholderProps>;
  LoadingIndicator?: ComponentType<LoadingIndicatorProps>;
  /**
   * The request data or null when in progress or error data
   */
  state: RequestStateBase<TData | TNoData>;
  /**
   * The proper component
   * @param data
   */
  children:
    | ((props: { data: TData; className?: string }) => React.ReactNode)
    | React.ReactNode;
  /**
   * When true render children, when false the noDataPlaceholder
   * @param data
   */
  hasData: (data: TData | TNoData) => data is TData;
}
