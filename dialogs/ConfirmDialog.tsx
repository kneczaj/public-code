import {
  EventHandlers as FormDialogEventHandlers,
  Events as FormDialogEvents,
  useFormDialog
} from 'public/dialogs/FormDialog';
import { DialogComponent, DialogProps, Hook } from './models';
import React, { PropsWithChildren, ReactNode } from 'react';
import { useCT } from 'public/hooks/translation';
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import Button from '@material-ui/core/Button';

export interface Events extends FormDialogEvents<void> {}
export interface EventHandlers extends FormDialogEventHandlers<void> {}

/**
 * Base props of the dialog content
 */
export interface BaseProps {
  DialogTitleContent?: ReactNode;
  confirmLabel?: string;
  closeLabel?: string;
}

/**
 * Props to be implemented in ConfirmDialog components
 */
export interface ConfirmDialogProps extends DialogProps<Events>, BaseProps {}

export function ConfirmDialog({
  children,
  close,
  closeLabel,
  confirm,
  confirmLabel,
  id,
  DialogTitleContent
}: PropsWithChildren<ConfirmDialogProps>): JSX.Element {
  const ct = useCT();
  return (
    <MuiDialog open={true} onClose={close} id={id}>
      {DialogTitleContent && <DialogTitle>{DialogTitleContent}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={close}>
          {closeLabel || ct('no')}
        </Button>
        <Button color='primary' autoFocus onClick={() => confirm()}>
          {confirmLabel || ct('yes')}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}

export function useConfirmDialog(
  Component: DialogComponent<Events>
): Hook<EventHandlers | void> {
  return useFormDialog<void>(Component);
}
