"use server";

import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateBlog(formData: FormData, blogId: string, authorId: string) {
  const { isAuthenticated, getUser, getPermissions } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    throw new Error("Unauthorized");
  }

  const kindePermissions = await getPermissions();
  const isAdmin = kindePermissions?.permissions?.includes("remove:blog");

  const user = await getUser();

  if (!isAdmin && user.id !== authorId) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  await prisma.blog.update({
    where: {
      id: blogId,
    },
    data: {
      title,
      content,
    },
  });

  revalidatePath("/dashboard");

  console.log("Blog updated successfully");
}
