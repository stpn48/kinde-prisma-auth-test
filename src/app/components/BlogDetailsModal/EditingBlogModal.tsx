"use client";

import React, { useCallback, useState, useTransition } from "react";
import { ModalBackDrop } from "@/app/components/ModalBackDrop";
import ModalBody from "@/app/components/ModalBody";
import { Button } from "@/app/components/Button";
import { Blog } from "@prisma/client";
import { ConfrimationModal } from "@/app/components/ConfrimationModal";
import { updateBlog } from "@/actions/updateBlog";

type Props = {
  closeModal: () => void;
  setIsEditingBlog: React.Dispatch<React.SetStateAction<boolean>>;
  blogDetails: Blog;
};

export function EditingBlogModal({ closeModal, setIsEditingBlog, blogDetails }: Props) {
  const [discardChangesModalOpened, setDiscardChangesModalOpened] = useState(false);
  const [madeChanges, setMadeChanges] = useState(false);

  const [isUpdatingBlog, startTransition] = useTransition();

  const handleSubmit = useCallback(
    (formData: FormData) => {
      startTransition(async () => {
        await updateBlog(formData, blogDetails.id, blogDetails.authorId);
        setIsEditingBlog(false);
      });
    },
    [setIsEditingBlog, blogDetails, startTransition],
  );

  const handleCancelBtnClick = useCallback(() => {
    if (madeChanges) {
      setDiscardChangesModalOpened(true);
    } else {
      setIsEditingBlog(false);
    }
  }, [setDiscardChangesModalOpened, setIsEditingBlog, madeChanges]);

  return (
    <ModalBackDrop onClick={isUpdatingBlog ? undefined : closeModal}>
      <ModalBody className="relative" closeModal={isUpdatingBlog ? undefined : () => setIsEditingBlog(false)}>
        <form action={handleSubmit} className="h-full">
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              disabled={isUpdatingBlog}
              className="bg-[#313131] text-white hover:bg-[#272727]"
              type="button"
              onClick={handleCancelBtnClick}
            >
              Cancel
            </Button>
            <Button isLoading={isUpdatingBlog} type="submit" disabled={isUpdatingBlog}>
              Save
            </Button>
          </div>
          <input
            disabled={isUpdatingBlog}
            onChange={() => setMadeChanges(true)}
            defaultValue={blogDetails.title}
            name="title"
            placeholder="Blog Title"
            className="mb-2 w-full bg-inherit text-center text-2xl font-bold outline-none"
          ></input>
          <textarea
            disabled={isUpdatingBlog}
            onChange={() => setMadeChanges(true)}
            placeholder="Blog Content"
            className="flex h-[90%] w-full resize-none bg-inherit outline-none"
            name="content"
            defaultValue={blogDetails.content}
          />
        </form>

        {discardChangesModalOpened && (
          <ConfrimationModal
            message="Are you sure you want to discard changes ?"
            confirmButoonText="Yes, discard"
            cancelButoonText="No, keep editing"
            closeModal={() => setDiscardChangesModalOpened(false)}
            confirmAction={() => setIsEditingBlog(false)}
          />
        )}
      </ModalBody>
    </ModalBackDrop>
  );
}
