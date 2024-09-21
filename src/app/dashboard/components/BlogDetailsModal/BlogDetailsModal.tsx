import React from "react";
import { Modal } from ".//Modal";
import prisma from "@/lib/prisma";
import { Blog } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type Props = {
  blogId: string;
};

export async function BlogDetailsModal({ blogId }: Props) {
  const { getUser, getPermissions } = getKindeServerSession();

  const kindePermissions = await getPermissions();
  const userPermissions = kindePermissions?.permissions || [];

  let blogDetails: Blog;

  //TODO: remove this
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // if user is admin, they can view details for any blog.
  if (userPermissions.includes("remove:blog")) {
    blogDetails = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });
  }

  // normal user can only view his own blog details.
  else {
    const user = await getUser();

    blogDetails = await prisma.blog.findUnique({
      where: {
        authorId: user.id,
        id: blogId,
      },
    });
  }

  return <Modal blogDetails={blogDetails} />;
}
