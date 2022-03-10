import React from 'react';
import { ContextHookFactory } from 'public/utils/context-hook';
import { ProviderComponentProps } from 'public/components/provider-group';
import { Hook, useDialogs } from 'public/dialogs/useDialogs';

const DialogContext =
  ContextHookFactory.createContext<Hook['openDialog']>('Dialog');
export const useGlobalDialog = ContextHookFactory.createHook(DialogContext);

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
