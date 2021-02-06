import { createContext, createContextHook } from '../utils/context-hook';

export const FormNameContext = createContext<string>('form name');
export const useFormName = createContextHook(FormNameContext);
