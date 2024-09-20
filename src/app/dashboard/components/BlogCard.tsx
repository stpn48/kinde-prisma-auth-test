"use client";

import { Blog } from "@prisma/client";
import React, { useCallback } from "react";
import { useModalVisibilityStore } from "@/store/useModalVisibilityStore";

import { useRouter } from "next/navigation";

type Props = {
  blog: Blog;
};

export function BlogCard({ blog }: Props) {
  const { setBlogDetailsModalOpened } = useModalVisibilityStore();

  const router = useRouter();

  const handleCardClick = useCallback(() => {
    router.push(`/dashboard?blogId=${blog.id}`);
    setTimeout(() => {
      setBlogDetailsModalOpened(true);
    }, 100);
  }, [blog.id, router, setBlogDetailsModalOpened]);

  return (
    <div
      key={blog.id}
      onClick={handleCardClick}
      className="modal-bg-color modal-border-color flex w-[350px] flex-col gap-2 rounded-md border px-4 py-4"
    >
      <h1 className="text-xl font-bold">{blog.title}</h1>
      <p>{blog.content}</p>
      <p>{blog.createdAt.toLocaleDateString()}</p>
    </div>
  );
}
