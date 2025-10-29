"use client";

import { Card } from "@/components/ui/card";

import { AuthGroupButtons } from "./auth-group-buttons";

export default function AlreadySignedIn({
  hasUser,
  children,
}: Readonly<{
  hasUser: boolean;
  children: React.ReactNode;
}>) {
  return (
    <>
      {hasUser ? (
        <Card className="flex flex-col items-center gap-4 p-6">
          <h1>You&apos;re already signed-in!!</h1>{" "}
          <AuthGroupButtons hasUser={hasUser} />
        </Card>
      ) : (
        children
      )}
    </>
  );
}
