"use client";

import React from "react";
import { useModalVisibilityStore } from "../../../../store/useModalVisibilityStore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/app/components/Button";

export function DashboardActionButtons() {
  const { setCreateBlogModalOpened } = useModalVisibilityStore();

  const { getPermissions } = useKindeBrowserClient();

  const { permissions: usersPermissions } = getPermissions();

  const buttons = [
    {
      label: "Admin dashboard",
      onClick: () => {
        console.log("Admin dashboard");
      },
      requiredPermissions: ["remove:blog"],
    },
    {
      label: "Create new blog",
      onClick: () => {
        setCreateBlogModalOpened(true);
      },
      requiredPermissions: ["create:blog"],
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
