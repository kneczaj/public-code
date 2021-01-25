import React from "react";
import { Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { LoginForm } from "./login-form";
import { capitalizeFirstLetter } from "../../util";
import { useT } from "../../hooks/translation";
import { useModal } from "../../modals/hooks";
import { BACKEND_URL } from "../../../env";

export interface Props {
  onSuccess: (token: string) => void;
  onError: (error: any) => void;
  goToRegister: () => void;
  children: {
    formHeader: any,
    formChildren: any
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
  showHeader,
}: Props) {
  const t = useT();
  const { closeModal } = useModal();

  return (
    <>
      {showHeader && (
        <ModalHeader toggle={closeModal}>
          {capitalizeFirstLetter(t('login'))}
        </ModalHeader>
      )}
      <ModalBody className={className}>
        {children.formHeader}
        <a href={`${BACKEND_URL}/connect/facebook`}>
          <button style={{ width: '150px' }}>Connect to facebook</button>
        </a>
        <a href={`${BACKEND_URL}/connect/google`}>
          <button style={{ width: '150px' }}>Connect to google</button>
        </a>
        <LoginForm confirmButtonLabel={confirmButtonLabel} onSuccess={onSuccess} onError={onError}>
          {children.formChildren}
        </LoginForm>
      </ModalBody>
      <ModalFooter className={className}>
        <div className={'text-center'}>{
          <Button color={'link'} onClick={goToRegister}>
            {capitalizeFirstLetter(t('I don\'t have an account - register me'))}
          </Button>
        }</div>
      </ModalFooter>
    </>
  );
}
