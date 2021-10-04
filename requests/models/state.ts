import { Errors } from './errors';

export interface RequestStateBase<TData> {
  loading: boolean;
  data: TData;
  error: Errors | null;
}

export type ItemRequestState<TData> = RequestStateBase<TData | null>;
