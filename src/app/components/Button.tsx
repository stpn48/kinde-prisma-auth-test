import React from "react";
import { twMerge } from "tailwind-merge";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "button";
  isLoading?: boolean;
};

export function Button({ className, onClick, children, disabled, type, isLoading, ...props }: Props) {
  return (
    <button
      className={twMerge(
        "flex items-center gap-2 rounded-sm bg-white px-2 py-1 text-sm text-black hover:bg-[#f0f0f0]",
        className,
        disabled && "cursor-not-allowed",
        disabled && "bg-opacity-45",
        disabled && "hover:bg-opacity-45",
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {isLoading ? <LoadingSpinner className="h-2 w-2" /> : null}
      {children}
    </button>
  );
}
