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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { useDialog } from 'public/providers/dialog-provider';
import { capitalizeFirstLetter } from 'public/util';
import { useUser } from 'public/auth/components/user-provider';

export interface Props {
  onClose?: () => void;
  onSuccess?: (token: string, closeDialog: () => void) => void;
  onError: (error: any) => void;
  goToLogin: () => void;
  formHeader?: React.ReactNode;
  children?: React.ReactNode;
  successMessage?: React.ReactNode;
  confirmButtonLabel?: string;
  className?: string;
  showHeader: boolean;
  id?: string;
}

export function RegisterModal({
  confirmButtonLabel,
  className,
  children,
  onClose,
  onError,
  onSuccess: customOnSuccess,
  goToLogin,
  showHeader,
  successMessage,
  formHeader,
  id
}: Props): JSX.Element {
  const registerFinalized = useState(false);
  const t = useT();
  const ct = useCT();
  const { closeDialog } = useDialog();
  const { login } = useUser();

  function onSuccess(payload: RegisterResponsePayload) {
    if (isRegisterResponseToConfirm(payload)) {
      registerFinalized.set(true);
    } else if (customOnSuccess) {
      customOnSuccess(payload.key, closeDialog);
    } else {
      login(payload.key);
      closeDialog();
    }
  }

  return (
    <Dialog open={true} onClose={closeDialog} id={id}>
      {showHeader && <DialogTitle>{ct('register')}</DialogTitle>}
      <DialogContent className={className}>
        {registerFinalized.value ? (
          <>
            {successMessage || (
              <p>{t('Your account has been created successfully')}</p>
            )}
            <p>{t('account-verification-message')}</p>
          </>
        ) : (
          <>
            {formHeader || (
              <p>
                {capitalizeFirstLetter(
                  t('Please enter your username and password')
                )}
              </p>
            )}
            <RegistrationForm
              confirmButtonLabel={confirmButtonLabel}
              onSuccess={onSuccess}
              onError={onError}
            >
              {children}
            </RegistrationForm>
          </>
        )}
      </DialogContent>
      <DialogActions className={className}>
        <div className={'text-center'}>
          {registerFinalized.value ? (
            <Button color={'primary'} onClick={closeDialog || onClose}>
              {ct('close')}
            </Button>
          ) : (
            <Link component='button' onClick={goToLogin}>
              {ct('already have an account? - Log in')}
            </Link>
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
}
