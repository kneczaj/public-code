import { ContextHookFactory } from '../utils/context-hook';

export const FormName =
  ContextHookFactory.createHookAndContext<string>('form name');
