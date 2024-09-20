"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export function ModalBackDrop({ onClick, className, children }: Props) {
  return (
    <div
      className={twMerge(
        "fixed inset-0 flex h-screen w-screen items-center justify-center bg-stone-900 bg-opacity-50 text-white",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
