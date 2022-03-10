import { useGlobalDialog } from 'public/dialogs/dialog-provider';
import { Dialog as MuiDialog, DialogActions } from '@material-ui/core';
import { DialogComponent } from './useDialogs';
import React, { PropsWithChildren } from 'react';
import Button from '@material-ui/core/Button';
import { useCT } from 'public/hooks/translation';
import {
  DialogEventsBase,
  DialogProps
} from 'public/dialogs/useStandardDialogs';
import { Hook } from './models';

export interface EventHandlers {
  onClose?: DialogEventsBase['close'];
}

export interface SimpleDialogProps extends DialogProps {
  closeButtonLabel?: string;
}

export function useSimpleDialog(
  Component: DialogComponent
): Hook<EventHandlers | void> {
  const openDialog = useGlobalDialog();
  return {
    open({ onClose } = {}) {
      openDialog(props => (
        <Component
          {...props}
          close={() => {
            onClose && onClose();
            props.close();
          }}
        />
      ));
    },
    openAsync(): Promise<void> {
      return new Promise<void>(resolve => {
        openDialog(props => (
          <Component
            {...props}
            close={() => {
              resolve();
              props.close();
            }}
          />
        ));
      });
    }
  };
}

export function SimpleDialog({
  children,
  close,
  id,
  closeButtonLabel
}: PropsWithChildren<SimpleDialogProps>): JSX.Element {
  const ct = useCT();
  return (
    <MuiDialog open={true} onClose={close} id={id}>
      {children}
      <DialogActions>
        <Button onClick={close} color='primary' autoFocus>
          {closeButtonLabel || ct('close')}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}
