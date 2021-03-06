import React from 'react';
import { Dialog } from '@material-ui/core';
import { DialogProps as MaterialDialogProps } from '@material-ui/core/Dialog/Dialog';
import {
  LoginDialogContent,
  Props as ContentProps,
  ReturnValue
} from './login-dialog-content';
import { ConfirmDialogProps } from 'public/providers/dialog-provider';

export interface Props
  extends ConfirmDialogProps<ReturnValue>,
    Omit<MaterialDialogProps, 'open' | 'onClose' | 'onError' | 'id'>,
    Omit<ContentProps, 'onClose'> {}

export function LoginDialog({
  children = null,
  className,
  closeButtonLabel,
  confirmButtonLabel,
  formHeader,
  confirm,
  close,
  title,
  ...rest
}: Props): JSX.Element {
  const contentProps: ContentProps = {
    className,
    closeButtonLabel,
    confirmButtonLabel,
    formHeader,
    close,
    confirm,
    title
  };

  return (
    <Dialog onClose={close} {...rest} open={true}>
      <LoginDialogContent {...contentProps}>{children}</LoginDialogContent>
    </Dialog>
  );
}
