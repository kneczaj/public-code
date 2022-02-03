import { RequestStateBase } from 'public/requests/models/state';
import { isNull } from 'public/util';

/**
 * A graphql query/mutation hook decorator
 */
export function extractData<TResponseData, TData, TArgs extends Array<any>>(
  hook: (...args: TArgs) => RequestStateBase<TResponseData | null>,
  extractData: (response: TResponseData) => TData | null
): (...args: TArgs) => RequestStateBase<TData | null> {
  return function (...args: TArgs): RequestStateBase<TData | null> {
    const state = hook(...args);
    return {
      ...state,
      data: isNull(state.data) ? null : extractData(state.data)
    };
  };
}
