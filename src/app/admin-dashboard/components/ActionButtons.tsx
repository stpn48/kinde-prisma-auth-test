"use client";

import { Button } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import React from "react";

export function ActionButtons() {
  const router = useRouter();

  return (
    <Button className="absolute right-4 top-4" onClick={() => router.push("/dashboard")}>
      Dashboard
    </Button>
  );
}
