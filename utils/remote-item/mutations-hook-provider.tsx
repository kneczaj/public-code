import { ProviderComponentProps } from 'public/components/provider-group';
import { HookAsComponent } from 'public/components/hook-as-component';
import { MutationsContext } from 'public/graphql/models';
import { maybePassProps } from 'public/util';
import React from 'react';

export interface Props<THook, THookProps, TArgs extends Array<any>>
  extends ProviderComponentProps<THook> {
  useHook: (...args: TArgs) => THook;
  args: TArgs;
  data: THookProps;
}

export function MutationsHookProvider<
  THookProps,
  TMutationsApi,
  TMutationLabels extends string | never = never
>({
  children,
  data,
  useMutations
}: ProviderComponentProps<THookProps>): JSX.Element {
  return useMutations ? (
    <HookAsComponent<
      TMutationsApi & MutationsContext<TMutationLabels>,
      THookProps
    >
      useHook={useMutations}
      args={data}
    >
      {children}
    </HookAsComponent>
  ) : (
    <>
      {maybePassProps<TMutationsApi & MutationsContext<TMutationLabels>>(
        children,
        { mutating: false }
      )}
    </>
  );
}
