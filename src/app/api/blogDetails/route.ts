import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await getUser();

  const url = new URL(request.url);
  const blogId = url.searchParams.get("blogId");

  // TODO: remove this
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const blogDetails = await prisma.blog.findUnique({
    where: {
      id: blogId,
      authorId: user.id,
    },
  });

  if (!blogDetails) {
    return new Response("Blog not found", { status: 404 });
  }

  return new NextResponse(JSON.stringify(blogDetails), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
