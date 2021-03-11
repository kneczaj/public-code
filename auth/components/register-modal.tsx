import React from 'react';
import { useState } from '../../hooks/state';
import Button from '@material-ui/core/Button';
import { RegistrationForm } from './registration-form';
import {
  isRegisterResponseToConfirm,
  RegisterResponsePayload
} from '../models/register';
import { useCT, useT } from '../../hooks/translation';
import Link from '@material-ui/core/Link';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

export interface Props {
  onClose: () => void;
  onSuccess: (token: string) => void;
  onError: (error: any) => void;
  goToLogin: () => void;
  children: {
    formChildren?: any;
    successMessage?: any;
    registerFormHeader?: any;
  };
  confirmButtonLabel?: string;
  className?: string;
  showHeader: boolean;
}

export function RegisterModal({
  confirmButtonLabel,
  className,
  children,
  onClose,
  onError,
  onSuccess: onSuccessBase,
  goToLogin,
  showHeader
}: Props): JSX.Element {
  const registerFinalized = useState(false);
  const t = useT();
  const ct = useCT();

  function onSuccess(payload: RegisterResponsePayload, username: string) {
    if (isRegisterResponseToConfirm(payload)) {
      registerFinalized.set(true);
    } else {
      onSuccessBase(payload.key);
    }
  }

  return (
    <>
      {showHeader && <DialogTitle>{ct('register')}</DialogTitle>}
      <DialogContent className={className}>
        {registerFinalized.value ? (
          <>
            {children.successMessage}
            <p>{t('account-verification-message')}</p>
          </>
        ) : (
          <>
            {children.registerFormHeader}
            <RegistrationForm
              confirmButtonLabel={confirmButtonLabel}
              onSuccess={onSuccess}
              onError={onError}
            >
              {children.formChildren}
            </RegistrationForm>
          </>
        )}
      </DialogContent>
      <DialogActions className={className}>
        <div className={'text-center'}>
          {registerFinalized.value ? (
            <Button color={'primary'} onClick={onClose}>
              {ct('close')}
            </Button>
          ) : (
            <Link component='button' onClick={goToLogin}>
              {ct('already have an account? - Log in')}
            </Link>
          )}
        </div>
      </DialogActions>
    </>
  );
}
