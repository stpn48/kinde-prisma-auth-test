import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { DashboardActionButtons } from "@/app/dashboard/components/DashboardActionButtons";
import { BlogCard } from "./components/BlogCard";
import { Blog } from "@prisma/client";
import { BlogDetailsModal } from "./components/BlogDetailsModal/BlogDetailsModal";
import { CreateBlogModal } from "./components/CreateBlogModal";

export default async function Dashboard({ searchParams }: { searchParams: { blogId?: string } }) {
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
    <div className="min-h-screen w-screen bg-[#121212] p-4 font-geist-sans text-white">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Your blogs</h1>
        <DashboardActionButtons />
      </div>

      <div className="mt-10 flex w-fit flex-wrap gap-2">
        {userBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      <LogoutLink className="absolute bottom-2 right-2 rounded-sm border border-red-600 bg-inherit px-2 py-1 text-red-600">
        Logout
      </LogoutLink>

      <CreateBlogModal />
      <BlogDetailsModal searchParams={searchParams} />
    </div>
  );
}
