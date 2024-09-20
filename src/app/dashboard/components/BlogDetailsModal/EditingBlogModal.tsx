"use client";

import React, { useCallback, useState, useTransition } from "react";
import { ModalBackDrop } from "@/app/components/ModalBackDrop";
import ModalBody from "@/app/components/ModalBody";
import { Button } from "@/app/components/Button";
import { Blog } from "@prisma/client";

import { updateBlog } from "@/actions/updateBlog";
import { ConfirmationModal } from "@/app/components/ConfirmationModal";
import { removeBlog } from "@/actions/removeBlog";

type Props = {
  closeModal: () => void;
  setIsEditingBlog: React.Dispatch<React.SetStateAction<boolean>>;
  blogDetails: Blog;
};

export function EditingBlogModal({ closeModal, setIsEditingBlog, blogDetails }: Props) {
  const [discardChangesModalOpened, setDiscardChangesModalOpened] = useState(false);
  const [removeBlogPromptOpened, setRemoveBlogPromptOpened] = useState(false);
  const [madeChanges, setMadeChanges] = useState(false);

  const [isActionPending, startTransition] = useTransition();

  const handleSave = useCallback(
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

  const handleRemoveBlogClick = useCallback(() => {
    setRemoveBlogPromptOpened(true);
  }, []);

  const handleRemoveBlog = useCallback(() => {
    startTransition(async () => {
      await removeBlog(blogDetails.id);
      closeModal();
    });
  }, [blogDetails.id]);

  return (
    <ModalBackDrop onClick={isActionPending ? undefined : closeModal}>
      <ModalBody className="relative" closeModal={isActionPending ? undefined : () => setIsEditingBlog(false)}>
        <Button
          isLoading={isActionPending}
          disabled={isActionPending}
          onClick={handleRemoveBlogClick}
          className="absolute right-16 top-4 rounded-sm border border-red-600 bg-inherit px-2 py-1 text-red-600 hover:bg-inherit"
        >
          Remove
        </Button>
        <form action={handleSave} className="h-full">
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button disabled={isActionPending} variant="secondary" type="button" onClick={handleCancelBtnClick}>
              Cancel
            </Button>
            <Button isLoading={isActionPending} type="submit" disabled={isActionPending}>
              Save
            </Button>
          </div>
          <input
            disabled={isActionPending}
            onChange={() => setMadeChanges(true)}
            defaultValue={blogDetails.title}
            name="title"
            placeholder="Blog Title"
            className="mb-2 w-full bg-inherit text-center text-2xl font-bold outline-none"
          ></input>
          <textarea
            disabled={isActionPending}
            onChange={() => setMadeChanges(true)}
            placeholder="Blog Content"
            className="flex h-[90%] w-full resize-none bg-inherit outline-none"
            name="content"
            defaultValue={blogDetails.content}
          />
        </form>

        {discardChangesModalOpened && (
          <ConfirmationModal
            message="Are you sure you want to discard changes ?"
            confirmButtonText="Yes, discard"
            cancelButtonText="No, keep editing"
            closeModal={() => setDiscardChangesModalOpened(false)}
            confirmAction={() => setIsEditingBlog(false)}
          />
        )}

        {removeBlogPromptOpened && (
          <ConfirmationModal
            message="Are you sure you want to remove this blog ? After this there is no coming back."
            confirmButtonText="Yes, remove"
            cancelButtonText="No, i dint mean to"
            closeModal={() => setRemoveBlogPromptOpened(false)}
            confirmAction={handleRemoveBlog}
          />
        )}
      </ModalBody>
    </ModalBackDrop>
  );
}
