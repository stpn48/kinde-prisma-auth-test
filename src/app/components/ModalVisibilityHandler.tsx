"use client";

import React from "react";
import { useModalVisibilityStore } from "@/../store/useModalVisibilityStore";
import { CreateBlogModal } from "./CreateBlogModal";

export function ModalVisibilityHandler() {
  const { CreateBlogModalOpened } = useModalVisibilityStore();

  return <>{CreateBlogModalOpened && <CreateBlogModal />}</>;
}
