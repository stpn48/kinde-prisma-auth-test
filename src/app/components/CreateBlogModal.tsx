"use client";

import React from "react";
import { useModalVisibilityStore } from "@/../store/useModalVisibilityStore";
import { Input } from "./Input";
import { Button } from "./Button";
import { createBlog } from "@/actions/createBlog";

export function CreateBlogModal() {
  const { CreateBlogModalOpened, setCreateBlogModalOpened } =
    useModalVisibilityStore();

  if (!CreateBlogModalOpened) {
    return null;
  }

  return (
    <div
      className="fixed font-geist-sans inset-0 w-screen h-screen flex items-center justify-center"
      onClick={() => setCreateBlogModalOpened(false)}
    >
      <form
        className="flex w-[400px] flex-col gap-2 py-4 px-6 rounded-lg shadow-md border border-[#242424] bg-[#0f0f0f]"
        onClick={(e) => e.stopPropagation()}
        action={createBlog}
      >
        <h1 className="text-white text-xl my-4 font-bold w-full flex justify-center">Create blog</h1>
        <Input type="text" placeholder="Title" name="title" />
        <Input type="text" placeholder="Content" name="content" />
        <div className="flex gap-2 justify-end w-full mt-4">
          <Button type="submit">Create</Button>
          <Button
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
