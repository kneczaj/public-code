import { ContextHookFactory } from '../../utils/context-hook';

export interface ContextProps {
  str: string;
  setStr: (val: string) => void;
}

export const TestContext =
  ContextHookFactory.createContext<ContextProps>('test');

export const useTest = ContextHookFactory.createHook<ContextProps>(TestContext);
