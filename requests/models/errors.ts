import { isNotNull, isUndefined } from '../../util';

export class ErrorResponse extends Error {}

/**
 * Errors to be shown to user
 */
export interface Errors {
  /**
   * Should have at least one item! If no errors, use null instead of Errors object
   */
  messages: string[];
}

/**
 * Merges values of RequestStateBase<TData>['errors'] so it is possible to collect errors of multiple requests.
 * Normally null is the value when there are no errors, and it is followed as the result of this function.
 *
 * @param errors
 */
export function mergeErrors(errors: Array<Errors | null>): Errors | null {
  const mergedErrors = errors.filter(isNotNull).reduce((acc, val) => {
    return {
      messages: [...acc.messages, ...val.messages]
    }
  }, { messages: [] });
  return mergedErrors.messages.length ? mergedErrors : null;
}

export type ErrorHandler<TReturnValue> = (
  response: Response
) => TReturnValue | null;

export function isErrors<T>(val: T | Errors): val is Errors {
  return !isUndefined((val as Errors).messages);
}

export class ValidationError extends ErrorResponse {
  constructor(public data: Record<string, unknown>) {
    super();
  }
}

/**
 * Errors to be shown to user
 */
export interface Errors {
  messages: string[];
}

export function makeRequestError(error: any): Errors {
  return {
    messages: [error.request.statusText]
  };
}
