import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authRepository } from "../auth-repository";
import LogoutButtonServer from "@/features/auth/sign-out/ui";

export async function AuthGroupButtons() {
  const user = await authRepository.getUser();
  return (
    <div className="flex items-center">
      {!user && ( // show signIn/register if NOT logged in
        <div className="flex gap-2 justify-center">
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="default">Sign Up</Button>
          </Link>
        </div>
      )}
      {user && ( // show dashboard if logged in
        <div className="flex gap-2 justify-end">
          <Link href="/dashboard">
            <Button variant="default">Go to Dashboard</Button>
          </Link>
        </div>
      )}

      {user != null && ( // show dashboard if logged in
        <LogoutButtonServer />
      )}
    </div>
  );
}
