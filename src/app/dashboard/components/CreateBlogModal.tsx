"use client";

import React, { useCallback, useState, useTransition } from "react";

import { useErrorMsg } from "@/hooks/useErrorMsg";
import { createBlog } from "@/actions/createBlog";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { ConfirmationModal } from "@/app/components/ConfirmationModal";
import { ModalBackDrop } from "@/app/components/ModalBackDrop";

export function CreateBlogModal() {
  const [isCreatingBlog, startTransition] = useTransition();
  const { errorMsg, setErrorMsg } = useErrorMsg();

  const [madeChanges, setMadeChanges] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = useCallback((formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) {
      setErrorMsg("Title and content are required");
      return;
    }

    startTransition(async () => {
      await createBlog(formData);
    });

    closeModal();
  }, []);

  const handleCancelButtonClick = useCallback(() => {
    if (madeChanges) {
      setConfirmationModalOpen(true);
    } else {
      closeModal();
    }
  }, [madeChanges]);

  const closeModal = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <ModalBackDrop onClick={!isCreatingBlog ? closeModal : undefined}>
      <form
        className="modal-border-color modal-bg-color flex w-[500px] flex-col gap-2 rounded-lg border px-6 py-4 shadow-md"
        onClick={(e) => e.stopPropagation()}
        action={(formData) => handleSubmit(formData)}
      >
        <h1 className="my-4 flex w-full justify-center text-xl font-bold text-white">Create a blog</h1>

        <Input type="text" placeholder="Title" onChange={() => setMadeChanges(true)} name="title" />
        <textarea
          onChange={() => setMadeChanges(true)}
          className="modal-border-color h-[400px] w-full resize-none rounded-md border bg-[#0f0f0f] p-2 text-sm text-white shadow-md"
          placeholder="Content"
          name="content"
        />
        {errorMsg && <p className="flex w-full justify-center text-sm text-red-600">{errorMsg}</p>}
        <div className="mt-4 flex w-full justify-end gap-2">
          <Button disabled={isCreatingBlog} type="button" variant="secondary" onClick={handleCancelButtonClick}>
            Cancel
          </Button>
          <Button type="submit" disabled={isCreatingBlog} isLoading={isCreatingBlog}>
            Create
          </Button>
        </div>
      </form>

      {confirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to discard all changes ?"
          confirmAction={closeModal}
          confirmButtonText="Yes, discard all changes"
          cancelButtonText="No, keep creating"
          closeModal={() => setConfirmationModalOpen(false)}
        />
      )}
    </ModalBackDrop>
  );
}
