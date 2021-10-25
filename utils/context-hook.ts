import React, { Context as ReactContext, useContext } from 'react';
import { isUndefined } from '../util';

/**
 * This is intended to cooperate with createContextHook so it has required displayName,
 * and may hold initial undefined value when outside of the provider.
 */
export interface HookContext<T> extends ReactContext<T | undefined> {
  displayName: string;
}

/**
 * Creates a context with initial undefined value and displayName. To be used with createContextHook.
 */
export function createContext<T>(displayName: string): HookContext<T> {
  const context = React.createContext<T | undefined>(undefined);
  context.displayName = displayName;
  return context as HookContext<T>;
}

export class ContextError extends Error {}

/**
 * After the context is created with the upper function this handles the exceptions when hook is used outside
 * of the context
 * @param context
 */
export const createContextHook =
  <T>(context: HookContext<T>) =>
  (): T => {
    const val = useContext(context);
    if (isUndefined(val)) {
      throw new ContextError(
        `A context hook for context called "${context.displayName}" is used outside the context provider`
      );
    }
    return val;
  };
