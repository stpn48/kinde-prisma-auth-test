import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen flex flex-col items-center justify-center p-4 text-white bg-[#131313] font-geist-sans min-h-screen">
      <h1 className="font-bold text-3xl">Login with Kinde</h1>
      <div className="flex gap-2 mt-10">
        <LoginLink className="bg-white text-black px-2 py-1 rounded-sm">
          Login
        </LoginLink>
        <RegisterLink className="bg-white text-black px-2 py-1 rounded-sm">
          Sign up
        </RegisterLink>
      </div>
    </div>
  );
}
