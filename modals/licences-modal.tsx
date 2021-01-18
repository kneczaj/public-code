import React from "react";
import { ModalHeader, ModalBody } from "reactstrap";
import { useT } from "../hooks/translation";
import { capitalizeFirstLetter } from "../util";
import { useModal } from "./hooks";

export interface Props { }

export function Licenses(props: Props) {
  const t = useT();
  const { closeModal } = useModal();

  return (
    <>
      <ModalHeader toggle={closeModal}>
        {capitalizeFirstLetter(t("licenses"))}
      </ModalHeader>
      <ModalBody>
        <h5>Logo</h5>
        <p>
          Żaba użyta w logo jest licencjonowana na{" "}
          <a
            href={"https://creativecommons.org/licenses/by/4.0/deed.pl"}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            Creative Commons BY 4.0
          </a>
          , źrodło:{" "}
          <a
            href={
              "https://www.svgrepo.com/svg/263334/frog?fbclid=IwAR3nDDCW7VHHVaIY4CyUkV5wa5u7yr6Qx9LsQTjWz4GBm7UzZBZPzfDzlYU"
            }
            rel="noopener noreferrer"
          >
            svgrepo.com
          </a>
          . Nie została poddana żadnym modyfikacjom.
        </p>
      </ModalBody>
    </>
  );
}
