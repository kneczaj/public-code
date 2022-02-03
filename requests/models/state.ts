import { Errors } from './errors';
import { MutationsContext } from 'public/graphql/models';

export interface RequestStateBase<TData> {
  loading: boolean;
  data: TData;
  error: Errors | null;
}

export interface RequestState<
  TData,
  TMutationLabels extends string | never = never
> extends RequestStateBase<TData>,
    Partial<MutationsContext<TMutationLabels>> {}

export type ItemRequestState<TData> = RequestStateBase<TData | null>;
