import React, { ComponentType } from 'react';
import { Item as RequestWrapper } from 'public/requests/request-wrapper/item';
import { RequestStateBase } from 'public/requests/models/state';
import { maybePassProps } from 'public/util';
import { PropsBase } from 'public/requests/request-wrapper/models';
import { HookContext } from 'public/utils/context-hook';
import { MaybeContextProvider } from 'public/utils/remote-item/maybe-context-provider';

export interface CreatorProps<TData>
  extends Pick<
    PropsBase<TData>,
    'NoDataPlaceholder' | 'ErrorPlaceholder' | 'LoadingIndicator'
  > {
  useRequest: () => RequestStateBase<TData | null>;
  displayName: string;
  Context?: HookContext<TData>;
  hasData?: PropsBase<TData>['hasData'];
}

export type Props<TData> = Pick<
  PropsBase<TData>,
  'className' | 'contentClassName' | 'children'
>;

export function createRequestWrapper<TData>({
  useRequest,
  displayName,
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingIndicator,
  hasData,
  Context
}: CreatorProps<TData>): ComponentType<Props<TData>> {
  const Wrapper = ({
    children,
    className,
    contentClassName
  }: Props<TData>): JSX.Element => {
    const state = useRequest();
    return (
      <RequestWrapper<TData>
        NoDataPlaceholder={NoDataPlaceholder}
        ErrorPlaceholder={ErrorPlaceholder}
        LoadingIndicator={LoadingIndicator}
        state={state}
        hasData={hasData}
        className={className}
        contentClassName={contentClassName}
      >
        {props => (
          <MaybeContextProvider Context={Context} value={props.data}>
            {maybePassProps(children, props)}
          </MaybeContextProvider>
        )}
      </RequestWrapper>
    );
  };
  Wrapper.displayName = displayName;
  return Wrapper;
}
