import React from 'react';
import {
  Item as RequestWrapper,
  Props as RequestWrapperProps
} from 'public/requests/request-wrapper/item';
import { RequestStateBase } from 'public/requests/models/state';
import { isNull, isReturningReactNode } from 'public/util';

export interface WrapperProps<TResponseData, TData>
  extends Omit<
    RequestWrapperProps<TResponseData, RequestStateBase<TResponseData>>,
    'state' | 'children' | 'noDataDetector'
  > {
  children: RequestWrapperProps<TData, RequestStateBase<TData>>['children'];
}

export function createRequestWrapper<TResponseData, TData>(
  useRequest: () => RequestStateBase<TResponseData | null>,
  extractData: (response: TResponseData) => TData | null,
  displayName: string,
  Context: React.Context<TData>,
  noDataDetector: (data: TData | null) => data is null = isNull
): React.FunctionComponent<WrapperProps<TResponseData, TData>> {
  const Component = ({
    children,
    ...wrapperProps
  }: WrapperProps<TResponseData, TData>): JSX.Element => {
    const state = useRequest();
    const extracted = isNull(state.data) ? null : extractData(state.data);
    return (
      <RequestWrapper<TData>
        state={{ ...state, data: extracted }}
        noDataDetector={noDataDetector}
        {...wrapperProps}
      >
        {({ data, className }) => (
          <Context.Provider value={data}>
            {isReturningReactNode(children)
              ? children({ data, className })
              : children}
          </Context.Provider>
        )}
      </RequestWrapper>
    );
  };
  Component.displayName = displayName;
  return Component;
}
