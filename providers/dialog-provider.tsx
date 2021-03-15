import React, { useCallback, useContext } from 'react';
import { ProviderComponentProps } from 'public/components/provider-group';
import { ContextError, createContext } from 'public/utils/context-hook';
import uniqueId from 'lodash.uniqueid';
import { Map } from 'immutable';
import { isUndefined } from 'public/util';

export type DialogConstructor = (props: DialogProps) => JSX.Element;
export type DialogDestructor = () => void;

export interface DialogProps {
  id: string;
}

export type DialogComponent = (props: DialogProps) => JSX.Element;

interface ContextProps {
  /**
   * Open dialog
   * @param value JSX element of the dialog
   * @return function which is to be used to close the dialog
   */
  openDialog: (dialog: DialogConstructor) => void;
  closeDialog: (id: string) => void;
}

interface CloseDialogContextProps {
  /**
   * Close dialog
   */
  closeDialog: DialogDestructor;
}

export interface Hook
  extends Omit<ContextProps, 'closeDialog'>,
    CloseDialogContextProps {}

export const DialogContext = createContext<ContextProps>('dialog');
export const CloseDialogContext = createContext<CloseDialogContextProps>(
  'close dialog'
);

export function useDialog(): Hook {
  const { openDialog } = useContext(DialogContext);
  const closeDialogContext: CloseDialogContextProps | undefined = useContext(
    CloseDialogContext
  );
  if (isUndefined(openDialog)) {
    throw new ContextError(
      `A context hook for ${DialogContext.displayName} is used outside the context provider`
    );
  }
  const closeDialog: DialogDestructor = useCallback(() => {
    if (isUndefined(closeDialogContext)) {
      throw new ContextError(
        `A context hook for ${CloseDialogContext.displayName} is used outside the context provider`
      );
    }
    closeDialogContext.closeDialog();
  }, [closeDialogContext]);
  return {
    openDialog,
    closeDialog
  };
}

export const DialogProvider = ({
  children
}: ProviderComponentProps): JSX.Element => {
  const [dialogs, setDialogs] = React.useState<Map<string, DialogComponent>>(
    Map()
  );
  const openDialog = useCallback(
    (dialog: DialogComponent) => {
      const id = uniqueId('dialog');
      setDialogs(dialogs.set(id, dialog));
    },
    [setDialogs, dialogs]
  );
  const closeDialog = useCallback(
    (id: string) => {
      setDialogs(dialogs.remove(id));
    },
    [setDialogs, dialogs]
  );

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {[
        ...dialogs
          .map((Dialog, id) => (
            <CloseDialogContext.Provider
              key={id}
              value={{ closeDialog: () => closeDialog(id) }}
            >
              <Dialog id={id} />
            </CloseDialogContext.Provider>
          ))
          .values()
      ]}
      {children}
    </DialogContext.Provider>
  );
};
