import React from "react";
import { Button } from "./Button";
import { ModalBackDrop } from "./ModalBackDrop";
import ModalBody from "./ModalBody";

type Props = {
  closeModal: () => void;
  confirmAction: () => void;
  message: string;
  confirmButoonText: string;
  cancelButoonText: string;
};

export function ConfrimationModal({ closeModal, confirmAction, message, cancelButoonText, confirmButoonText }: Props) {
  return (
    <ModalBackDrop className="h-full w-full" onClick={closeModal}>
      <ModalBody className="h-fit w-fit">
        <h1>{message}</h1>
        <div>
          <Button onClick={confirmAction}>{confirmButoonText}</Button>
          <Button onClick={closeModal}>{cancelButoonText}</Button>
        </div>
      </ModalBody>
    </ModalBackDrop>
  );
}
