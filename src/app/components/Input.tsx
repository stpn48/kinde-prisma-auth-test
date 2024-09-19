import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  name?: string;
};

export function Input({
  placeholder,
  onChange,
  value,
  type,
  className,
  required,
  disabled,
  autoFocus,
  name,
  ...props
}: Props) {
  return (
    <input
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      type={type}
      className={twMerge(
        "w-full rounded-md border border-[#242424] bg-[#0f0f0f] px-2 py-1 text-sm text-white",
        className,
        disabled && "cursor-not-allowed",
        disabled && "bg-opacity-45",
      )}
      required={required}
      disabled={disabled}
      autoFocus={autoFocus}
      name={name}
      {...props}
    />
  );
}
