import React from 'react';
import { useCT } from 'public/hooks/translation';
import { useUser } from 'public/auth/components/user-provider';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { fromRelativeBEUrl } from 'env';
import { LoginForm } from 'public/auth/components/login-form';
import { isUndefined } from 'public/util';
import Button from '@material-ui/core/Button';
import { ConfirmDialogProps } from 'public/providers/dialog-provider';

export interface ReturnValue {
  token: string;
}

export interface Props extends Omit<ConfirmDialogProps<ReturnValue>, 'id'> {
  formHeader?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  confirmButtonLabel?: string;
  title?: string;
  closeButtonLabel?: string;
}

export function LoginDialogContent({
  children = null,
  className,
  closeButtonLabel,
  confirmButtonLabel,
  formHeader,
  title,
  close,
  confirm
}: Props): JSX.Element {
  const ct = useCT();
  const { login } = useUser();

  function onSuccess(token: string) {
    login(token);
    confirm({ token });
  }
  return (
    <>
      <DialogTitle>{title || ct('login')}</DialogTitle>
      <DialogContent className={className}>
        {formHeader || <p>{ct('Please enter your username and password')}</p>}
        <a href={fromRelativeBEUrl(`/connect/facebook`)}>
          <button style={{ width: '150px' }}>Connect to facebook</button>
        </a>
        <a href={fromRelativeBEUrl(`/connect/google`)}>
          <button style={{ width: '150px' }}>Connect to google</button>
        </a>
        <LoginForm
          confirmButtonLabel={
            isUndefined(confirmButtonLabel) ? ct('login') : confirmButtonLabel
          }
          onSuccess={onSuccess}
          onError={() => undefined /* TODO */}
        >
          {children}
        </LoginForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color='primary' autoFocus>
          {closeButtonLabel || ct('close')}
        </Button>
      </DialogActions>
    </>
  );
}
