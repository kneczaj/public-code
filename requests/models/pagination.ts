import { ObservableQueryFields } from "@apollo/client/react/types/types";
import { ItemRequestState } from "public/requests/models/state";
import { Exact, Scalars } from "generated/graphql";

export interface PaginationPayload<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PaginationBase {
  fetchMore: ObservableQueryFields<unknown, unknown>['fetchMore'];
  itemsPerPage: number;
}

export interface Pagination<T> extends PaginationBase {
  data: T[];
}

export interface PaginationContext<T> extends ItemRequestState<T>, PaginationBase {
  setLimit: (val: number) => void;
}

export type PaginationVariables = Exact<{
  limit: Scalars['Int'];
  start: Scalars['Int'];
}>
