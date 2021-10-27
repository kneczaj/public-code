import { createHookContext } from '../../utils/context-hook';

export interface ContextProps {
  str: string;
  setStr: (val: string) => void;
}

export const TestContext = createHookContext<ContextProps>('test');
