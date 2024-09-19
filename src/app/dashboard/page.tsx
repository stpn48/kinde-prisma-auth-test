import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { DashboardActionButtons } from "@/app/dashboard/components/DashboardActionButtons";
import { BlogCard } from "./components/BlogCard";
import { Blog } from "@prisma/client";

export default async function Dashboard() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const user = await getUser();

  const userBlogs: Blog[] = await prisma.blog.findMany({
    where: {
      authorId: user.id,
    },
  });

  return (
    <div className="w-screen p-4 text-white bg-[#121212] font-geist-sans min-h-screen">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Your blogs</h1>
        <DashboardActionButtons />
      </div>

      <div className="mt-10 flex flex-wrap w-fit gap-2">
        {userBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      <LogoutLink className="bg-inherit absolute right-2 bottom-2 border border-red-600 text-red-600 px-2 py-1 rounded-sm">
        Logout
      </LogoutLink>
    </div>
  );
}
