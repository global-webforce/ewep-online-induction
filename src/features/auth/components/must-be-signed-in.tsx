"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserSchema } from "@/features/auth-types";
import Link from "next/link";

export default function MustBeSignedIn({
  user,
  children,
}: Readonly<{
  user: UserSchema | null;
  children: React.ReactNode;
}>) {
  return !user ? (
    <Card className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-center">
        You must be signed-in to access this page.{" "}
      </h1>{" "}
      <div className="flex gap-2 justify-center">
        <Link href="/sign-in">
          <Button variant="default">Sign In</Button>
        </Link>
        <Link href="/forgot-password">
          <Button variant="outline">Forgot Password?</Button>
        </Link>{" "}
      </div>
    </Card>
  ) : (
    children
  );
}
