import React from 'react';
import { useCT } from 'public/hooks/translation';
import { useUser } from 'public/auth/providers/user-provider';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { LoginForm } from 'public/auth/components/login-form';
import { isUndefined } from 'public/util';
import Button from '@material-ui/core/Button';
import { ConfirmDialogProps } from 'public/providers/dialog-provider';
import { getBackendUrl } from "app/root/models/urls";

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
  enableOAuthProviders: boolean;
}

export function LoginDialogContent({
  children = null,
  className,
  closeButtonLabel,
  confirmButtonLabel,
  enableOAuthProviders,
  formHeader,
  title,
  close,
  confirm
}: Props): JSX.Element {
  const ct = useCT();
  const {login} = useUser();

  function onSuccess(token: string) {
    login(token);
    confirm({token});
  }

  return (
    <>
      <DialogTitle>{title || ct('login')}</DialogTitle>
      <DialogContent className={className}>
        {formHeader || <p>{ct('Please enter your username and password')}</p>}
        {enableOAuthProviders && <>
          <a href={getBackendUrl(`/connect/facebook`)}>
            <button style={{width: '150px'}}>Connect to facebook</button>
          </a>
          <a href={getBackendUrl(`/connect/google`)}>
            <button style={{width: '150px'}}>Connect to google</button>
          </a>
        </>}
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
