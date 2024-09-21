"use client";

import React, { useCallback } from "react";
import { Button } from "./Button";
import { ModalBackDrop } from "./ModalBackDrop";
import ModalBody from "./ModalBody";

type Props = {
  closeModal: () => void;
  confirmAction: () => void;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
};

export function ConfirmationModal({ closeModal, confirmAction, message, cancelButtonText, confirmButtonText }: Props) {
  const confirmButtonClick = useCallback(() => {
    confirmAction();
    closeModal();
  }, []);

  return (
    <ModalBackDrop className="h-full w-full" onClick={closeModal}>
      <ModalBody className="flex h-fit w-fit flex-col gap-4">
        <h1 className="text-center">{message}</h1>
        <div className="flex w-full justify-center gap-2">
          <Button onClick={confirmButtonClick} variant="secondary">
            {confirmButtonText}
          </Button>
          <Button onClick={closeModal}>{cancelButtonText}</Button>
        </div>
      </ModalBody>
    </ModalBackDrop>
  );
}
