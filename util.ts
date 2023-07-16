import React from 'react';

export function isNull(val: any): val is null {
  return val === null;
}

export function isUndefined(val: any): val is undefined {
  return val === undefined;
}

export function isNotUndefined<T>(val: T | undefined): val is T {
  return val !== undefined;
}

export function isNotNull<T>(val: T | null): val is T {
  return val !== null;
}

export function isNullOrUndefined(val: any): val is null | undefined {
  return isNull(val) || isUndefined(val);
}

export interface WithIdPayload<Id> {
  id: Id;
}

export interface WithId<T, Id = number> {
  id: Id;
  data: T;
}

export function deserializeWithId<Id, T>(
  payload: WithIdPayload<Id> & T,
): WithId<Id, T> {
  const { id, ...data } = payload;
  return {
    id,
    data,
  } as unknown as WithId<Id, T>;
}

export function capitalizeFirstLetter(text: string) {
  if (!text.length) {
    return text;
  }
  return `${text[0].toUpperCase()}${text.slice(1)}`;
}

/**
 * Enumerates words in natural language manner
 * @param words
 * @param connector
 * @param lastWordConnector
 */
export function joinWords(
  words: string[],
  connector: string,
  lastWordConnector: string,
) {
  if (words.length === 1) {
    return words[0];
  }
  return (
    words.slice(0, words.length - 1).join(connector) +
    lastWordConnector +
    words[words.length - 1]
  );
}

/**
 * SOURCE: https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
 * @param val
 */
export function isFunction(val: any): boolean {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return val && {}.toString.call(val) === '[object Function]';
}

export type MaybeChildrenAsFn<TProps> =
  | React.ReactNode
  | ((formProps: TProps) => React.ReactNode);

function isReturningReactNode<TProps>(
  val: MaybeChildrenAsFn<TProps>,
): val is (formProps: TProps) => React.ReactNode {
  return isFunction(val);
}

export function maybePassProps<TProps>(
  val: MaybeChildrenAsFn<TProps>,
  props: TProps,
): React.ReactNode {
  if (isReturningReactNode<TProps>(val)) {
    return val(props);
  }
  return val;
}

export function getIfDefined<T>(val: T | undefined, fallback: T): T {
  return isUndefined(val) ? fallback : val;
}

/**
 * Typed version of Object.keys
 * @param input
 */
export function keys<T extends Record<string, unknown>>(
  input: T,
): Array<keyof T> {
  return Object.keys(input) as Array<keyof T>;
}

export function filterOutUndefined<T extends Record<string, unknown>>(
  input: T,
): Partial<T> {
  return keys(input).reduce<Partial<T>>((acc, key) => {
    if (isUndefined(input[key])) {
      return acc;
    }
    acc[key] = input[key];
    return acc;
  }, {} as Partial<T>);
}

export function filterOutNull<T extends Record<string, unknown>>(
  input: T,
): Partial<T> {
  return keys(input).reduce<Partial<T>>((acc, key) => {
    if (isNull(input[key])) {
      return acc;
    }
    acc[key] = input[key];
    return acc;
  }, {} as Partial<T>);
}

export function isPromise<T>(val: T | Promise<T>): val is Promise<T> {
  return !isUndefined((val as Promise<T>).then);
}

export async function wrapWithPromise<T>(val: T | Promise<T>): Promise<T> {
  if (isPromise(val)) {
    return val;
  }
  return Promise.resolve(val);
}
