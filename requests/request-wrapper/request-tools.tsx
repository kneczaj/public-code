import React from 'react';
import {
  Item as RequestWrapper,
  Props as RequestWrapperProps
} from 'public/requests/request-wrapper/item';
import { RequestStateBase } from 'public/requests/models/state';
import { isNotNull, isNull, isReturningReactNode } from 'public/util';
import {
  createContext,
  createContextHook,
  HookContext
} from 'public/utils/context-hook';

export interface Props<TResponseData, TData> {
  useRequest: () => RequestStateBase<TResponseData | null>;
  extractData: (response: TResponseData) => TData | null;
  displayName: string;
  hasData?: (data: TData | null) => data is TData;
}

export interface WrapperProps<TResponseData, TData>
  extends Omit<
    RequestWrapperProps<TResponseData, RequestStateBase<TResponseData>>,
    'state' | 'children' | 'hasData'
  > {
  children: RequestWrapperProps<TData, RequestStateBase<TData>>['children'];
}

export interface RequestTools<TResponseData, TData> {
  DataContext: HookContext<TData>;
  useData: () => TData;
  Wrapper: React.FunctionComponent<WrapperProps<TResponseData, TData>>;
}

export function createRequestTools<TResponseData, TData>({
  useRequest,
  extractData,
  displayName,
  hasData = isNotNull
}: Props<TResponseData, TData>): RequestTools<TResponseData, TData> {
  const DataContext = createContext<TData>(displayName);
  const useData = createContextHook<TData>(DataContext);
  const Component = ({
    children,
    ...wrapperProps
  }: WrapperProps<TResponseData, TData>): JSX.Element => {
    const state = useRequest();
    const extracted = isNull(state.data) ? null : extractData(state.data);
    return (
      <RequestWrapper<TData>
        state={{ ...state, data: extracted }}
        hasData={hasData}
        {...wrapperProps}
      >
        {({ data, className }) => (
          <DataContext.Provider value={data}>
            {isReturningReactNode(children)
              ? children({ data, className })
              : children}
          </DataContext.Provider>
        )}
      </RequestWrapper>
    );
  };
  Component.displayName = displayName;
  return {
    DataContext,
    useData,
    Wrapper: Component
  };
}
