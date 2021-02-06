import { MockContextHook } from './utils';
import { isUndefined, keys } from '../util';

export type HooksCollection = {
  [M: string]: MockContextHook<any>;
};

export type HooksSpies<T extends HooksCollection> = {
  [M in keyof T]: jest.Mock<ReturnType<T[M]>, Parameters<T[M]>>;
};

export type HooksReturnValues<T extends HooksCollection> = {
  [M in keyof T]?: (
    defaults: ReturnType<ReturnType<T[M]>>
  ) => ReturnType<ReturnType<T[M]>>;
};

/**
 * here should be added all mocks for context hooks, so it is possible to get them all mocked with one command
 *
 * This function should contain just mocking the hooks from `public`. The hooks from `app` should have external mocking
 * function which incorporate this one.
 *
 * @return dictionary with spy for each hook
 */
export function mockHookCollection<T extends HooksCollection>(
  collection: T,
  returnValues: HooksReturnValues<T> = {},
  blacklist?: Array<keyof T>
): HooksSpies<T> {
  return keys(collection).reduce<HooksSpies<T>>((spies, name) => {
    if (blacklist && blacklist.includes(name)) {
      return spies;
    }
    const hookMock: MockContextHook<any> = collection[name];
    const getToReturn = returnValues[name];
    const toReturn = isUndefined(getToReturn)
      ? undefined
      : getToReturn(hookMock.defaultValue);
    // @ts-ignore
    spies[name] = hookMock(toReturn);
    return spies;
  }, {} as HooksSpies<T>);
}
