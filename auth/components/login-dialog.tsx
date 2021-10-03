import React from 'react';
import { Dialog } from '@material-ui/core';
import { DialogProps as MaterialDialogProps } from '@material-ui/core/Dialog/Dialog';
import {
  LoginDialogContent,
  Props as ContentProps
} from './login-dialog-content';
import { ConfirmDialogProps } from 'public/providers/dialog-provider';

export interface Props
  extends ConfirmDialogProps<void>,
    Omit<MaterialDialogProps, 'open' | 'onClose' | 'onError' | 'id'>,
    Omit<ContentProps, 'onClose' | 'enableOAuthProviders'> {}

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
  const enableOAuthProviders = true;
  const contentProps: ContentProps = {
    className,
    closeButtonLabel,
    confirmButtonLabel,
    enableOAuthProviders,
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
