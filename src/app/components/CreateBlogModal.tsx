"use client";

import React, { useCallback, useState, useTransition } from "react";
import { useModalVisibilityStore } from "@/../store/useModalVisibilityStore";
import { Input } from "./Input";
import { Button } from "./Button";
import { createBlog } from "@/actions/createBlog";
import { useErrorMsg } from "@/hooks/useErrorMsg";

export function CreateBlogModal() {
  const { createBlogModalOpened, setCreateBlogModalOpened } =
    useModalVisibilityStore();

  const [isPending, startTransition] = useTransition();
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
    [setCreateBlogModalOpened]
  );

  if (!createBlogModalOpened) {
    return null;
  }

  return (
    <div
      className="fixed font-geist-sans inset-0 w-screen h-screen flex items-center justify-center"
      onClick={isPending ? undefined : () => setCreateBlogModalOpened(false)}
    >
      <form
        className="flex w-[500px] flex-col gap-2 py-4 px-6 rounded-lg shadow-md border modal-border-color modal-bg-color"
        onClick={(e) => e.stopPropagation()}
        action={(formData) => handleSubmit(formData)}
      >
        <h1 className="text-white text-xl my-4 font-bold w-full flex justify-center">
          Create a blog
        </h1>

        <Input type="text" placeholder="Title" name="title" />
        <textarea
          className="rounded-md text-sm text-white shadow-md p-2 modal-border-color border bg-[#0f0f0f] w-full h-[400px] resize-none"
          placeholder="Content"
          name="content"
        />
        {errorMsg && <p className="text-red-600 w-full flex justify-center text-sm">{errorMsg}</p>}
        <div className="flex gap-2 justify-end w-full mt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Create"}
          </Button>
          <Button
            disabled={isPending}
            className="bg-[#313131] hover:bg-[#272727] text-white "
            onClick={() => setCreateBlogModalOpened(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
