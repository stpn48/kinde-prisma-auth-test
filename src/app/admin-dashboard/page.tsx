import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { BlogCard } from "../dashboard/components/BlogCard";
import { Blog } from "@prisma/client";
import { ActionButtons } from "./components/ActionButtons";

const requiredPermissions = ["remove:blog"];

export default async function AdminDashboard() {
  const { isAuthenticated, getPermissions, getUser } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const kindePermissions = await getPermissions();
  const isAdmin = kindePermissions?.permissions?.includes("remove:blog");

  if (!isAdmin) {
    redirect("/dashboard");
  }

  const allBlogs: Blog[] = await prisma.blog.findMany();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Admin dashboard</h1>
      <div className="flex flex-wrap gap-4">
        {allBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} removeButton />
        ))}
      </div>
      <ActionButtons />
    </div>
  );
}
