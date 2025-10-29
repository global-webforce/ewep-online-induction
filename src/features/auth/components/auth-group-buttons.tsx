"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AuthGroupButtons({
  hasUser,
}: Readonly<{
  hasUser: boolean;
}>) {
  return (
    <div className="flex items-center">
      {!hasUser && ( // show signIn/register if NOT logged in
        <div className="flex gap-2 justify-center">
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="default">Sign Up</Button>
          </Link>
        </div>
      )}
      {hasUser && ( // show dashboard if logged in
        <div className="flex gap-2 justify-end">
          <Link href="/dashboard">
            <Button variant="default">Go to Dashboard</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
