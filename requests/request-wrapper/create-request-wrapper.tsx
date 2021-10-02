import React from 'react';
import { Item as RequestWrapper, Props as RequestWrapperProps } from 'public/requests/request-wrapper/item';
import { RequestStateBase } from 'public/requests/models/state';
import { createContext, createContextHook } from 'public/utils/context-hook';
import { isNull, isReturningReactNode } from 'public/util';

export interface WrapperProps<TResponseData, TData> extends Omit<RequestWrapperProps<TResponseData, RequestStateBase<TResponseData>>,
  'state' | 'children' | 'noDataDetector'> {
  children: RequestWrapperProps<TData, RequestStateBase<TData>>['children']
}

export type CreatorResult<TResponseData, TData> = [
  // RequestWrapper component
  React.FunctionComponent<WrapperProps<TResponseData, TData>>,
  // data hook
  () => TData
];

export function createRequestWrapper<TResponseData, TData>(
  useRequest: () => RequestStateBase<TResponseData | null>,
  extractData: (response: TResponseData) => TData | null,
  displayName: string,
  noDataDetector: (data: TData | null) => data is null = isNull
): CreatorResult<TResponseData, TData> {
  const Context = createContext<TData>(displayName);
  const hook = createContextHook<TData>(Context);
  const Component = ({
    children,
    ...wrapperProps
  }: WrapperProps<TResponseData, TData>): JSX.Element => {
    const state = useRequest();
    const extracted = isNull(state.data) ? null : extractData(state.data);
    return (
      <RequestWrapper<TData>
        state={{...state, data: extracted}}
        noDataDetector={noDataDetector}
        {...wrapperProps}
      >
        {({data, className}) => (
          <Context.Provider value={data}>
            {isReturningReactNode(children) ? children({data, className}) : children}
          </Context.Provider>
        )}
      </RequestWrapper>
    );
  };
  Component.displayName = displayName;
  return [Component, hook];
}
