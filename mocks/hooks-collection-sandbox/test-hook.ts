import { createContext, createContextHook } from '../../utils/context-hook';

export interface ContextProps {
  str: string;
  setStr: (val: string) => void;
}

export const TestContext = createContext<ContextProps>('test');
export const useTest = createContextHook<ContextProps>(TestContext);
