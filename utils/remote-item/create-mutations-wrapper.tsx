import {
  MutationWrapper,
  Props as MutationWrapperProps
} from 'public/requests/components/MutationWrapper';
import { MaybeChildrenAsFn, maybePassProps } from 'public/util';
import React from 'react';
import { MutatingState } from 'public/graphql/models';
import { MaybeContextProvider } from 'public/utils/remote-item/maybe-context-provider';
import { HookContext } from 'public/utils/context-hook';

type ContextProps<TData, TMutationsApi> = TMutationsApi & { data: TData };

export interface CreatorProps<
  TData,
  TMutationLabels extends string | never,
  TMutationsApi extends { data?: never }
> extends Pick<MutationWrapperProps, 'LoadingIndicator'> {
  useMutations: (
    data: TData
  ) => [TMutationsApi, MutatingState<TMutationLabels>];
  displayName: string;
  Context?: HookContext<ContextProps<TData, TMutationsApi>>;
}

export interface Props<TData, TMutationsApi extends { data?: never }> {
  children: MaybeChildrenAsFn<ContextProps<TData, TMutationsApi>>;
  className?: string;
  data: TData;
}

export function createMutationsWrapper<
  TData,
  TMutationLabels extends string | never,
  TMutationsApi
>({
  Context,
  displayName,
  useMutations
}: CreatorProps<TData, TMutationLabels, TMutationsApi>) {
  function RemoteItem({
    children,
    className,
    data
  }: Props<TData, TMutationsApi>): JSX.Element {
    const [mutations, mutating] = useMutations(data);
    const toContext = { ...mutations, data };
    return (
      <MutationWrapper<TMutationLabels>
        mutating={mutating}
        className={className}
      >
        <MaybeContextProvider Context={Context} value={toContext}>
          {maybePassProps<ContextProps<TData, TMutationsApi>>(
            children,
            toContext
          )}
        </MaybeContextProvider>
      </MutationWrapper>
    );
  }
  RemoteItem.displayName = displayName;
  return RemoteItem;
}

export type { ContextProps as MutationContextProps };
