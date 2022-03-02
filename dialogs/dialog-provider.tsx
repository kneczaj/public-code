import React from 'react';
import {
  ContextHookFactory,
  useDefinedContext
} from 'public/utils/context-hook';
import { ProviderComponentProps } from 'public/components/provider-group';
import { OpenDialogFn, useDialogs } from 'public/dialogs/useDialogs';

const DialogContext =
  ContextHookFactory.createContext<OpenDialogFn<unknown>>('Dialog');
export function useGlobalDialog<TAdditionalProps = void>() {
  return useDefinedContext(DialogContext) as OpenDialogFn<TAdditionalProps>;
}

export function DialogProvider({
  children
}: ProviderComponentProps): JSX.Element {
  const { openDialog, DialogContainer } = useDialogs();
  return (
    <DialogContext.Provider value={openDialog}>
      {children}
      <DialogContainer />
    </DialogContext.Provider>
  );
}
