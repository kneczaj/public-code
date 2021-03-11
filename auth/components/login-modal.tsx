import React from 'react';
import { LoginForm } from './login-form';
import { capitalizeFirstLetter } from '../../util';
import { useT } from '../../hooks/translation';
import Link from '@material-ui/core/Link';
import { fromRelativeBEUrl } from 'env';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

export interface Props {
  onSuccess: (token: string) => void;
  onError: (error: any) => void;
  goToRegister: () => void;
  children: {
    formHeader: any;
    formChildren: any;
  };
  className?: string;
  confirmButtonLabel?: string;
  showHeader: boolean;
}

export function LoginModal({
  children,
  className,
  confirmButtonLabel,
  goToRegister,
  onError,
  onSuccess,
  showHeader
}: Props): JSX.Element {
  const t = useT();

  return (
    <>
      {showHeader && (
        <DialogTitle>{capitalizeFirstLetter(t('login'))}</DialogTitle>
      )}
      <DialogContent className={className}>
        {children.formHeader}
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
          {children.formChildren}
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
    </>
  );
}
