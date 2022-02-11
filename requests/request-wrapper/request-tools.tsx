import React from 'react';
import {
  Item as RequestWrapper,
  Props as RequestWrapperProps
} from 'public/requests/request-wrapper/item';
import { RequestStateBase } from 'public/requests/models/state';
import { isNotNull, maybePassProps } from 'public/util';
import { ContextHookFactory, HookContext } from 'public/utils/context-hook';

export interface Props<TData> {
  useRequest: () => RequestStateBase<TData | null>;
  displayName: string;
  hasData?: (data: TData | null) => data is TData;
}

export interface WrapperProps<TData>
  extends Omit<RequestWrapperProps<TData>, 'state' | 'hasData'> {}

export interface RequestTools<TData> {
  DataContext: HookContext<TData>;
  useData: () => TData;
  Wrapper: React.FunctionComponent<WrapperProps<TData>>;
  WrapperWithProvider: React.FunctionComponent<WrapperProps<TData>>;
}

export function createRequestTools<TData>({
  useRequest,
  displayName,
  hasData = isNotNull
}: Props<TData>): RequestTools<TData> {
  const Data = ContextHookFactory.createHookAndContext<TData>(displayName);
  const Wrapper = (wrapperProps: WrapperProps<TData>): JSX.Element => {
    const state = useRequest();
    return (
      <RequestWrapper<TData>
        state={state}
        hasData={hasData}
        {...wrapperProps}
      />
    );
  };
  Wrapper.displayName = displayName;
  const WrapperWithProvider = ({
    children,
    ...wrapperProps
  }: WrapperProps<TData>): JSX.Element => {
    return (
      <Wrapper {...wrapperProps}>
        {({ data, className }) => (
          <Data.Context.Provider value={data}>
            {maybePassProps(children, { data, className })}
          </Data.Context.Provider>
        )}
      </Wrapper>
    );
  };
  return {
    DataContext: Data.Context,
    useData: Data.useContext,
    Wrapper,
    WrapperWithProvider
  };
}
