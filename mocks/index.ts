import * as HookMocks from './hooks';
import * as CONST_MOCKS from './consts';
import { HooksReturnValues, mockHookCollection } from './hooks-collection';

export { HookMocks };
export { CONST_MOCKS };

export const mockAllProviderHooks = (
  returnValues: HooksReturnValues<typeof HookMocks> = {},
  blacklist?: Array<keyof typeof HookMocks>
) => mockHookCollection(HookMocks, returnValues, blacklist);

export function mockOneHook<Name extends keyof typeof HookMocks>(
  name: Name,
  getValue: (
    defaults: ReturnType<ReturnType<typeof HookMocks[Name]>>
  ) => ReturnType<ReturnType<typeof HookMocks[Name]>>
) {
  const hookMock = HookMocks[name];
  const value = getValue(hookMock.defaultValue);
  return hookMock(value);
}
