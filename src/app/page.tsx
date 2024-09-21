import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "./components/Button";

export default function Home() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center p-4 font-geist-sans text-white">
      <h1 className="text-4xl font-bold">Continue with Kinde</h1>
      <div className="mt-10 flex gap-4">
        <Button className="px-4 text-lg" variant="secondary">
          <LoginLink>Login</LoginLink>
        </Button>
        <Button className="px-4 text-lg">
          <RegisterLink>Sign up</RegisterLink>
        </Button>
      </div>
    </div>
  );
}
