import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default function Home() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-[#131313] p-4 font-geist-sans text-white">
      <h1 className="text-3xl font-bold">Continue with Kinde</h1>
      <div className="mt-10 flex gap-2">
        <LoginLink className="rounded-sm bg-white px-2 py-1 text-black">
          Login
        </LoginLink>
        <RegisterLink className="rounded-sm bg-white px-2 py-1 text-black">
          Sign up
        </RegisterLink>
      </div>
    </div>
  );
}
