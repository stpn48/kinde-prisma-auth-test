"use client";

import React from "react";
import { useModalVisibilityStore } from "@/../store/useModalVisibilityStore";
import { CreateBlogModal } from "./CreateBlogModal";
import { BlogDetailsModal } from "./BlogDetailsModal";

export function ModalVisibilityHandler() {
  const { createBlogModalOpened, blogDetailsModalOpened } =
    useModalVisibilityStore();

  return (
    <>
      {createBlogModalOpened && <CreateBlogModal />}
      {blogDetailsModalOpened && <BlogDetailsModal />}
    </>
  );
}
