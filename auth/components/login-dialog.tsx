import React from 'react';
import { Dialog } from '@material-ui/core';
import { DialogProps, useDialog } from 'public/providers/dialog-provider';
import { DialogProps as MaterialDialogProps } from '@material-ui/core/Dialog/Dialog';
import {
  LoginDialogContent,
  Props as ContentProps
} from './login-dialog-content';

export interface Props
  extends DialogProps,
    Omit<MaterialDialogProps, 'open' | 'onClose' | 'onError'>,
    Omit<ContentProps, 'onClose'> {
  onClose?: () => void;
}

export function LoginDialog({
  children = null,
  className,
  closeButtonLabel,
  confirmButtonLabel,
  formHeader,
  onError = (error: any) => undefined,
  onSuccess,
  onClose,
  title,
  ...rest
}: Props): JSX.Element {
  const { closeDialog } = useDialog();
  const contentProps: ContentProps = {
    className,
    closeButtonLabel,
    confirmButtonLabel,
    formHeader,
    onError,
    onSuccess,
    title,
    onClose: onClose || closeDialog
  };

  return (
    <Dialog onClose={onClose || closeDialog} {...rest} open={true}>
      <LoginDialogContent {...contentProps}>{children}</LoginDialogContent>
    </Dialog>
  );
}
