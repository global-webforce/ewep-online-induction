"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { fetchUser } from "../fetch-user";
import { AuthGroupButtons } from "./auth-group-buttons";
import { User } from "../user-schema";

export default function AlreadySignedIn({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserFn = async () => {
      const u = await fetchUser();
      setUser(u);
    };
    fetchUserFn();
  }, []);

  return (
    <>
      {user ? (
        <Card className="flex flex-col items-center gap-4 p-6">
          <h1>You&apos;re already signed-in!!</h1> <AuthGroupButtons />
        </Card>
      ) : (
        children
      )}
    </>
  );
}
