import { Item as RequestWrapper } from 'public/requests/request-wrapper/item';
import { AdFragmentFragment } from 'generated/graphql';
import { HookAsComponent } from 'public/components/hook-as-component';
import { MutationWrapper } from 'public/requests/components/MutationWrapper';
import { MaybeChildrenAsFn, maybePassProps } from 'public/util';
import React from 'react';
import {
  Ad,
  AdWrapperProps,
  BaseProps,
  Hook,
  Mutations,
  Props,
  useAdMutations
} from 'app/ads-browser/api/ad';
import { RequestStateBase } from 'public/requests/models/state';
import { MutationsContext } from 'public/graphql/models';
import { WrapperProps } from 'public/requests/request-wrapper/request-tools';
import {
  WrapperChildrenProps,
  PropsBase
} from 'public/requests/request-wrapper/models';
import { ProviderComponentProps } from 'public/components/provider-group';
import { MaybeContextProvider } from 'public/utils/remote-item/maybe-context-provider';
import { MutationsHookProvider } from 'public/utils/remote-item/mutations-hook-provider';

export interface MutationsHookProps<TData> {
  data: TData;
}

export interface CreatorProps<
  TData,
  TQueryProps extends Record<string, unknown> | void,
  TMutationLabels extends string | never,
  TMutationsApi
> extends Pick<
    PropsBase,
    'LoadingIndicator' | 'ErrorPlaceholder' | 'NoDataPlaceholder' | 'hasData'
  > {
  useQuery: (args: TQueryProps) => RequestStateBase<TData | null>;
  useMutations: (
    data: TData
  ) => TMutationsApi & MutationsContext<TMutationLabels>;
  displayName: string;
  Context?: React.Context;
}

export interface Props<
  TData,
  TMutationLabels extends string | never,
  TMutationsApi
> {
  children: MaybeChildrenAsFn<WrapperChildrenProps<TData> & TMutationsApi>;
  className?: string;
  data: TData;
}

export function createMutationsWrapper<
  TData,
  TQueryProps extends Record<string, unknown> | void,
  TMutationLabels extends string | never,
  TMutations extends MutationsContext<TMutationLabels> | never
>({
  displayName,
  useMutations
}: CreatorProps<TData, TQueryProps, TMutationLabels, TMutations>) {
  const RemoteItem = ({
    children,
    className,
    data,
    Context,
    ...useQueryProps
  }: Props<TData, TMutationLabels, TMutations> & TQueryProps) => {
    const { mutating, ...mutations } = useMutations(useQueryProps);
    return (
      <MutationWrapper mutating={mutating}>
        {maybePassProps(children, {
          data,
          ...mutations,
          className
        })}
      </MutationWrapper>
    );
  };
  RemoteItem.displayName = displayName;
  return RemoteItem;
}
