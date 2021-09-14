import React, { useCallback } from 'react';
import { ProviderComponentProps } from 'public/components/provider-group';
import { Map } from 'immutable';
import uniqueId from 'lodash.uniqueid';
import { createContext, createContextHook } from 'public/utils/context-hook';
import { isUndefined } from 'public/util';

export interface DialogProps {
  id: string;
  close: () => void;
}

export type DialogComponent = React.ComponentType<DialogProps>;

export interface Hook {
  /**
   * Open dialog
   * @param value JSX element of the dialog
   */
  openDialog: (dialog: DialogComponent, onClose?: () => void) => void;
}

export const DialogContext = createContext<Hook>('dialog');

/**
 * NOTE: please use the hook from index.ts instead
 */
export const useDialog = createContextHook(DialogContext);

export const DialogProvider = ({
  children
}: ProviderComponentProps): JSX.Element => {
  const [dialogs, setDialogs] = React.useState<Map<string, DialogComponent>>(
    Map()
  );
  const closeDialog = useCallback(
    (id: string) => {
      setDialogs(dialogs.remove(id));
    },
    [setDialogs, dialogs]
  );
  const openDialog = useCallback(
    (Component: DialogComponent, onClose?: () => void) => {
      const id = uniqueId('dialog');
      const WrappedComponent = isUndefined(onClose)
        ? Component
        : ({ id, close }: DialogProps) => (
            <Component
              id={id}
              close={() => {
                onClose && onClose();
                close();
              }}
            />
          );
      setDialogs(dialogs.set(id, WrappedComponent));
    },
    [setDialogs, dialogs]
  );

  return (
    <DialogContext.Provider value={{ openDialog }}>
      {children}
      {[
        ...dialogs
          .map((DialogComponent, id) => (
            <DialogComponent key={id} id={id} close={() => closeDialog(id)} />
          ))
          .values()
      ]}
    </DialogContext.Provider>
  );
};

export interface AsyncHook {
  /**
   * Open dialog
   */
  openDialog(Component: DialogComponent): Promise<void>;
}

/**
 * Allows to fire the dialog asynchronously. Resolves the promise on confirm, and rejects on cancel/close.
 *
 * NOTE: please use the hook from index.ts instead
 */
export function useDialogAsync(): AsyncHook {
  const { openDialog: openDialogBase } = useDialog();
  return {
    openDialog<TReturnValue>(
      Component: DialogComponent
    ): Promise<TReturnValue> {
      return new Promise<TReturnValue>(resolve => {
        openDialogBase(Component, resolve as () => void);
      });
    }
  };
}
