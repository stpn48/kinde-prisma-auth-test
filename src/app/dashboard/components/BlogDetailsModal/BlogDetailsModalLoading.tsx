"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import { ModalBackDrop } from "@/app/components/ModalBackDrop";
import ModalBody from "@/app/components/ModalBody";
import React from "react";

export function BlogDetailsModalLoading() {
  return (
    <ModalBackDrop>
      <ModalBody className="flex items-center justify-center">
        <LoadingSpinner />
      </ModalBody>
    </ModalBackDrop>
  );
}
