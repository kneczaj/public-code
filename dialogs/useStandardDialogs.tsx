import React, { useCallback } from 'react';
import { Map } from 'immutable';
import uniqueId from 'lodash.uniqueid';
import { DialogComponent, DialogProps } from './models';

export interface OpenDialogComponentProps extends DialogProps {}

export type OpenDialogFn = (
  Component: (props: OpenDialogComponentProps) => JSX.Element
) => void;

export interface Hook {
  DialogContainer: () => JSX.Element;
  /**
   * Open dialog
   * @param value JSX element of the dialog
   */
  openDialog: OpenDialogFn;
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

  return {
    openDialog,
    DialogContainer: () => (
      <>
        {[
          ...dialogs
            .map((DialogComponent, id) => (
              <DialogComponent key={id} id={id} close={() => closeDialog(id)} />
            ))
            .values()
        ]}
      </>
    )
  };
}
