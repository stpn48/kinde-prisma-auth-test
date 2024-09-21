"use client";

import React from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/app/components/Button";
import { useRouter } from "next/navigation";

export function DashboardActionButtons() {
  const { getPermissions } = useKindeBrowserClient();
  const router = useRouter();

  const { permissions: usersPermissions } = getPermissions();

  const buttons = [
    {
      label: "Admin dashboard",
      onClick: () => {
        router.push("/admin-dashboard");
      },
      requiredPermissions: ["remove:blog"],
    },
    {
      label: "Create new blog",
      onClick: () => {
        router.push("/dashboard?creatingBlog=true");
      },
      requiredPermissions: ["create:blog", "edit:blog"],
    },
  ];

  return (
    <div className="flex gap-2 text-sm">
      {buttons.map((button) => {
        if (!usersPermissions || !button.requiredPermissions.every((permission) => usersPermissions.includes(permission))) {
          return;
        }

        return (
          <Button className="rounded-sm bg-white px-2 py-1 text-black" onClick={button.onClick}>
            {button.label}
          </Button>
        );
      })}
    </div>
  );
}
