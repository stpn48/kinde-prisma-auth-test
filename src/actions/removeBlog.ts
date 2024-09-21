"use server";

import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export async function removeBlog(blogId: string) {
  const { isAuthenticated, getUser, getPermissions } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    throw new Error("You must be logged in to remove a blog");
  }

  const kindePermissions = await getPermissions();
  const isAdmin = kindePermissions?.permissions?.includes("remove:blog");

  if (isAdmin) {
    await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });
  } else {
    const user = await getUser();

    await prisma.blog.delete({
      where: {
        id: blogId,
        authorId: user.id,
      },
    });
  }

  revalidatePath("/");

  console.log("Blog removed successfully");
}
