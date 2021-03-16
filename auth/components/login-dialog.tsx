import React from 'react';
import { LoginForm } from './login-form';
import { capitalizeFirstLetter, isUndefined } from '../../util';
import { useT } from '../../hooks/translation';
import { fromRelativeBEUrl } from 'env';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { DialogProps, useDialog } from 'public/providers/dialog-provider';
import { useUser } from 'public/auth/components/user-provider';

export interface Props extends DialogProps {
  onSuccess?: (token: string, closeDialog: () => void) => void;
  onError?: (error: any) => void;
  onClose?: () => void;
  formHeader?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  confirmButtonLabel?: string;
  title?: string;
}

export function LoginDialog({
  children = null,
  className,
  confirmButtonLabel,
  formHeader,
  onError = (error: any) => undefined,
  onSuccess: customOnSuccess,
  onClose,
  id,
  title
}: Props): JSX.Element {
  const t = useT();
  const { closeDialog } = useDialog();
  const { login } = useUser();

  function onSuccess(token: string) {
    if (customOnSuccess) {
      customOnSuccess(token, closeDialog);
    } else {
      login(token);
      closeDialog();
    }
  }

  return (
    <Dialog open={true} onClose={onClose || closeDialog} id={id}>
      <DialogTitle>{title || capitalizeFirstLetter(t('login'))}</DialogTitle>
      <DialogContent className={className}>
        {formHeader || (
          <p>
            {capitalizeFirstLetter(
              t('Please enter your username and password')
            )}
          </p>
        )}
        <a href={fromRelativeBEUrl(`/connect/facebook`)}>
          <button style={{ width: '150px' }}>Connect to facebook</button>
        </a>
        <a href={fromRelativeBEUrl(`/connect/google`)}>
          <button style={{ width: '150px' }}>Connect to google</button>
        </a>
        <LoginForm
          confirmButtonLabel={
            isUndefined(confirmButtonLabel) ? t('login') : confirmButtonLabel
          }
          onSuccess={onSuccess}
          onError={onError}
        >
          {children}
        </LoginForm>
      </DialogContent>
    </Dialog>
  );
}
