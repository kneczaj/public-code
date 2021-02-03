import React from "react";
import { useState } from "../../hooks/state";
import { ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Button from '@material-ui/core/Button';
import { RegistrationForm } from "./registration-form";
import { capitalizeFirstLetter } from "../../util";
import { isRegisterResponseToConfirm, RegisterResponsePayload, } from "../models/register";
import { useT } from "../../hooks/translation";
import { useModal } from "../../modals/hooks";
import Link from "@material-ui/core/Link";

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
  showHeader,
}: Props) {
  const registerFinalized = useState(false);
  const t = useT();
  const { closeModal } = useModal();

  function onSuccess(payload: RegisterResponsePayload, username: string) {
    if (isRegisterResponseToConfirm(payload)) {
      registerFinalized.set(true);
    } else {
      onSuccessBase(payload.key);
    }
  }

  return (
    <>
      {showHeader && (
        <ModalHeader toggle={closeModal}>
          {capitalizeFirstLetter(t("register"))}
        </ModalHeader>
      )}
      <ModalBody className={className}>
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
      </ModalBody>
      <ModalFooter className={className}>
        <div className={'text-center'}>
          {registerFinalized.value ? (
            <Button color={'primary'} onClick={onClose}>
              {capitalizeFirstLetter(t('close'))}
            </Button>
          ) : (
            <Link component="button" onClick={goToLogin}>
              {capitalizeFirstLetter(t('already have an account? - Log in'))}
            </Link>
          )}
        </div>
      </ModalFooter>
    </>
  );
}
