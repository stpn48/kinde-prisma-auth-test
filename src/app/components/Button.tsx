import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "button";
};

export function Button({
  className,
  onClick,
  children,
  disabled,
  type,
  ...props
}: Props) {
  return (
    <button
      className={twMerge(
        "bg-white rounded-sm px-2 py-1 text-sm hover:bg-[#f0f0f0]",
        className,
        disabled && "cursor-not-allowed",
        disabled && "bg-opacity-45"
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
