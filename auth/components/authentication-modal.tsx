import './authentication-modal.sass';
import React from 'react';
import { useState } from '../../hooks/state';
import { RegisterModal } from './register-modal';
import { LoginModal } from './login-modal';
import { isUndefined } from '../../util';
import { useT } from '../../hooks/translation';

export interface Props {
  onSuccess: (token: string) => void;
  onError?: (error: any) => void;
  onClose: () => void;
  showRegisterModal?: boolean;
  showHeader?: boolean;
  children: {
    loginFormHeader: any;
    registrationFormHeader: any;
    registrationSuccessMessage: any;
    formChildren?: any;
  };
  getConfirmButtonLabel?: (initialLabel: string) => string;
}

export function AuthenticationModal({
  showRegisterModal = true,
  children,
  getConfirmButtonLabel,
  onError = () => undefined,
  onSuccess,
  onClose,
  showHeader = false
}: Props) {
  const showRegister = useState(showRegisterModal);
  const t = useT();

  if (showRegister.value) {
    return (
      <RegisterModal
        onClose={onClose}
        onError={onError}
        onSuccess={onSuccess}
        goToLogin={() => showRegister.set(false)}
        className={'authentication-modal-root'}
        confirmButtonLabel={
          isUndefined(getConfirmButtonLabel)
            ? undefined
            : getConfirmButtonLabel(t('register'))
        }
        showHeader={showHeader}
      >
        {{
          successMessage: children.registrationSuccessMessage,
          registerFormHeader: children.registrationFormHeader,
          formChildren: children.formChildren
        }}
      </RegisterModal>
    );
  }
  return (
    <LoginModal
      onSuccess={onSuccess}
      onError={onError}
      goToRegister={() => showRegister.set(true)}
      className={'authentication-modal-root'}
      confirmButtonLabel={
        isUndefined(getConfirmButtonLabel)
          ? undefined
          : getConfirmButtonLabel(t('login'))
      }
      showHeader={showHeader}
    >
      {{
        formHeader: children.loginFormHeader,
        formChildren: children.formChildren
      }}
    </LoginModal>
  );
}
