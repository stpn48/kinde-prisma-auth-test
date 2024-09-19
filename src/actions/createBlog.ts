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

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  await prisma.blog.create({
    data: {
      authorId: user.id,
      title: title,
      content: content,
    },
  });

  revalidatePath("/dashboard");

  return { msg: "Blog created successfully" };
}
