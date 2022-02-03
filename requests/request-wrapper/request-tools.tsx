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

export interface WrapperProps<
  TData,
  TMutationLabels extends string | never = never
> extends Omit<
    RequestWrapperProps<TData, TMutationLabels, RequestStateBase<TData>>,
    'state' | 'hasData'
  > {}

export interface RequestTools<
  TData,
  TMutationLabels extends string | never = never
> {
  DataContext: HookContext<TData>;
  useData: () => TData;
  Wrapper: React.FunctionComponent<WrapperProps<TData, TMutationLabels>>;
  WrapperWithProvider: React.FunctionComponent<
    WrapperProps<TData, TMutationLabels>
  >;
}

export function createRequestTools<
  TData,
  TMutationLabels extends string | never = never
>({
  useRequest,
  displayName,
  hasData = isNotNull
}: Props<TData>): RequestTools<TData, TMutationLabels> {
  const Data = ContextHookFactory.createHookAndContext<TData>(displayName);
  const Wrapper = (wrapperProps: WrapperProps<TData>): JSX.Element => {
    const state = useRequest();
    return (
      <RequestWrapper<TData, TMutationLabels>
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
