import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function LoadingSpinner({ className }: Props) {
  return (
    <div
      className={twMerge(
        "h-5 w-5 animate-spin rounded-full border-t-[2px] border-t-[#e6e6e6]",
        className,
      )}
    ></div>
  );
}
