import React from 'react';
import { Props as RequestWrapperProps } from 'public/requests/request-wrapper/item';
import { ContextHookFactory, HookContext } from 'public/utils/context-hook';
import {
  createRequestWrapper,
  CreatorProps,
  Props
} from 'public/utils/remote-item/create-request-wrapper';

export interface WrapperProps<TData>
  extends Omit<RequestWrapperProps<TData>, 'state' | 'hasData'> {}

export interface RequestTools<TData> {
  DataContext: HookContext<TData>;
  useData: () => TData;
  Wrapper: React.ComponentType<Props<TData>>;
  WrapperWithProvider: React.ComponentType<Props<TData>>;
}

export function createRequestTools<TData>(
  props: CreatorProps<TData>
): RequestTools<TData> {
  const DataContext = ContextHookFactory.createContext<TData>(
    props.displayName
  );
  const useData = ContextHookFactory.createHook<TData>(DataContext);
  const Wrapper = createRequestWrapper(props);
  const WrapperWithProvider = createRequestWrapper({
    ...props,
    Context: DataContext
  });
  return {
    DataContext,
    useData,
    Wrapper,
    WrapperWithProvider
  };
}
