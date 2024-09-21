"use client";

import { Blog } from "@prisma/client";
import React, { useCallback, useState, useTransition } from "react";

import { useRouter } from "next/navigation";
import { removeBlog } from "@/actions/removeBlog";
import { ConfirmationModal } from "@/app/components/ConfirmationModal";

type Props = {
  blog: Blog;
  removeButton?: boolean;
};

export function BlogCard({ blog, removeButton }: Props) {
  const [removeBlogPromptOpen, setRemoveBlogPromptOpen] = useState(false);
  const [isRemovingBlog, startTransition] = useTransition();

  const router = useRouter();

  const handleCardClick = useCallback(() => {
    router.push(`/dashboard?blogId=${blog.id}`);
  }, [blog.id, router]);

  const handleRemoveBlog = useCallback(() => {
    startTransition(async () => {
      await removeBlog(blog.id);
    });
  }, [blog.id]);

  return (
    <div
      key={blog.id}
      onClick={handleCardClick}
      className="modal-bg-color modal-border-color relative flex w-[350px] flex-col gap-2 rounded-md border px-4 py-4"
    >
      <h1 className="text-xl font-bold">{blog.title}</h1>
      <p>{blog.content}</p>
      <p>{blog.createdAt.toLocaleDateString()}</p>

      {removeButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setRemoveBlogPromptOpen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-4 top-4 h-4 w-4 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {removeBlogPromptOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this blog ? This blog can belong to someone else. After removing this blog there is no coming back."
          cancelButtonText="No, it was a mistake"
          confirmButtonText="Yes, remove this blog"
          confirmAction={handleRemoveBlog}
          closeModal={() => setRemoveBlogPromptOpen(false)}
        />
      )}
    </div>
  );
}
