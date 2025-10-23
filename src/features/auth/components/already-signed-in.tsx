"use client";

import { Card } from "@/components/ui/card";

import { UserSchema } from "@/features/auth-types";
import { AuthGroupButtons } from "./auth-group-buttons";

export default function AlreadySignedIn({
  user,
  children,
}: Readonly<{
  user: UserSchema | null;
  children: React.ReactNode;
}>) {
  return (
    <>
      {user ? (
        <Card className="flex flex-col items-center gap-4 p-6">
          <h1>You&apos;re already signed-in!!</h1>{" "}
          <AuthGroupButtons user={user} />
        </Card>
      ) : (
        children
      )}
    </>
  );
}
