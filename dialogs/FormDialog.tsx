import { useGlobalDialog } from 'public/dialogs/dialog-provider';
import React, { PropsWithChildren, ReactNode } from 'react';
import { Hook } from './models';
import { DialogComponent, DialogProps } from './useDialogs';
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { Form, Props as FormProps } from 'public/forms/components/form';
import Button from '@material-ui/core/Button';
import { useCT } from 'public/hooks/translation';
import { EventHandlers as SimpleDialogEventHandlers } from 'public/dialogs/SimpleDialog';
import { DialogEventsBase } from 'public/dialogs/useStandardDialogs';

export interface Events<TReturnValue> extends DialogEventsBase {
  confirm: (data: TReturnValue) => void;
}

/**
 * These are the events handlers which go beyond onClose handler
 */
export interface EventHandlers<TReturnValue> extends SimpleDialogEventHandlers {
  onConfirm?: Events<TReturnValue>['confirm'];
}

/**
 * Base props of the dialog content
 */
export interface BaseProps<TReturnValue>
  extends Omit<FormProps<TReturnValue>, 'children' | 'onSubmit'> {
  DialogTitleContent?: ReactNode;
  confirmLabel?: string;
  closeLabel?: string;
}

/**
 * Props to be implemented in FormDialog components
 */
export type FormDialogProps<
  TValues,
  TBaseProps = BaseProps<TValues>
> = DialogProps<Events<TValues>> & TBaseProps;

export function FormDialog<TValues>({
  children,
  close,
  closeLabel,
  confirm,
  confirmLabel,
  id,
  DialogTitleContent,
  ...formProps
}: PropsWithChildren<FormDialogProps<TValues>>): JSX.Element {
  const ct = useCT();
  return (
    <MuiDialog open={true} onClose={close} id={id}>
      {DialogTitleContent && <DialogTitle>{DialogTitleContent}</DialogTitle>}
      <Form
        onSubmit={confirm}
        {...formProps}
        Footer={() => (
          <DialogActions>
            <Button color='secondary' onClick={close}>
              {closeLabel || ct('close')}
            </Button>
            <Button type={'submit'} color='primary' autoFocus>
              {confirmLabel || ct('save')}
            </Button>
          </DialogActions>
        )}
      >
        <DialogContent>{children}</DialogContent>
      </Form>
    </MuiDialog>
  );
}

export function useFormDialog<TReturnValue, TProps = unknown>(
  Component: DialogComponent<Events<TReturnValue> & TProps>
): Hook<EventHandlers<TReturnValue> | void, TProps, TReturnValue> {
  const openDialog = useGlobalDialog();
  return {
    open({
      onClose,
      onConfirm,
      ...props
    }: EventHandlers<TReturnValue> & TProps) {
      openDialog(dialogProps => (
        <Component
          {...(props as TProps)}
          {...dialogProps}
          close={() => {
            onClose && onClose();
            dialogProps.close();
          }}
          confirm={(data: TReturnValue) => {
            onConfirm && onConfirm(data);
            dialogProps.close();
          }}
        />
      ));
    },
    openAsync(props: TProps): Promise<TReturnValue> {
      return new Promise<TReturnValue>((resolve, reject) => {
        openDialog(dialogProps => (
          <Component
            {...(props as TProps)}
            {...dialogProps}
            close={() => {
              reject();
              dialogProps.close();
            }}
            confirm={(data: TReturnValue) => {
              resolve(data);
              dialogProps.close();
            }}
          />
        ));
      });
    }
  };
}
