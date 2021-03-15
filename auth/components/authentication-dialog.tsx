import './authentication-modal.sass';
import React from 'react';
import { useState } from '../../hooks/state';
import { RegisterModal } from './register-modal';
import { LoginModal } from './login-modal';
import { isUndefined } from '../../util';
import { useT } from '../../hooks/translation';
import { DialogProps } from 'public/providers/dialog-provider';

export interface Props {
  onSuccess?: (token: string, closeDialog: () => void) => void;
  onError?: (error: any) => void;
  onClose?: () => void;
  mode?: AuthenticationPage;
  showHeader?: boolean;
  loginFormHeader?: React.ReactNode;
  registrationFormHeader?: React.ReactNode;
  registrationSuccessMessage?: React.ReactNode;
  children?: React.ReactNode;
  getConfirmButtonLabel?: (initialLabel: string) => string;
  id?: string;
}

export enum AuthenticationPage {
  LOGIN,
  REGISTER
}

export function AuthenticationDialog({
  mode = AuthenticationPage.LOGIN,
  children,
  getConfirmButtonLabel,
  id,
  onError = () => undefined,
  onSuccess,
  onClose,
  registrationFormHeader,
  loginFormHeader,
  registrationSuccessMessage,
  showHeader = true
}: Props): JSX.Element {
  const page = useState<AuthenticationPage>(mode);
  const t = useT();

  if (page.value === AuthenticationPage.REGISTER) {
    return (
      <RegisterModal
        id={id}
        onClose={onClose}
        onError={onError}
        onSuccess={onSuccess}
        goToLogin={() => page.set(AuthenticationPage.LOGIN)}
        className={'authentication-modal-root'}
        confirmButtonLabel={
          isUndefined(getConfirmButtonLabel)
            ? undefined
            : getConfirmButtonLabel(t('register'))
        }
        showHeader={showHeader}
        formHeader={registrationFormHeader}
        successMessage={registrationSuccessMessage}
      >
        {children}
      </RegisterModal>
    );
  }
  return (
    <LoginModal
      id={id}
      onSuccess={onSuccess}
      onError={onError}
      goToRegister={() => page.set(AuthenticationPage.REGISTER)}
      className={'authentication-modal-root'}
      confirmButtonLabel={
        isUndefined(getConfirmButtonLabel)
          ? undefined
          : getConfirmButtonLabel(t('login'))
      }
      showHeader={showHeader}
      formHeader={loginFormHeader}
    >
      {children}
    </LoginModal>
  );
}

export const AuthenticationDialogOnRegister = ({
  id
}: DialogProps): JSX.Element => (
  <AuthenticationDialog mode={AuthenticationPage.REGISTER} id={id} />
);
export const AuthenticationDialogOnLogin = ({
  id
}: DialogProps): JSX.Element => (
  <AuthenticationDialog mode={AuthenticationPage.LOGIN} id={id} />
);
