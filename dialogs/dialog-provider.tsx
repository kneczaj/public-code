import React, { useCallback } from 'react';
import { ProviderComponentProps } from 'public/components/provider-group';
import { Map } from 'immutable';
import uniqueId from 'lodash.uniqueid';
import { createHookContext } from 'public/utils/context-hook';
import { DialogComponent, DialogEventsBase, DialogProps } from './models';

export interface OpenDialogComponentProps extends DialogProps {}

export interface HookContext {
  /**
   * Open dialog
   * @param value JSX element of the dialog
   */
  openDialog: (
    Component: (props: OpenDialogComponentProps) => JSX.Element
  ) => void;
}

export const Dialog = createHookContext<HookContext>('Dialog');

export const DialogProvider = ({
  children
}: ProviderComponentProps): JSX.Element => {
  const [dialogs, setDialogs] = React.useState<
    Map<string, DialogComponent<DialogEventsBase>>
  >(Map());
  const closeDialog = useCallback(
    (id: string) => {
      setDialogs(dialogs.remove(id));
    },
    [setDialogs, dialogs]
  );
  const openDialog: HookContext['openDialog'] = useCallback(
    Component => {
      const id = uniqueId('Dialog');
      setDialogs(dialogs.set(id, Component));
    },
    [setDialogs, dialogs]
  );

  return (
    <Dialog.Context.Provider value={{ openDialog }}>
      {children}
      {[
        ...dialogs
          .map((DialogComponent, id) => (
            <DialogComponent key={id} id={id} close={() => closeDialog(id)} />
          ))
          .values()
      ]}
    </Dialog.Context.Provider>
  );
};
