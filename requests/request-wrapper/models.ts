import { Errors as ErrorModel } from 'public/requests/models/errors';
import React, { ComponentType } from 'react';
import { RequestState, RequestStateBase } from 'public/requests/models/state';
import { MaybeChildrenAsFn } from 'public/util';

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
  label?: string;
}

export interface WrapperChildrenProps<TData> {
  data: TData;
  className?: string;
}

export interface PropsBase<TData, TNoData = null> {
  /**
   * Passed to each: children, noDataPlaceholder, errorPlaceholder
   */
  contentClassName?: string;
  /**
   * Outer wrapper props which holds children, noDataPlaceholder, errorPlaceholder
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
   */
  children: MaybeChildrenAsFn<WrapperChildrenProps<TData>>;
  /**
   * When true render children, when false the noDataPlaceholder
   * @param data
   */
  hasData: (data: TData | TNoData) => data is TData;
}
