import { ContextHookFactory } from '../utils/context-hook';

export const FormNameContext =
  ContextHookFactory.createContext<string>('form name');

export const useFormName =
  ContextHookFactory.createHook<string>(FormNameContext);
