import React, { useMemo, useState } from 'react';
import { Props as RequestWrapperProps } from 'public/requests/request-wrapper/item';
import { RequestStateBase } from 'public/requests/models/state';
import { createContext, createContextHook } from 'public/utils/context-hook';
import { isNull, isReturningReactNode } from 'public/util';
import { PaginationRequestWrapper } from "public/requests/request-wrapper/index";
import { PaginationVariables } from "public/requests/models/pagination";
import * as Apollo from "public/graphql/apollo-custom";
import { QueryResult } from "public/graphql/apollo-custom";

export interface ChildrenProps<TData extends any[]> {
  data: TData;
  loadMore: () => void;
  hasMore: boolean;
  className?: string;
}

export interface WrapperProps<TResponseData, TData extends Array<any>> extends Omit<RequestWrapperProps<TResponseData, RequestStateBase<TResponseData>>,
  'state' | 'children' | 'noDataDetector'> {
  children: (props: ChildrenProps<TData>) => React.ReactNode;
}

export type CreatorResult<TResponseData, TData extends Array<any>> = [
  // RequestWrapper component
  React.FunctionComponent<WrapperProps<TResponseData, TData>>,
  // data hook
  () => TData
];

export interface Props<TResponseData, TData> {
  useRequest: (baseOptions: Apollo.QueryHookOptions<TResponseData, PaginationVariables>) => QueryResult<TResponseData, PaginationVariables>,
  extractData: (response: TResponseData) => TData,
  displayName: string,
  noDataDetector?: (data: TData | null) => boolean;
  itemsPerPage?: number;
}

export function createPaginationRequestWrapper<TResponseData, TData extends Array<any>>({
  useRequest,
  extractData,
  displayName,
  noDataDetector = data => !!data && !data.length,
  itemsPerPage = 100
}: Props<TResponseData, TData>): CreatorResult<TResponseData, TData> {
  const Context = createContext<TData>(displayName);
  const hook = createContextHook<TData>(Context);
  const Component = ({
    children,
    ...wrapperProps
  }: WrapperProps<TResponseData, TData>): JSX.Element => {
    const [limit, setLimit] = useState(itemsPerPage);
    const [hasMore, setHasMore] = useState(true);
    const { data, loading, ...state } = useRequest({ variables: { start: 0, limit }});
    const extracted: TData = useMemo(() => isNull(data) ? ([] as unknown as TData) : extractData(data), [data]);

    function loadMore() {
      if (loading) {
        return;
      }
      return state.fetchMore({
        variables: {
          start: extracted.length,
          limit: itemsPerPage
        }
      }).then(result => {
        const newData = extractData(result.data as any);
        setHasMore(newData.length === itemsPerPage);
        setLimit(extracted.length + newData.length);
      });
    }

    return (
      <PaginationRequestWrapper<TData, never>
        state={{...state, loading, data: extracted}}
        noDataDetector={noDataDetector as any}
        {...wrapperProps}
      >
        {({data, className}) =>
          <Context.Provider value={data}>
            {isReturningReactNode(children) ? children({data, className, hasMore, loadMore}) : children}
          </Context.Provider>
        }
      </PaginationRequestWrapper>
    );
  };
  Component.displayName = displayName;
  return [Component, hook];
}
