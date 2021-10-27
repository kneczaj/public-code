import React, { useMemo, useState } from 'react';
import { Props as RequestWrapperProps } from 'public/requests/request-wrapper/item';
import { RequestStateBase } from 'public/requests/models/state';
import { createHookContext, HookContext } from 'public/utils/context-hook';
import { isNull, isReturningReactNode } from 'public/util';
import { PaginationRequestWrapper } from 'public/requests/request-wrapper/index';
import { PaginationVariables } from 'public/requests/models/pagination';
import { QueryResult } from 'public/graphql/apollo-custom';
import { QueryHookOptions } from '@apollo/client/react/types/types';
import { AdsQuery } from 'generated/graphql';

export interface ChildrenProps<TData extends any[]> {
  data: TData;
  loadMore: () => void;
  hasMore: boolean;
  className?: string;
}

export interface WrapperProps<TResponseData, TData extends Array<any>>
  extends Omit<
    RequestWrapperProps<TResponseData, RequestStateBase<TResponseData>>,
    'state' | 'children' | 'hasData'
  > {
  children: (props: ChildrenProps<TData>) => React.ReactNode;
}

export type CreatorResult<TResponseData, TData extends Array<any>> = {
  // RequestWrapper component
  Wrapper: React.FunctionComponent<WrapperProps<TResponseData, TData>>;
  // data hook
  useData: () => TData;
  DataContext: HookContext<TData>;
};

export type PaginationRequestHookOptions<TResponseData> = QueryHookOptions<
  TResponseData,
  PaginationVariables
> &
  Required<Pick<QueryHookOptions<AdsQuery, PaginationVariables>, 'variables'>>;

export interface Props<TResponseData, TData> {
  useRequest: (
    baseOptions: PaginationRequestHookOptions<TResponseData>
  ) => QueryResult<TResponseData, PaginationVariables>;
  extractData: (response: TResponseData) => TData;
  displayName: string;
  hasData?: (data: TData | null) => data is TData;
  itemsPerPage?: number;
}

export function createPaginationRequestTools<
  TResponseData,
  TData extends Array<any>
>({
  useRequest,
  extractData,
  displayName,
  hasData = (data: TData | null): data is TData => !!data && !!data.length,
  itemsPerPage = 100
}: Props<TResponseData, TData>): CreatorResult<TResponseData, TData> {
  const Hook = createHookContext<TData>(displayName);
  const Wrapper = ({
    children,
    ...wrapperProps
  }: WrapperProps<TResponseData, TData>): JSX.Element => {
    const [limit, setLimit] = useState(itemsPerPage);
    const [hasMore, setHasMore] = useState(true);
    const { data, loading, ...state } = useRequest({
      variables: { start: 0, limit },
      notifyOnNetworkStatusChange: true
    });
    const extracted: TData = useMemo(
      () => (isNull(data) ? ([] as unknown as TData) : extractData(data)),
      [data]
    );

    function loadMore() {
      if (loading) {
        return;
      }
      return state
        .fetchMore({
          variables: {
            start: extracted.length,
            limit: itemsPerPage
          }
        })
        .then(result => {
          const newData = extractData(result.data as any);
          setHasMore(newData.length === itemsPerPage);
          setLimit(extracted.length + newData.length);
        });
    }

    return (
      <PaginationRequestWrapper<TData, never>
        state={{ ...state, loading, data: extracted }}
        hasData={hasData}
        {...wrapperProps}
      >
        {({ data, className }) => (
          <Hook.Context.Provider value={data}>
            {isReturningReactNode(children)
              ? children({ data, className, hasMore, loadMore })
              : children}
          </Hook.Context.Provider>
        )}
      </PaginationRequestWrapper>
    );
  };
  Wrapper.displayName = displayName;
  return { Wrapper, DataContext: Hook.Context, useData: Hook.useContext };
}
