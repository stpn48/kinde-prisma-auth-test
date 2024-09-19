"use client";

import React, { useCallback, useState, useTransition } from "react";
import { useModalVisibilityStore } from "../../../store/useModalVisibilityStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import { Blog } from "@/types/global";
import { ModalBackDrop } from "./ModalBackDrop";
import ModalBody from "./ModalBody";
import { Button } from "./Button";
import { s } from "framer-motion/client";
import EditingBlogModal from "./EditingBlogModal";

export function BlogDetailsModal() {
  const { setBlogDetailsModalOpened } = useModalVisibilityStore();

  const [isEditingBlog, setIsEditingBlog] = useState(false);

  const [isSavingChanges, startTransition] = useTransition();

  const router = useRouter();

  const url = new URL(window.location.href);
  const blogId = url.searchParams.get("blogId");

  const { data: blogDetails, isLoading } = useQuery({
    queryKey: ["blogDetails", blogId],
    queryFn: async () => {
      if (!blogId) {
        return null;
      }

      try {
        const response = await fetch(`/api/blogDetails?blogId=${blogId}`);
        const data: Blog = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });

  const handleModalClose = useCallback(() => {
    setBlogDetailsModalOpened(false);
    router.replace("/dashboard");
  }, [setBlogDetailsModalOpened]);

  if (isLoading) {
    return (
      <ModalBackDrop>
        <ModalBody className="flex items-center justify-center">
          <LoadingSpinner />
        </ModalBody>
      </ModalBackDrop>
    );
  }

  if (!blogDetails) {
    return (
      <ModalBackDrop>
        <ModalBody>
          <h1 className="text-red-600">
            Error fetching data. If this issue presits please contact us.
          </h1>
        </ModalBody>
      </ModalBackDrop>
    );
  }

  if (isEditingBlog) {
    return (
      <EditingBlogModal
        setBlogDetailsModalOpened={setBlogDetailsModalOpened}
        setIsEditingBlog={setIsEditingBlog}
        // type Blog !== Blog ???? picovina ?
        blogDetails={blogDetails}
      />
    );
  }

  //static modal
  return (
    <ModalBackDrop onClick={() => setBlogDetailsModalOpened(false)}>
      <ModalBody className="relative">
        <Button
          onClick={() => setIsEditingBlog(true)}
          className="absolute right-4 top-4"
        >
          Edit Blog
        </Button>
        <h1 className="mb-2 flex w-full justify-center text-2xl font-bold">
          {blogDetails.title}
        </h1>
        <p>{blogDetails.content}</p>
      </ModalBody>
    </ModalBackDrop>
  );
}
