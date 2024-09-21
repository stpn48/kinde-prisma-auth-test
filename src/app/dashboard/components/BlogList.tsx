import React from "react";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogCard } from "./BlogCard";
import { Blog } from "@prisma/client";

export async function BlogList() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const userBlogs: Blog[] = await prisma.blog.findMany({
    where: {
      authorId: user.id,
    },
  });

  return (
    <div className="mt-10 flex w-fit flex-wrap gap-4">
      {userBlogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
