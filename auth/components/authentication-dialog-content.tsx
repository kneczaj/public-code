import React from 'react';
import { useCT } from 'public/hooks/translation';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { LoginForm } from 'public/auth/components/login-form';
import { isUndefined } from 'public/util';
import Button from '@material-ui/core/Button';
import { ConfirmDialogProps } from 'public/dialogs/ConfirmDialog';
import { getBackendUrl } from 'app/root/models/urls';
import { useAuth, AuthContext } from 'public/auth/providers/auth-provider';
import { RegistrationForm } from 'public/auth/components/registration-form';
import { useToggle } from 'public/hooks/toggle';

export type Page = 'REGISTER' | 'LOGIN';

export interface Props extends Omit<ConfirmDialogProps, 'id'> {
  formHeader?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  confirmButtonLabel?: string;
  title?: string;
  closeButtonLabel?: string;
  enableOAuthProviders: boolean;
  initialPage?: Page;
  showCloseButton?: boolean;
}

export function AuthenticationDialogContent({
  children = null,
  initialPage = 'LOGIN',
  className,
  closeButtonLabel,
  confirmButtonLabel,
  enableOAuthProviders,
  formHeader,
  title,
  confirm,
  close,
  showCloseButton = true
}: Props): JSX.Element {
  const ct = useCT();
  const { value: onLoginPage, toggle: togglePage } = useToggle(
    initialPage === 'LOGIN'
  );
  const { login: loginBase, register: registerBase, ...userApi } = useAuth();

  function confirmWhenNoErrors<T>(formErrors: T) {
    if (isUndefined(formErrors)) {
      confirm();
    }
    return formErrors;
  }

  return (
    <AuthContext.Provider
      value={{
        ...userApi,
        login: payload => loginBase(payload).then(confirmWhenNoErrors),
        register: payload => registerBase(payload).then(confirmWhenNoErrors)
      }}
    >
      <DialogTitle>
        {title || onLoginPage ? ct('login') : ct('register')}
      </DialogTitle>
      <DialogContent className={className}>
        {formHeader || (
          <p>
            {onLoginPage
              ? ct('please enter your username and password')
              : ct('please fill up the form')}
          </p>
        )}
        {enableOAuthProviders && (
          <>
            <a href={getBackendUrl(`/connect/facebook`)}>
              <button style={{ width: '150px' }}>Connect to facebook</button>
            </a>
            <a href={getBackendUrl(`/connect/google`)}>
              <button style={{ width: '150px' }}>Connect to google</button>
            </a>
          </>
        )}
        {onLoginPage ? (
          <LoginForm confirmButtonLabel={confirmButtonLabel}>
            {children}
          </LoginForm>
        ) : (
          <RegistrationForm confirmButtonLabel={confirmButtonLabel}>
            {children}
          </RegistrationForm>
        )}
      </DialogContent>
      <DialogActions>
        {showCloseButton && (
          <Button onClick={close} color='primary' autoFocus>
            {closeButtonLabel || ct('close')}
          </Button>
        )}
        <Button onClick={togglePage}>
          {ct(
            onLoginPage
              ? "I don't have an account - register me"
              : 'already have an account? - Log in'
          )}
        </Button>
      </DialogActions>
    </AuthContext.Provider>
  );
}
