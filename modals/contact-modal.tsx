import React from "react";
import { ModalHeader, ModalBody } from "reactstrap";
import { useT } from "../hooks/translation";
import { capitalizeFirstLetter } from "../util";
import { CONTACT_EMAIL } from "../config";
import { useModal } from "./hooks";

export interface Props { }

export function Contact(props: Props) {
  const t = useT();
  const { closeModal } = useModal();

  return (
    <>
      <ModalHeader toggle={closeModal}>
        {capitalizeFirstLetter(t("contact"))}
      </ModalHeader>
      <ModalBody>
        <h5 itemProp={"company"}>Gryfny Team Sp. z o.o.</h5>
        <div>
          <div itemProp={"address"}>
            <div>Rynek Główny 28</div>
            <div>31-010 Kraków</div>
          </div>
          <div>NIP: 6762568340</div>
          <div>REGON: 38387064900000</div>
        </div>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </ModalBody>
    </>
  );
}
