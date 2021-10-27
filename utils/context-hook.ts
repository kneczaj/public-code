import React, { Context as ReactContext, useContext } from 'react';
import { isUndefined } from '../util';

/**
 * This is intended to cooperate with createContextHook so it has required displayName,
 * and may hold initial undefined value when outside of the provider.
 */
export interface HookContext<T> extends ReactContext<T | undefined> {
  displayName: string;
}

export interface CreateHookContextResult<T> {
  Context: HookContext<T>;
  useContext: () => T;
}

export class ContextError extends Error {}

/**
 * Creates a context with initial undefined value and displayName, and a hook which works only inside this context.
 * This saves us writing undefined checks.
 */
export function createHookContext<T>(
  displayName: string
): CreateHookContextResult<T> {
  const Context = React.createContext<T | undefined>(
    undefined
  ) as HookContext<T>;
  const useHookContext = (): T => {
    const val = useContext(Context);
    if (isUndefined(val)) {
      throw new ContextError(
        `A context hook for context called "${Context.displayName}" is used outside the context provider`
      );
    }
    return val;
  };
  Context.displayName = displayName;
  return {
    Context,
    useContext: useHookContext
  };
}
