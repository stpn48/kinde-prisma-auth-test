"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Blog } from "@prisma/client";
import { ModalBackDrop } from "@/app/components/ModalBackDrop";
import ModalBody from "@/app/components/ModalBody";
import { Button } from "@/app/components/Button";
import { EditingBlogModal } from "./EditingBlogModal";

type Props = {
  blogDetails: Blog;
};

export function Modal({ blogDetails }: Props) {
  const [isEditingBlog, setIsEditingBlog] = useState(false);

  const router = useRouter();

  const handleModalClose = useCallback(() => {
    router.replace("/dashboard");
  }, [router]);

  if (!blogDetails) {
    return (
      <ModalBackDrop onClick={handleModalClose}>
        <ModalBody>
          <h1 className="text-red-600">Error fetching data. If this issue persist please contact us.</h1>
        </ModalBody>
      </ModalBackDrop>
    );
  }

  if (isEditingBlog) {
    return <EditingBlogModal closeModal={handleModalClose} setIsEditingBlog={setIsEditingBlog} blogDetails={blogDetails} />;
  }

  //static modal
  return (
    <ModalBackDrop onClick={handleModalClose}>
      <ModalBody className="relative" closeModal={handleModalClose}>
        <Button onClick={() => setIsEditingBlog(true)} className="absolute right-16 top-4">
          Edit Blog
        </Button>
        <h1 className="mb-2 flex w-full justify-center text-2xl font-bold">{blogDetails.title}</h1>
        <p>{blogDetails.content}</p>
      </ModalBody>
    </ModalBackDrop>
  );
}
