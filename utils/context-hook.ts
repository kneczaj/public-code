import React, { Context as ReactContext, useContext } from "react";
import { isUndefined } from "../util";

/**
 * Differs from react context by mandatory displayName
 */
export interface Context<T> extends ReactContext<T> {
    displayName: string;
}

/**
 * Creates a context with initial undefined value
 */
export function createContext<T>(displayName: string): Context<T> {
  const context = React.createContext(undefined as unknown as T);
  context.displayName = displayName;
  return context as Context<T>;
}

export class ContextError extends Error {}

/**
 * After the context is created with the upper function this handles the exceptions when hook used outside the context
 * @param context
 */
export const createContextHook = <T>(context: Context<T>) => (): T => {
  const val = useContext(context);
  if (isUndefined(val)) {
    throw new ContextError(`A context hook for ${context.displayName} is used outside the context provider`);
  }
  return val;
}
