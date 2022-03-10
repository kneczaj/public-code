import React, { ComponentType, useCallback } from 'react';
import { Map } from 'immutable';
import uniqueId from 'lodash.uniqueid';

export interface DialogEventsBase {
  close: () => void;
}

export interface DialogProps extends DialogEventsBase {
  id: string;
}

export type DialogComponent = ComponentType<DialogProps>;

export interface Hook {
  DialogContainer: ComponentType;
  /**
   * Open dialog
   * @param value JSX element of the dialog
   */
  openDialog: (Component: DialogComponent) => void;
}

export function useStandardDialogs(): Hook {
  const [dialogs, setDialogs] = React.useState<Map<string, DialogComponent>>(
    Map()
  );
  const closeDialog = useCallback(
    (id: string) => {
      setDialogs(dialogs.remove(id));
    },
    [setDialogs, dialogs]
  );
  const openDialog: Hook['openDialog'] = useCallback(
    Component => {
      const id = uniqueId('Dialog');
      setDialogs(dialogs.set(id, Component));
    },
    [setDialogs, dialogs]
  );

  const DialogContainer = useCallback(
    () => (
      <>
        {[
          ...dialogs
            .map((DialogComponent, id) => (
              <DialogComponent key={id} id={id} close={() => closeDialog(id)} />
            ))
            .values()
        ]}
      </>
    ),
    [dialogs, closeDialog]
  );

  return {
    openDialog,
    DialogContainer
  };
}
