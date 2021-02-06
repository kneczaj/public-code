import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { PaginationRequestWrapper } from 'public/requests/request-wrapper';
import { isUndefined } from 'public/util';
import { AddResolve, isWithResolve } from 'public/requests/models/with-resolve';
import { PlaceholdersProps } from 'public/requests/request-wrapper/base';

export interface ChildrenProps<TData extends any[]> {
  data: TData;
  loadMore: () => void;
  loading: boolean;
  hasMore: boolean;
  className?: string;
}

export interface PaginationVariables {
  limit: number;
  start: number;
}

export interface PropsWithoutResolve<
  TResolvedData extends Array<any>,
  TVariables,
  TData = void
> extends PlaceholdersProps {
  itemsPerPage: number;
  query:
    | DocumentNode
    | TypedDocumentNode<TData, TVariables & PaginationVariables>;
  children: (props: ChildrenProps<TResolvedData>) => React.ReactNode;
  variables: TVariables;
}

export type Props<
  // the data passed to components
  TResolvedData extends Array<any>,
  TVariables,
  // the data received from server, void if this is identical to the data passed to components
  // if not void then a resolve function needs to be passed with props which converts TData to TResolvedData
  TData = void
> = AddResolve<
  PropsWithoutResolve<TResolvedData, TVariables, TData>,
  TResolvedData,
  undefined,
  TData
>;

export function PaginationQuery<
  TResolvedData extends any[],
  TVariables,
  TData = void
>(props: Props<TResolvedData, TVariables, TData>): JSX.Element {
  const {
    children,
    itemsPerPage,
    query,
    variables,
    noDataPlaceholder,
    errorPlaceholder
  } = props;
  const resolveFn = isWithResolve(props) ? props.resolveFn : undefined;
  const [limit, setLimit] = useState(itemsPerPage);
  const [hasMore, setHasMore] = useState(true);
  const { data, error, loading, fetchMore: fetchMoreBase } = useQuery<
    TData,
    TVariables & PaginationVariables
  >(query, {
    variables: {
      ...variables,
      limit,
      start: 0
    }
  });

  const resolve = useCallback(
    (data: TData | TResolvedData | undefined) => {
      return resolveFn
        ? resolveFn(data as TData)
        : (((data || []) as unknown) as TResolvedData);
    },
    [resolveFn]
  );

  const resolvedData: TResolvedData = useMemo(() => {
    return resolve(data);
  }, [data, resolve]);

  function loadMore() {
    if (loading) {
      return;
    }
    return fetchMoreBase({
      variables: {
        start: resolvedData.length,
        limit: itemsPerPage
      }
    }).then(result => {
      const newData = resolve(result.data as any);
      setHasMore(newData.length === itemsPerPage);
      setLimit(resolvedData.length + newData.length);
    });
  }

  return (
    <PaginationRequestWrapper<TResolvedData, undefined>
      state={{
        data: resolvedData,
        error: error ? { messages: ['Error'] } : null,
        loading
      }}
      noDataDetector={(data: TResolvedData | undefined): data is undefined =>
        isUndefined(data) || !data.length
      }
      noDataPlaceholder={noDataPlaceholder}
      errorPlaceholder={errorPlaceholder}
    >
      {({ data, className }) =>
        children({
          data,
          className,
          hasMore,
          loading,
          loadMore
        })
      }
    </PaginationRequestWrapper>
  );
}
