import React from "react";
import { Modal } from ".//Modal";
import prisma from "@/lib/prisma";
import { Blog } from "@prisma/client";

export async function BlogDetailsModal({ searchParams }: { searchParams: { blogId?: string } }) {
  const blogId = searchParams.blogId;

  if (!blogId) {
    return null;
  }

  const blogDetails: Blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });

  return <Modal blogDetails={blogDetails} />;
}
