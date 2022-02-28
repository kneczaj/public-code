import {
  MutationWrapper,
  Props as MutationWrapperProps
} from 'public/requests/components/MutationWrapper';
import { MaybeChildrenAsFn, maybePassProps } from 'public/util';
import React from 'react';
import { MutatingState } from 'public/graphql/models';
import { MaybeContextProvider } from 'public/utils/remote-item/maybe-context-provider';
import { HookContext } from 'public/utils/context-hook';

export interface CreatorProps<
  TMutationLabels extends string | never,
  TMutationsApi extends { data?: never }
> extends Pick<MutationWrapperProps, 'LoadingIndicator'> {
  useMutations: () => [TMutationsApi, MutatingState<TMutationLabels>];
  displayName: string;
  Context?: HookContext<TMutationsApi>;
}

export interface Props<TMutationsApi> {
  children: MaybeChildrenAsFn<TMutationsApi>;
  className?: string;
}

export function createMutationsWrapper<
  TMutationLabels extends string | never,
  TMutationsApi
>({
  Context,
  displayName,
  useMutations
}: CreatorProps<TMutationLabels, TMutationsApi>) {
  function MutationsWrapper({
    children,
    className
  }: Props<TMutationsApi>): JSX.Element {
    const [mutations, mutating] = useMutations();
    return (
      <MutationWrapper<TMutationLabels>
        mutating={mutating}
        className={className}
      >
        <MaybeContextProvider Context={Context} value={mutations}>
          {maybePassProps<TMutationsApi>(children, mutations)}
        </MaybeContextProvider>
      </MutationWrapper>
    );
  }
  MutationsWrapper.displayName = displayName;
  return MutationsWrapper;
}
