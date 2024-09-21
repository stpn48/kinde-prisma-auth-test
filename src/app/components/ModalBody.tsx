"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
  closeModal?: () => void;
};

export default function ModalBody({ children, className, closeModal }: Props) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={twMerge("modal-bg-color h-[95%] w-[90%] rounded-lg p-4 text-white shadow-md", className)}
    >
      {closeModal && (
        <button className="absolute right-4 top-4" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      {children}
    </div>
  );
}
