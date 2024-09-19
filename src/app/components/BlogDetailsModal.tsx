"use client";

import React, { useCallback } from "react";
import { useModalVisibilityStore } from "../../../store/useModalVisibilityStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function BlogDetailsModal() {
  const { setBlogDetailsModalOpened } = useModalVisibilityStore();

  const router = useRouter();

  const url = new URL(window.location.href);
  const blogId = url.searchParams.get("blogId");

  const { data: blogDetails, isLoading } = useQuery({
    queryKey: ["blogDetails", blogId],
    queryFn: async () => {
      if (!blogId) {
        return null;
      }

      const response = await fetch(`/api/blogDetails?blogId=${blogId}`);
      const data = await response.json();

      return data;
    },
  });

  const handleModalClose = useCallback(() => {
    setBlogDetailsModalOpened(false);
    router.replace("/dashboard");
  }, [setBlogDetailsModalOpened]);

  if (isLoading) {
    return (
      <div
        className="w-screen h-screen flex items-center justify-center fixed inset-0 bg-stone-900 bg-opacity-50 text-white"
      >
        <div className="w-[90%] p-4 rounded-lg shadow-md h-[95%] modal-bg-color">
          <h1>loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-screen h-screen flex items-center justify-center fixed inset-0 bg-stone-900 bg-opacity-50 text-white"
      onClick={handleModalClose}
    >
      <div className="w-[90%] p-4 rounded-lg shadow-md h-[95%] modal-bg-color">
        <h1 className="text-2xl font-bold">{blogDetails.title}</h1>
        <p>{blogDetails.content}</p>
      </div>
    </div>
  );
}
