"use client";

import { Blog } from "@prisma/client";
import React, { useCallback } from "react";
import { useModalVisibilityStore } from "../../../../store/useModalVisibilityStore";

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
      className="flex px-4 flex-col gap-2 py-4 border modal-bg-color w-[350px] modal-border-color rounded-md"
    >
      <h1 className="font-bold text-xl">{blog.title}</h1>
      <p>{blog.content}</p>
      <p>{blog.createdAt.toLocaleDateString()}</p>
    </div>
  );
}
