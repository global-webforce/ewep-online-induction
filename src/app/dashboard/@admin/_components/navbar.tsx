import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authRepository } from "@/features/shared/auth-repository";

export default async function Navbar() {
  const currentUser = await authRepository.getUser();

  return (
    <nav className="flex justify-between items-center py-3 px-4 fixed top-0 left-0 right-0 z-50 bg-slate-100">
      <Link href="/" className="text-xl font-bold">
        Auth.js
      </Link>
      {!currentUser && (
        <div className="flex gap-2 justify-center">
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="default">Register</Button>
          </Link>
        </div>
      )}
      {currentUser && (
        <div className="flex gap-2 justify-end">
          <Link
            href={
              currentUser.roles.includes("admin")
                ? "/dashboard/admin"
                : "/dashboard/inductee"
            }
          >
            <Button variant="default">Go to Dashboard</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
