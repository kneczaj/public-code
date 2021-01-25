import React from "react";
import { Modal } from "reactstrap";
import { ModalContext, ModalType } from "./hooks";
import { capitalizeFirstLetter, isUndefined } from "../util";
import { Contact } from "./contact-modal";
import { Licenses } from "./licences-modal";
import { AuthenticationModal } from "../auth/components/authentication-modal";
import { useT } from "../hooks/translation";
import { useUser } from "../auth/components/user-provider";

interface Props {
  children: any;
}

export interface LocationState {
  successfulVerification: boolean;
  from: string;
}

export const ModalProvider = ({ children }: Props) => {
  let [modalContent, setModalContent] = React.useState<ModalType | undefined>(
    undefined
  );
  const { login } = useUser();
  const openModal = (content: ModalType) => {
    setModalContent(content);
  };
  const closeModal = () => setModalContent(undefined);

  const t = useT();

  function onSuccess(token: string) {
    login(token);
    closeModal();
  }

  const modalComponent: { [key in ModalType]: React.ReactNode } = {
    REGISTER: (
      <>
        <AuthenticationModal
          onClose={closeModal}
          onSuccess={onSuccess}
          showHeader={true}
        >
          {{
            registrationSuccessMessage: (
              <p>You're account has been created successfully</p>
            ),
            registrationFormHeader: (
              <p>
                {capitalizeFirstLetter(
                  t("Please enter your username and password")
                )}
              </p>
            ),
            loginFormHeader: (
              <p>
                {capitalizeFirstLetter(
                  t("Please enter your username and password")
                )}
              </p>
            ),
          }}
        </AuthenticationModal>
      </>
    ),
    LOGIN: (
      <>
        <AuthenticationModal
          onClose={closeModal}
          onSuccess={onSuccess}
          showRegisterModal={false}
          showHeader={true}
        >
          {{
            registrationSuccessMessage: (
              <p>You're account has been created successfully</p>
            ),
            registrationFormHeader: (
              <p>
                {capitalizeFirstLetter(
                  t("Please enter your username and password")
                )}
              </p>
            ),
            loginFormHeader: (
              <p>
                {capitalizeFirstLetter(
                  t("Please enter your username and password")
                )}
              </p>
            ),
          }}
        </AuthenticationModal>
      </>
    ),
    LICENSES: <Licenses />,
    CONTACT: <Contact />,
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {modalContent && (
        <Modal
          isOpen={!isUndefined(modalContent)}
          backdrop={true}
          toggle={closeModal}
          returnFocusAfterClose={true}
        >
          {modalComponent[modalContent]}
        </Modal>
      )}
      {children}
    </ModalContext.Provider>
  );
};
