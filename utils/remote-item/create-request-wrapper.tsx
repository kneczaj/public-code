import React, { ComponentType } from 'react';
import { Item as RequestWrapper } from 'public/requests/request-wrapper/item';
import { RequestStateBase } from 'public/requests/models/state';
import { MaybeChildrenAsFn } from 'public/util';
import {
  PropsBase,
  WrapperChildrenProps
} from 'public/requests/request-wrapper/models';

export interface CreatorProps<TData>
  extends Pick<
    PropsBase<TData>,
    'hasData' | 'NoDataPlaceholder' | 'ErrorPlaceholder' | 'LoadingIndicator'
  > {
  useRequest: () => RequestStateBase<TData | null>;
  displayName: string;
}

export interface Props<TData> {
  className?: string;
  children: MaybeChildrenAsFn<WrapperChildrenProps<TData>>;
}

export function createRequestWrapper<TData>({
  useRequest,
  displayName,
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingIndicator,
  hasData
}: CreatorProps<TData>): ComponentType<Props<TData>> {
  const Wrapper = ({ children, className }: Props<TData>): JSX.Element => {
    const state = useRequest();
    return (
      <RequestWrapper<TData>
        NoDataPlaceholder={NoDataPlaceholder}
        ErrorPlaceholder={ErrorPlaceholder}
        LoadingIndicator={LoadingIndicator}
        state={state}
        hasData={hasData}
        className={className}
      >
        {children}
      </RequestWrapper>
    );
  };
  Wrapper.displayName = displayName;
  return Wrapper;
}
