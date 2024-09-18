"use server";

import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export async function createBlog(formData: FormData) {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!isAuthenticated()) {
    throw new Error("Nice try bro...");
  }

  const user = await getUser();

  await prisma.blog.create({
    data: {
      authorId: user.id,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });

  revalidatePath("/dashboard");
}
