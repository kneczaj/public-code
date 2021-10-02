import React from 'react';
import { Dialog } from '@material-ui/core';
import { DialogProps as MaterialDialogProps } from '@material-ui/core/Dialog/Dialog';
import {
  AuthenticationDialogContent,
  Props as ContentProps
} from 'public/auth/components/authentication-dialog-content';
import { ConfirmDialogProps } from 'public/providers/dialog-provider';

export interface Props
  extends ConfirmDialogProps<void>,
    Omit<MaterialDialogProps, 'open' | 'onClose' | 'onError' | 'id'>,
    Omit<ContentProps, 'onClose' | 'enableOAuthProviders'> {}

export function AuthenticationDialog({
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
      <AuthenticationDialogContent {...contentProps}>{children}</AuthenticationDialogContent>
    </Dialog>
  );
}
