import React from 'react';
import {
  Item as RequestWrapper,
  Props as RequestWrapperProps
} from 'public/requests/request-wrapper/item';
import { RequestStateBase } from 'public/requests/models/state';
import { isNotNull, isNull, isReturningReactNode } from 'public/util';
import { createHookContext, HookContext } from 'public/utils/context-hook';

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
  const Data = createHookContext<TData>(displayName);
  const Wrapper = ({
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
          <Data.Context.Provider value={data}>
            {isReturningReactNode(children)
              ? children({ data, className })
              : children}
          </Data.Context.Provider>
        )}
      </RequestWrapper>
    );
  };
  Wrapper.displayName = displayName;
  return {
    DataContext: Data.Context,
    useData: Data.useContext,
    Wrapper
  };
}
