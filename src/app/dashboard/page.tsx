import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { DashboardActionButtons } from "@/app/dashboard/components/DashboardActionButtons";
import { BlogDetailsModal } from "./components/BlogDetailsModal/BlogDetailsModal";
import { CreateBlogModal } from "./components/CreateBlogModal";
import { Suspense } from "react";
import { BlogList } from "./components/BlogList";
import { BlogDetailsModalLoading } from "./components/BlogDetailsModal/BlogDetailsModalLoading";

export default async function Dashboard({ searchParams }: { searchParams: { blogId?: string; creatingBlog?: boolean } }) {
  const { isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  return (
    <div className="min-h-screen w-screen p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Your blogs</h1>
        <DashboardActionButtons />
      </div>

      <BlogList />

      <LogoutLink className="absolute bottom-2 right-2 rounded-sm border border-red-600 bg-inherit px-2 py-1 text-red-600">
        Logout
      </LogoutLink>

      {searchParams.creatingBlog && <CreateBlogModal />}

      {searchParams.blogId && (
        <Suspense key={Date.now()} fallback={<BlogDetailsModalLoading />}>
          <BlogDetailsModal blogId={searchParams.blogId} />
        </Suspense>
      )}
    </div>
  );
}
