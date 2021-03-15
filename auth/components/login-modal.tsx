import React from 'react';
import { LoginForm } from './login-form';
import { capitalizeFirstLetter } from '../../util';
import { useT } from '../../hooks/translation';
import Link from '@material-ui/core/Link';
import { fromRelativeBEUrl } from 'env';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { useDialog } from 'public/providers/dialog-provider';
import { useUser } from 'public/auth/components/user-provider';

export interface Props {
  onSuccess?: (token: string, closeDialog: () => void) => void;
  onError: (error: any) => void;
  goToRegister: () => void;
  formHeader?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  confirmButtonLabel?: string;
  showHeader: boolean;
  id?: string;
}

export function LoginModal({
  children = null,
  className,
  confirmButtonLabel,
  formHeader,
  goToRegister,
  onError,
  onSuccess: customOnSuccess,
  showHeader,
  id
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
    <Dialog open={true} onClose={closeDialog} id={id}>
      {showHeader && (
        <DialogTitle>{capitalizeFirstLetter(t('login'))}</DialogTitle>
      )}
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
          confirmButtonLabel={confirmButtonLabel}
          onSuccess={onSuccess}
          onError={onError}
        >
          {children}
        </LoginForm>
      </DialogContent>
      <DialogActions className={className}>
        <div className={'text-center'}>
          {
            <Link component='button' onClick={goToRegister}>
              {capitalizeFirstLetter(
                t("I don't have an account - register me")
              )}
            </Link>
          }
        </div>
      </DialogActions>
    </Dialog>
  );
}
