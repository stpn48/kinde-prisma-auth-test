"use client";

import React, { startTransition, useCallback } from "react";
import { ModalBackDrop } from "./ModalBackDrop";
import ModalBody from "./ModalBody";
import { Button } from "./Button";
import { Blog } from "@prisma/client";

type Props = {
  setBlogDetailsModalOpened: (val: boolean) => void;
  setIsEditingBlog: React.Dispatch<React.SetStateAction<boolean>>;
  blogDetails: Blog;
};

export default function EditingBlogModal({
  setBlogDetailsModalOpened,
  setIsEditingBlog,
  blogDetails,
}: Props) {
  const handleSubmit = useCallback(
    (formData: FormData) => {
      startTransition(async () => {
        //TODO: call server action to update this blog with the new data
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsEditingBlog(false);
      });
    },
    [setIsEditingBlog],
  );

  return (
    <ModalBackDrop onClick={() => setBlogDetailsModalOpened(false)}>
      <ModalBody className="relative">
        <form action={handleSubmit} className="h-full">
          <div className="absolute right-4 top-4 flex gap-2">
            <Button
              className="bg-[#313131] text-white hover:bg-[#272727]"
              onClick={() => setIsEditingBlog(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
          <input
            defaultValue={blogDetails.title}
            name="title"
            className="mb-2 w-full bg-inherit text-center text-2xl font-bold outline-none"
          ></input>
          <textarea
            className="flex h-[90%] w-full resize-none bg-inherit outline-none"
            name="content"
            defaultValue={blogDetails.content}
          />
        </form>
      </ModalBody>
    </ModalBackDrop>
  );
}
