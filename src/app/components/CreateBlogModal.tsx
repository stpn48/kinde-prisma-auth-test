"use client";

import React, { useCallback, useTransition } from "react";
import { useModalVisibilityStore } from "../../../store/useModalVisibilityStore";
import { useErrorMsg } from "@/hooks/useErrorMsg";
import { createBlog } from "@/actions/createBlog";
import { Input } from "./Input";
import { Button } from "./Button";

export function CreateBlogModal() {
  const { createBlogModalOpened, setCreateBlogModalOpened } = useModalVisibilityStore();

  const [isCreatingBlog, startTransition] = useTransition();
  const { errorMsg, setErrorMsg } = useErrorMsg();

  const handleSubmit = useCallback(
    (formData: FormData) => {
      const title = formData.get("title") as string;
      const content = formData.get("content") as string;

      if (!title || !content) {
        setErrorMsg("Title and content are required");
        return;
      }

      startTransition(async () => {
        await createBlog(formData);
        setCreateBlogModalOpened(false);
      });
    },
    [setCreateBlogModalOpened],
  );

  if (!createBlogModalOpened) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex h-screen w-screen items-center justify-center font-geist-sans"
      onClick={isCreatingBlog ? undefined : () => setCreateBlogModalOpened(false)}
    >
      <form
        className="modal-border-color modal-bg-color flex w-[500px] flex-col gap-2 rounded-lg border px-6 py-4 shadow-md"
        onClick={(e) => e.stopPropagation()}
        action={(formData) => handleSubmit(formData)}
      >
        <h1 className="my-4 flex w-full justify-center text-xl font-bold text-white">Create a blog</h1>

        <Input type="text" placeholder="Title" name="title" />
        <textarea
          className="modal-border-color h-[400px] w-full resize-none rounded-md border bg-[#0f0f0f] p-2 text-sm text-white shadow-md"
          placeholder="Content"
          name="content"
        />
        {errorMsg && <p className="flex w-full justify-center text-sm text-red-600">{errorMsg}</p>}
        <div className="mt-4 flex w-full justify-end gap-2">
          <Button type="submit" disabled={isCreatingBlog} isLoading={isCreatingBlog}>
            Create
          </Button>
          <Button
            disabled={isCreatingBlog}
            className="bg-[#313131] text-white hover:bg-[#272727]"
            onClick={() => setCreateBlogModalOpened(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
