import {
  MutationResult as MutationResultBase,
  QueryResult as QueryResultBase
} from '@apollo/client/react/types/types';
import { Errors } from 'public/requests/models/errors';
import { FetchResult as FetchResultBase } from '@apollo/client/link/core/types';
import { RequestStateBase } from 'public/requests/models/state';

export interface MutationResult<TData = unknown>
  extends Omit<MutationResultBase<TData>, 'data' | 'error'>,
    RequestStateBase<TData | null> {}

export interface QueryResult<TData, TVariables>
  extends Omit<QueryResultBase<TData, TVariables>, 'data' | 'error'>,
    RequestStateBase<TData | null> {}

export interface FetchResult<
  TData = {
    [key: string]: any;
  },
  C = Record<string, any>,
  E = Record<string, any>
> extends Omit<FetchResultBase<TData, C, E>, 'data' | 'error'> {
  data: TData | null;
  error: Errors | null;
}

/**
 * There can be a label used for a mutation indicator if any is in progress.
 * If no is in progress then false.
 * If unnamed mutation in progress then true;
 */
export type MutatingState<TMutationLabels extends string | never = never> =
  | TMutationLabels
  | boolean;

export interface MutationsContext<
  TMutationLabels extends string | never = never
> {
  mutating: MutatingState<TMutationLabels>;
}

export interface MutationHookResult<TData, TArgs extends Array<any>>
  extends MutationResult<TData> {
  trigger: (...args: TArgs) => Promise<FetchResult<TData>>;
}

/**
 * Allows to label loading state with a string which tells what activity is in progress
 */
export interface LabeledMutationResult<TData, TArgs extends Array<any>>
  extends Omit<MutationResult<TData>, 'loading'> {
  loading: string | boolean;
  trigger: (...args: TArgs) => Promise<FetchResult<TData>>;
}

export type MutationHook<
  TData,
  TArgs extends Array<any>
> = () => MutationHookResult<TData, TArgs>;

export type QueryHook<TData, TArgs extends Array<any>> = (
  ...args: TArgs
) => RequestStateBase<TData | null>;
